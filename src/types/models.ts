import {
  Transaction,
  TransactionWitnessSet,
} from '@dcspark/cardano-multiplatform-lib-browser'

export type WalletSelection = 'Nami' | 'Flint' | 'Eternl'

export interface CardanoWindowObj {
  nami?: WalletObj
  flint?: WalletObj
  eternl?: WalletObj
  ccvault?: WalletObj
}

export interface WalletObj {
  name: string
  apiVersion: string
  icon: string
  isEnabled: () => Promise<boolean>
  enable: () => Promise<WalletAPI | APIError>
}

export interface WalletAPI {
  getChangeAddress: () => Promise<string>
  getNetworkId: () => Promise<NetworkId>
  getUtxos: () => Promise<Utxo[]>
  signTx: (
    tx: Transaction,
    partialSign: boolean
  ) => Promise<TransactionWitnessSet | TxSignError>
  submitTx: (tx: Transaction) => Promise<string | TxSendError>
}

export enum NetworkId {
  Testnet = 0,
  Mainnet = 1,
}

export type Utxo = {
  txHash: string
  txId: number
  amount: Asset[]
}

export type Asset = {
  unit: string
  quantity: string
}

//APIError
export interface APIError {
  code: APIErrorCode
  info: string
}
export enum APIErrorCode {
  InvalidRequest = -1,
  InternalError = -2,
  Refused = -3,
  AccountChange = -4,
}

//TxSignError
export interface TxSignError {
  code: TxSignErrorCode
  info: string
}
export enum TxSignErrorCode {
  ProofGeneration = 1,
  UserDeclined = 2,
}

//TxSendError
export interface TxSendError {
  code: TxSendErrorCode
  info: string
}
export enum TxSendErrorCode {
  Refused = 1,
  Failure = 2,
}
