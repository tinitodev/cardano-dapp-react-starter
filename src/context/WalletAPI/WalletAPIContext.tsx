import { createContext } from 'react'

import {
  WalletAPI,
  WalletSelection,
  NetworkId,
  APIError,
} from '../../types/models'

interface walletAPIContextState {
  address: string
  networkId?: NetworkId
  selectedWallet?: WalletSelection
  walletAPI?: WalletAPI
  walletAPIError?: APIError
  selectWallet: (wallet: WalletSelection) => void
  connectWallet: () => void
  isMainnet: boolean
}

export const WalletAPIContext = createContext<walletAPIContextState>(
  {} as walletAPIContextState
)
