import { useState, useEffect } from 'react'
import { Address } from '@dcspark/cardano-multiplatform-lib-browser'
import { Buffer } from 'buffer'

import { WalletAPIContext } from './WalletAPIContext'
import {
  APIError,
  NetworkId,
  WalletAPI,
  WalletSelection,
} from '../../types/models'

export const WalletAPIProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const { cardano } = window

  const [selectedWallet, setSelectedWallet] = useState<WalletSelection>()
  const [walletAPI, setWalletAPI] = useState<WalletAPI>()
  const [address, setAddress] = useState('')
  const [networkId, setNetworkId] = useState<NetworkId>()

  const [walletAPIError, setWalletAPIError] = useState<APIError>()
  const [isMainnet, setIsMainnet] = useState(false)

  useEffect(() => {
    //TODO: load anything needed from localstorage
    // For example selected wallet option, etc
  }, [])

  useEffect(() => {
    if (selectedWallet) {
      connectWallet()
    }
  }, [selectedWallet])

  useEffect(() => {
    if (networkId === 0) {
      getAddress()
    } else if (networkId === 1) {
      setIsMainnet(true)
    }
  }, [networkId])

  const selectWallet = (wallet: WalletSelection) => {
    setSelectedWallet(wallet)
  }

  const connectWallet = async () => {
    if (selectedWallet === undefined) return

    let walletAPIResponse
    try {
      if (selectedWallet === 'Nami') {
        walletAPIResponse = await cardano?.nami?.enable()
      } else if (selectedWallet === 'Flint') {
        walletAPIResponse = await cardano?.flint?.enable()
      } else if (selectedWallet === 'Eternl') {
        walletAPIResponse = await cardano?.eternl?.enable()
      }

      if (walletAPIResponse === undefined) return

      if (walletAPIResponse.hasOwnProperty('getNetworkId')) {
        // WalletAPI fetched successfully
        const _walletAPI = walletAPIResponse as WalletAPI
        const _networkId = await _walletAPI.getNetworkId()

        setWalletAPI(_walletAPI)
        setNetworkId(_networkId as NetworkId)
      } else {
        // There was an APIError
        const _APIError = walletAPIResponse as APIError

        setWalletAPIError(_APIError)
      }
    } catch (err) {
      //TODO: set better Error Handling (show message)
      console.log(err)
    }
  }

  const getAddress = async () => {
    const raw = await walletAPI?.getChangeAddress()
    const addr = Address.from_bytes(Buffer.from(raw ?? '', 'hex')).to_bech32()
    setAddress(addr)
  }

  return (
    <WalletAPIContext.Provider
      value={{
        address,
        networkId,
        selectedWallet,
        walletAPI,
        walletAPIError,
        selectWallet,
        connectWallet,
        isMainnet,
      }}
    >
      {children}
    </WalletAPIContext.Provider>
  )
}
