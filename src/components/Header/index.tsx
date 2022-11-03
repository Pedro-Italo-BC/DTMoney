import { HaederContainer, HeaderContent, NewTransactionButton } from './styled'

import logoImg from '../../assets/logo.svg'

import * as Dialog from '@radix-ui/react-dialog'
import { NewTrasactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HaederContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTrasactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HaederContainer>
  )
}
