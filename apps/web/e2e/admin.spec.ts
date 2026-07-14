import { test, expect } from '@playwright/test'

/**
 * Smoke da superfície editorial Decap (#123 / ADR-0012).
 * Não autentica GitHub OAuth no CI (secrets humanos).
 * Gate visual: fixture local sem OAuth/CDN (Passo 5b).
 * /admin/ real não é página.goto — CDN Decap/fonts bloqueiam DCL offline.
 */
test.describe('Admin Decap smoke', () => {
  test('/admin HTML serve skin ADR-0004 (cache-bust v=5)', async ({ request }) => {
    const response = await request.get('/admin/')
    expect(response.ok()).toBeTruthy()
    const html = await response.text()
    expect(html).toMatch(/Editorial/i)
    expect(html).toContain('Kleilson Santos')
    expect(html).toContain('id="nc-root"')
    expect(html).toContain('/design-tokens.css?v=5')
    expect(html).toContain('/admin/admin.css?v=5')
    expect(html).not.toContain('obs.observe(document.documentElement')
    expect(html).toContain('decap-cms')

    const tokens = await request.get('/design-tokens.css?v=5')
    expect(tokens.ok()).toBeTruthy()
    const tokenCss = await tokens.text()
    expect(tokenCss).toContain('--color-primary: #2dd4bf')
    expect(tokenCss).toContain("--font-display: 'Sora'")

    const skin = await request.get('/admin/admin.css?v=5')
    expect(skin.ok()).toBeTruthy()
    const skinCss = await skin.text()
    expect(skinCss).toContain('StyledModal')
    expect(skinCss).toContain('ListItem')
    expect(skinCss).toContain(
      "#nc-root [class*='ControlContainer'] > div:has(> [class*='TopBarContainer'])",
    )
    expect(skinCss).toContain('--color-bg-elevated')
    expect(skinCss).not.toContain('fonts.googleapis.com')
  })

  test('/admin/skin-fixture — object shell deixa de ser #fff (Passo 5b)', async ({ page }) => {
    const response = await page.goto('/admin/skin-fixture.html', {
      waitUntil: 'domcontentloaded',
    })
    expect(response?.ok()).toBeTruthy()

    await page.waitForFunction(
      () =>
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-bg-subtle')
          .trim().length > 0,
      { timeout: 10_000 },
    )

    const shellBg = await page
      .getByTestId('object-shell')
      .evaluate((el) => getComputedStyle(el).backgroundColor)
    const editorBg = await page
      .locator('.EditorContainer')
      .evaluate((el) => getComputedStyle(el).backgroundColor)
    const labelBg = await page
      .getByTestId('object-label')
      .evaluate((el) => getComputedStyle(el).backgroundColor)
    const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    const logoColor = await page
      .locator('.admin-brandbar__logo')
      .evaluate((el) => getComputedStyle(el).color)

    // #141c2b = --color-bg-subtle · #070b12 = --color-bg
    expect(shellBg).toMatch(/rgb\(\s*20,\s*28,\s*43\s*\)/)
    expect(editorBg).toMatch(/rgb\(\s*7,\s*11,\s*18\s*\)/)
    expect(labelBg).not.toMatch(/rgb\(\s*255,\s*255,\s*255\s*\)/)
    expect(labelBg).not.toMatch(/rgb\(\s*223,\s*223,\s*227\s*\)/)
    expect(bodyBg).toMatch(/rgb\(\s*7,\s*11,\s*18\s*\)/)
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
