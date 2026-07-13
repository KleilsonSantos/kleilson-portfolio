import { test, expect } from '@playwright/test'

/**
 * Smoke da superfície editorial Decap (#123 / ADR-0012).
 * Não autentica GitHub OAuth no CI (secrets humanos).
 * Gate visual: contraste dark-first sem depender de login.
 */
test.describe('Admin Decap smoke', () => {
  test('/admin carrega shell editorial alinhado ao profile', async ({ page }) => {
    const response = await page.goto('/admin/')
    expect(response?.ok()).toBeTruthy()
    await expect(page).toHaveTitle(/Editorial/i)

    await expect(page.locator('link[href="/design-tokens.css?v=3"]')).toHaveCount(1)
    await expect(page.locator('link[href="/admin/admin.css?v=3"]')).toHaveCount(1)
    await expect(page.locator('.admin-brandbar__logo')).toHaveText('Kleilson Santos')
    await expect(page.locator('#nc-root')).toHaveCount(1)
    await expect(page.locator('script[src*="decap-cms"]')).toHaveCount(1)

    const tokens = await page.request.get('/design-tokens.css?v=3')
    expect(tokens.ok()).toBeTruthy()
    const tokenCss = await tokens.text()
    expect(tokenCss).toContain('--color-primary: #2dd4bf')
    expect(tokenCss).toContain("--font-display: 'Sora'")

    const skin = await page.request.get('/admin/admin.css?v=3')
    expect(skin.ok()).toBeTruthy()
    const skinCss = await skin.text()
    expect(skinCss).toContain("StyledModal")
    expect(skinCss).toContain('ListItem')
    expect(skinCss).toContain('--color-bg-elevated')

    // Tokens + skin carregam após o bundle Decap — esperar variáveis ADR-0004
    await page.waitForFunction(
      () =>
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-text')
          .trim().length > 0,
      { timeout: 10_000 },
    )

    // Contraste shell: fundo escuro + texto claro (ADR-0004)
    const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    const logoColor = await page
      .locator('.admin-brandbar__logo')
      .evaluate((el) => getComputedStyle(el).color)
    // rgb(7, 11, 18) ≈ #070b12
    expect(bodyBg).toMatch(/rgb\(\s*7,\s*11,\s*18\s*\)/)
    // rgb(232, 238, 247) ≈ #e8eef7
    expect(logoColor).toMatch(/rgb\(\s*232,\s*238,\s*247\s*\)/)
  })

  test('/admin/config.yml aponta GitHub + sandbox (sem logo_url depreciado)', async ({
    request,
  }) => {
    const response = await request.get('/admin/config.yml')
    expect(response.ok()).toBeTruthy()
    const body = await response.text()
    expect(body).toContain('name: github')
    expect(body).toMatch(/branch:\s*sandbox/)
    expect(body).toContain('KleilsonSantos/kleilson-portfolio')
    expect(body).toContain('publish_mode: simple')
    expect(body).toContain('logo:')
    expect(body).not.toContain('logo_url:')
  })
})
