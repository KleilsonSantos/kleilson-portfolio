import { test, expect } from '@playwright/test'

test.describe('Portfolio smoke', () => {
  test('home carrega hero e CTAs', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Ver projetos' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Entrar em contato' })).toBeVisible()
  })

  test('home mostra status, métricas e links externos do hero', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/Aberto a oportunidades/).first()).toBeVisible()

    const metrics = page.locator('.metric-card')
    await expect(metrics).toHaveCount(4)
    await expect(metrics.first()).toContainText('50%')

    const profiles = page.getByRole('list', { name: 'Perfis externos' })
    await expect(profiles.getByRole('link', { name: /GitHub/ })).toHaveAttribute('target', '_blank')
    await expect(profiles.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('rel', /noopener/)
  })

  test('Home usa container largo, alinhado à navegação; Sobre fica estreita', async ({ page }) => {
    const width = (selector: string) =>
      page.locator(selector).first().evaluate((el) => el.getBoundingClientRect().width)

    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')
    const home = await width('main')
    await page.goto('/sobre')
    const sobre = await width('main')
    expect(home).toBeGreaterThan(sobre)
  })

  test('navegação entre rotas principais', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Navegação principal' })

    await page.goto('/')
    await nav.getByRole('link', { name: 'Sobre' }).click()
    await expect(page).toHaveURL(/\/sobre$/)
    await expect(page.getByRole('heading', { name: 'Sobre', exact: true })).toBeVisible()

    await nav.getByRole('link', { name: 'Projetos' }).click()
    await expect(page).toHaveURL(/\/projetos$/)
    await expect(page.getByRole('heading', { name: 'Projetos', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'banking' }).first()).toBeVisible()

    await nav.getByRole('link', { name: 'Contatos' }).click()
    await expect(page).toHaveURL(/\/contatos$/)
    await expect(page.getByRole('heading', { name: 'Contatos', exact: true })).toBeVisible()
  })

  test('404 para rota inexistente', async ({ page }) => {
    await page.goto('/rota-inexistente-xyz')
    await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Ir para Home' })).toBeVisible()
  })

  test('lista de projetos tem padding (não cola na borda)', async ({ page }) => {
    await page.goto('/projetos')
    const row = page.locator('.project-row').first()
    await expect(row).toBeVisible()
    const paddingLeft = await row.evaluate((el) => getComputedStyle(el).paddingLeft)
    const px = Number.parseFloat(paddingLeft)
    expect(px).toBeGreaterThanOrEqual(16)
  })

  test('formulário de contato valida e envia (mock API)', async ({ page }) => {
    await page.goto('/contatos')
    await page.getByLabel('Nome *').fill('Kleilson QA')
    await page.getByLabel('E-mail *').fill('qa@example.com')
    await page.getByLabel('Mensagem *').fill('Mensagem de teste E2E do portfólio.')
    await page.getByRole('button', { name: 'Enviar mensagem' }).click()
    await expect(page.getByText(/Mensagem enviada com sucesso/i)).toBeVisible()
  })
})
