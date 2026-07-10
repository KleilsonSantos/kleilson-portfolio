import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Footer from './Footer'
import { PROFILE } from '../data/profileData'

describe('Footer', () => {
  it('renderiza nome do perfil e links principais', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(screen.getAllByText(PROFILE.name).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByRole('navigation', { name: 'Links do rodapé' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', PROFILE.github)
  })
})
