import { test, expect } from '@playwright/test'

/**
 * Smoke da superfície editorial Decap (#123 / ADR-0012).
 * Não autentica GitHub OAuth no CI (secrets humanos).
 */
test.describe('Admin Decap smoke', () => {
  test('/admin carrega shell editorial alinhado ao profile', async ({ page }) => {
    const response = await page.goto('/admin/')
    expect(response?.ok()).toBeTruthy()
    await expect(page).toHaveTitle(/Editorial/i)

    await expect(page.locator('link[href="/design-tokens.css"]')).toHaveCount(1)
    await expect(page.locator('link[href="/admin/admin.css"]')).toHaveCount(1)
    await expect(page.locator('.admin-brandbar__logo')).toHaveText('Kleilson Santos')
    await expect(page.locator('script[src*="decap-cms"]')).toHaveCount(1)

    const tokens = await page.request.get('/design-tokens.css')
    expect(tokens.ok()).toBeTruthy()
    const tokenCss = await tokens.text()
    expect(tokenCss).toContain('--color-primary: #2dd4bf')
    expect(tokenCss).toContain("--font-display: 'Sora'")
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
