import { test, expect } from '@playwright/test'

/**
 * Smoke da superfície editorial Decap (#123 / ADR-0012).
 * Não autentica GitHub OAuth no CI (secrets humanos).
 * Gate visual: fixture local sem OAuth/CDN (Passo 5b).
 * /admin/ real não é page.goto — CDN Decap/fonts bloqueiam DCL offline.
 */
test.describe('Admin Decap smoke', () => {
  test('/admin HTML — chrome token-only + preview separado (v=8)', async ({ request }) => {
    const response = await request.get('/admin/')
    expect(response.ok()).toBeTruthy()
    const html = await response.text()
    expect(html).toMatch(/Editorial/i)
    expect(html).toContain('Kleilson Santos')
    expect(html).toContain('id="nc-root"')
    expect(html).toContain('/design-tokens.css?v=8')
    expect(html).toContain('/admin/admin-chrome.css?v=8')
    expect(html).toContain("registerPreviewStyle('/admin/admin-preview.css?v=8')")
    expect(html).not.toContain("registerPreviewStyle('/admin/admin.css")
    expect(html).not.toContain("registerPreviewStyle('/admin/admin-chrome")
    expect(html).not.toContain('obs.observe(document.documentElement')
    expect(html).toContain('decap-cms')

    const tokens = await request.get('/design-tokens.css?v=8')
    expect(tokens.ok()).toBeTruthy()
    const tokenCss = await tokens.text()
    expect(tokenCss).toContain('--color-primary: #2dd4bf')
    expect(tokenCss).toContain("--font-display: 'Sora'")

    const chrome = await request.get('/admin/admin-chrome.css?v=8')
    expect(chrome.ok()).toBeTruthy()
    const chromeCss = await chrome.text()
    expect(chromeCss).toContain('StyledModal')
    expect(chromeCss).toContain('ListItem')
    expect(chromeCss).toContain(
      "#nc-root [class*='ControlContainer'] > div:has(> [class*='TopBarContainer'])",
    )
    expect(chromeCss).toContain('--color-bg-elevated')
    expect(chromeCss).not.toContain("[class*='StyledModal'] > div")
    expect(chromeCss).not.toContain('min-height: 12rem')
    expect(chromeCss).not.toContain('fonts.googleapis.com')

    const preview = await request.get('/admin/admin-preview.css?v=8')
    expect(preview.ok()).toBeTruthy()
    const previewCss = await preview.text()
    expect(previewCss).toContain('registerPreviewStyle')
    expect(previewCss).toContain('--font-display')
  })

  test('/admin/skin-fixture — cores ADR-0004 sem layout inventado (Passo 5b)', async ({
    page,
  }) => {
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

    // #141c2b = --color-bg-subtle · #070b12 = --color-bg · #0d1420 elevated
    expect(shellBg).toMatch(/rgb\(\s*20,\s*28,\s*43\s*\)/)
    expect(editorBg).toMatch(/rgb\(\s*7,\s*11,\s*18\s*\)/)
    expect(labelBg).not.toMatch(/rgb\(\s*255,\s*255,\s*255\s*\)/)
    expect(bodyBg).toMatch(/rgb\(\s*7,\s*11,\s*18\s*\)/)
    expect(logoColor).toMatch(/rgb\(\s*232,\s*238,\s*247\s*\)/)

    const listCardBg = await page
      .getByTestId('list-card')
      .evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(listCardBg).toMatch(/rgb\(\s*13,\s*20,\s*32\s*\)/)

    const listItemBg = await page
      .getByTestId('list-item')
      .evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(listItemBg).toMatch(/rgb\(\s*13,\s*20,\s*32\s*\)/)

    const emptyBg = await page
      .getByTestId('media-empty')
      .evaluate((el) => getComputedStyle(el).backgroundColor)
    // transparent → rgba(0,0,0,0) sob parent
    expect(emptyBg).toMatch(/rgba\(\s*0,\s*0,\s*0,\s*0\s*\)|transparent/)
  })

  test('/admin/config.yml aponta GitHub + sandbox (logo atual, sem logo_url)', async ({
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
    expect(body).toContain('show_in_header: false')
    expect(body).not.toContain('logo_url:')
  })
})
