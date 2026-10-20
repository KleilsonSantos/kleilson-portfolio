import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import Contatos from './Contatos'

describe('Contatos', () => {
  afterEach(cleanup)

  it('associa erros de validação com aria-invalid e describedby', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <Contatos />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    const name = screen.getByLabelText('Nome *')
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(name).toHaveAttribute('aria-describedby', 'name-error')
    expect(screen.getByText('Nome é obrigatório.')).toBeInTheDocument()
  })

  it('move o foco para o primeiro campo inválido ao enviar', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Contatos />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(screen.getByLabelText('Nome *')).toHaveFocus()
  })

  it('foca o primeiro inválido na ordem do formulário, pulando campos válidos', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Contatos />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText('Nome *'), 'Ana Teste')
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(screen.getByLabelText('E-mail *')).toHaveFocus()
  })

  it('mantém a região de status montada, mesmo vazia, para anúncios confiáveis', () => {
    render(
      <MemoryRouter>
        <Contatos />
      </MemoryRouter>,
    )

    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })
})
