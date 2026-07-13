import { test, expect } from '@playwright/test'

/**
 * Smoke da superfície editorial Decap (#123 / ADR-0012).
 * Não autentica GitHub OAuth no CI (secrets humanos).
 */
test.describe('Admin Decap smoke', () => {
  test('/admin carrega shell editorial', async ({ page }) => {
    const response = await page.goto('/admin/')
    expect(response?.ok()).toBeTruthy()
    await expect(page).toHaveTitle(/Editorial/i)
    await expect(page.locator('script[src*="decap-cms"]')).toHaveCount(1)
  })

  test('/admin/config.yml aponta GitHub + sandbox', async ({ request }) => {
    const response = await request.get('/admin/config.yml')
    expect(response.ok()).toBeTruthy()
    const body = await response.text()
    expect(body).toContain('name: github')
    expect(body).toMatch(/branch:\s*sandbox/)
    expect(body).toContain('KleilsonSantos/kleilson-portfolio')
    expect(body).toContain('publish_mode: simple')
  })
})
