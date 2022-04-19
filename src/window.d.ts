import { CardanoWindowObj } from './types/models'

declare global {
  interface Window {
    cardano: CardanoWindowObj
  }
}
export default global
