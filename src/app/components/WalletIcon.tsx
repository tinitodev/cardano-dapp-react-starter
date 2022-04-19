import { useContext } from 'react'

import { WalletAPIContext } from '../../context/WalletAPI/WalletAPIContext'

const WalletIcon = () => {
  const { cardano } = window
  const { selectedWallet } = useContext(WalletAPIContext)

  if (selectedWallet === 'Nami') {
    return <img src={cardano?.nami?.icon} alt="Nami Icon" height="40px" />
  }

  if (selectedWallet === 'Flint') {
    return <img src={cardano?.flint?.icon} alt="Flint Icon" height="40px" />
  }

  if (selectedWallet === 'Eternl') {
    return <img src={cardano?.eternl?.icon} alt="Eternl Icon" height="40px" />
  }

  return null
}

export default WalletIcon
