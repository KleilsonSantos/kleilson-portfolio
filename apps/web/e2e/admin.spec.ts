import { test, expect } from '@playwright/test'

/**
 * Smoke da superfície editorial Decap (#123 / ADR-0012).
 * Não autentica GitHub OAuth no CI (secrets humanos).
 * Gate visual Passo 5b: skin-fixture (chrome) + preview-fixture (painel direito).
 * /admin/ real não é page.goto — CDN Decap/fonts bloqueiam DCL offline.
 */
test.describe('Admin Decap smoke', () => {
  test('/admin HTML — chrome + previews.js + preview styles (v=9)', async ({ request }) => {
    const response = await request.get('/admin/')
    expect(response.ok()).toBeTruthy()
    const html = await response.text()
    expect(html).toMatch(/Editorial/i)
    expect(html).toContain('Kleilson Santos')
    expect(html).toContain('id="nc-root"')
    expect(html).toContain('/design-tokens.css?v=9')
    expect(html).toContain('/admin/admin-chrome.css?v=9')
    expect(html).toContain('/admin/previews.js?v=9')
    expect(html).toContain("registerPreviewStyle('/admin/admin-preview.css?v=9')")
    expect(html).not.toContain("registerPreviewStyle('/admin/admin.css")
    expect(html).not.toContain("registerPreviewStyle('/admin/admin-chrome")
    expect(html).not.toContain('obs.observe(document.documentElement')
    expect(html).toContain('decap-cms')

    const previews = await request.get('/admin/previews.js?v=9')
    expect(previews.ok()).toBeTruthy()
    const previewsJs = await previews.text()
    expect(previewsJs).toContain("registerPreviewTemplate('projects'")
    expect(previewsJs).toContain('preview-card')
    expect(previewsJs).toContain('preview-grid')

    const chrome = await request.get('/admin/admin-chrome.css?v=9')
    expect(chrome.ok()).toBeTruthy()
    const chromeCss = await chrome.text()
    expect(chromeCss).not.toContain("[class*='StyledModal'] > div")
    expect(chromeCss).not.toContain('min-height: 12rem')

    const preview = await request.get('/admin/admin-preview.css?v=9')
    expect(preview.ok()).toBeTruthy()
    const previewCss = await preview.text()
    expect(previewCss).toContain('.preview-card')
    expect(previewCss).toContain('--font-display')
  })

  test('/admin/skin-fixture — cores ADR-0004 (Passo 5b chrome)', async ({ page }) => {
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
    expect(shellBg).toMatch(/rgb\(\s*20,\s*28,\s*43\s*\)/)
    expect(editorBg).toMatch(/rgb\(\s*7,\s*11,\s*18\s*\)/)
  })

  test('/admin/preview-fixture — cards Projetos legíveis (Passo 5b preview)', async ({
    page,
  }) => {
    const response = await page.goto('/admin/preview-fixture.html', {
      waitUntil: 'domcontentloaded',
    })
    expect(response?.ok()).toBeTruthy()

    await page.waitForFunction(
      () =>
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-bg-elevated')
          .trim().length > 0,
      { timeout: 10_000 },
    )

    const root = page.getByTestId('preview-projects')
    await expect(root).toBeVisible()
    await expect(page.locator('.preview-card')).toHaveCount(2)
    await expect(page.locator('.preview-card__title').first()).toHaveText('banking')

    const cardBg = await page
      .locator('.preview-card')
      .first()
      .evaluate((el) => getComputedStyle(el).backgroundColor)
    const titleColor = await page
      .locator('.preview-card__title')
      .first()
      .evaluate((el) => getComputedStyle(el).color)
    const gap = await page
      .locator('.preview-grid')
      .evaluate((el) => getComputedStyle(el).gap || getComputedStyle(el).rowGap)

    // elevated #0d1420 · text #e8eef7 — não branco colado
    expect(cardBg).toMatch(/rgb\(\s*13,\s*20,\s*32\s*\)/)
    expect(titleColor).toMatch(/rgb\(\s*232,\s*238,\s*247\s*\)/)
    expect(Number.parseFloat(gap)).toBeGreaterThanOrEqual(16)
  })

  test('/admin/config.yml aponta GitHub + sandbox (logo atual, sem logo_url)', async ({
    request,
  }) => {
    const response = await request.get('/admin/config.yml')
    expect(response.ok()).toBeTruthy()
    const body = await response.text()
    expect(body).toContain('name: github')
    expect(body).toMatch(/branch:\s*sandbox/)
    expect(body).toContain('collapsed: true')
    expect(body).toContain('logo:')
    expect(body).toContain('show_in_header: false')
    expect(body).not.toContain('logo_url:')
  })
})
