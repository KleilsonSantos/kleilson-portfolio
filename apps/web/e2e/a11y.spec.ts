import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

const ROUTES = ['/', '/sobre', '/projetos', '/contatos'] as const
const THEMES = ['dark', 'light'] as const

test.describe('Acessibilidade (axe, WCAG 2.2 AA)', () => {
  for (const theme of THEMES) {
    for (const route of ROUTES) {
      test(`${route} no tema ${theme} sem violações`, async ({ page }) => {
        // Sem animação de entrada: opacity parcial distorce o cálculo de contraste.
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.addInitScript((value) => localStorage.setItem('kleilson-theme', value), theme)
        await page.goto(route)
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

        const { violations } = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze()

        expect(
          violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => n.target) })),
        ).toEqual([])
      })
    }
  }
})
