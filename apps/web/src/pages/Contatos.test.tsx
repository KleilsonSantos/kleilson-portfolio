import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Contatos from './Contatos'

describe('Contatos', () => {
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
})
