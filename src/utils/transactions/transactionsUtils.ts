const Buffer = require('buffer/').Buffer
import {
  Address,
  TransactionUnspentOutput,
  TransactionUnspentOutputs,
  Value,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  LinearFee,
  BigNum,
  TransactionWitnessSet,
  Transaction,
  hash_plutus_data,
  TransactionOutputBuilder,
  encode_json_str_to_plutus_datum,
} from '@dcspark/cardano-multiplatform-lib-browser'

import { ProtocolParams } from '../../config/protocolParams'
import { WalletAPI, TxSendError, TxSignError } from '../../types/models'

const initializeTxBuilder = () => {
  const _txBuilder = TransactionBuilder.new(
    TransactionBuilderConfigBuilder.new()
      .fee_algo(
        LinearFee.new(
          BigNum.from_str(ProtocolParams.linearFee.minFeeA),
          BigNum.from_str(ProtocolParams.linearFee.minFeeB)
        )
      )
      .pool_deposit(BigNum.from_str(ProtocolParams.poolDeposit))
      .key_deposit(BigNum.from_str(ProtocolParams.keyDeposit))
      .coins_per_utxo_word(BigNum.from_str(ProtocolParams.coinsPerUtxoWord))
      .max_value_size(ProtocolParams.maxValSize)
      .max_tx_size(ProtocolParams.maxTxSize)
      .prefer_pure_change(true)
      .build()
  )
  return _txBuilder
}

export const buildSendAdaToPlutusScript = async (
  walletAPI: WalletAPI,
  userAddress: string,
  recipientScriptAddress: string,
  lovelaceAmount: string
): Promise<string | TxSignError | TxSendError> => {
  //Init Builder
  const txBuilder = initializeTxBuilder()

  //Addresses
  const scriptAddress = Address.from_bech32(recipientScriptAddress)
  const shelleyChangeAddress = Address.from_bech32(userAddress)

  //Build Output
  let txOutputBuilder = TransactionOutputBuilder.new()
  txOutputBuilder = txOutputBuilder.with_address(scriptAddress)

  //Datum
  const unitDatumJson = JSON.stringify({ constructor: 0, fields: [] })
  const datumHash = hash_plutus_data(
    encode_json_str_to_plutus_datum(unitDatumJson, 1)
  )
  txOutputBuilder = txOutputBuilder.with_data_hash(datumHash)

  //Amount(lovelace)
  let txOutputAmountBuilder = txOutputBuilder.next()

  txOutputAmountBuilder = txOutputAmountBuilder.with_value(
    Value.new(BigNum.from_str(lovelaceAmount))
  )
  const txOutput = txOutputAmountBuilder.build()
  txBuilder.add_output(txOutput)

  //Find the available UTxOs in the wallet and use them as inputs
  const txUnspentOutputs = await getTxUnspentOutputs(walletAPI)
  txBuilder.add_inputs_from(txUnspentOutputs, 2)

  //Calculate the min fee required and send any change to the user address
  txBuilder.add_change_if_needed(shelleyChangeAddress)

  //Once the transaction is ready, build it to get the tx body without witnesses
  const txBody = txBuilder.build()

  //Tx Witnesses
  const transactionWitnessSet = TransactionWitnessSet.new()
  const tx = Transaction.new(
    txBody,
    TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes())
  )

  //Sign Tx (asks user, pops up wallet extension)
  let txVkeyWitnesses
  try {
    txVkeyWitnesses = await walletAPI.signTx(
      Buffer.from(tx.to_bytes(), 'utf8').toString('hex'),
      true
    )

    //TODO: remove this check if TxSignError is always thrown as exception
    //Check for possible TxSignError (e.g. user cancels, etc)
    if (txVkeyWitnesses.hasOwnProperty('code')) {
      return txVkeyWitnesses as TxSignError
    }
  } catch (error) {
    //console.log(error)
    return error as TxSignError
  }

  txVkeyWitnesses = TransactionWitnessSet.from_bytes(
    Buffer.from(txVkeyWitnesses, 'hex')
  )

  const vkeys = txVkeyWitnesses.vkeys()
  if (vkeys) {
    transactionWitnessSet.set_vkeys(vkeys)
  }

  const signedTx = Transaction.new(tx.body(), transactionWitnessSet)

  //Submit Tx
  let submittedTxHash
  try {
    submittedTxHash = await walletAPI.submitTx(
      Buffer.from(signedTx.to_bytes(), 'utf8').toString('hex')
    )

    //TODO: remove this check if TxSendError is always thrown as exception
    //Check for possible TxSendError
    if (submittedTxHash.hasOwnProperty('code')) {
      return submittedTxHash as TxSendError
    }

    //Tx was successful
    return submittedTxHash
  } catch (error) {
    //console.log(error)
    return error as TxSendError
  }
}

const getTxUnspentOutputs = async (walletAPI: WalletAPI) => {
  const txOutputs = TransactionUnspentOutputs.new()
  const utxos = (await getUtxos(walletAPI)) || []
  for (const utxo of utxos) {
    txOutputs.add(utxo.TransactionUnspentOutput)
  }
  return txOutputs
}

const getUtxos = async (walletAPI: WalletAPI) => {
  const Utxos = []

  try {
    const rawUtxos = await walletAPI.getUtxos()

    for (const rawUtxo of rawUtxos) {
      const utxo = TransactionUnspentOutput.from_bytes(
        Buffer.from(rawUtxo, 'hex')
      )
      const input = utxo.input()
      const txid = Buffer.from(
        input.transaction_id().to_bytes(),
        'utf8'
      ).toString('hex')
      const txindx = input.index()
      const output = utxo.output()
      const amount = output.amount().coin().to_str() // amount in lovelace
      const multiasset = output.amount().multiasset()
      let multiAssetStr = ''

      if (multiasset) {
        const keys = multiasset.keys() // policy Ids of the multiassets
        const N = keys.len()
        // console.log(`${N} Multiassets in the UTXO`)

        for (let i = 0; i < N; i++) {
          const policyId = keys.get(i)
          const policyIdHex = Buffer.from(policyId.to_bytes(), 'utf8').toString(
            'hex'
          )
          // console.log(`policyId: ${policyIdHex}`)
          const assets = multiasset.get(policyId)
          const assetNames = assets?.keys()
          const K = assetNames?.len() ?? 0
          // console.log(`${K} Assets in the Multiasset`)

          for (let j = 0; j < K; j++) {
            const assetName = assetNames?.get(j)
            const assetNameString = Buffer.from(
              assetName?.name(),
              'utf8'
            ).toString()
            const assetNameHex = Buffer.from(
              assetName?.name(),
              'utf8'
            ).toString('hex')
            const multiassetAmt = multiasset.get_asset(policyId, assetName!)
            multiAssetStr += `+ ${multiassetAmt.to_str()} + ${policyIdHex}.${assetNameHex} (${assetNameString})`
            // console.log(assetNameString)
            // console.log(`Asset Name: ${assetNameHex}`)
          }
        }
      }

      const utxoObj = {
        txid: txid,
        txindx: txindx,
        amount: amount,
        str: `${txid} #${txindx} = ${amount}`,
        multiAssetStr: multiAssetStr,
        TransactionUnspentOutput: utxo,
      }
      Utxos.push(utxoObj)
      // console.log(`utxo: ${str}`)
    }
    return Utxos
  } catch (error) {
    console.log(error)
  }
}
