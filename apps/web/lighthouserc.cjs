/**
 * Lighthouse CI — Core Web Vitals / a11y / SEO (#5).
 * Docs: https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
 *
 * Usa staticDistDir (mais estável que preview server no CI).
 * Rotas SPA profundas ficam para evolução com server SPA-aware.
 */
const mobile = process.env.LH_FORM_FACTOR === 'mobile'

module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: ['http://localhost/'],
      numberOfRuns: 1,
      // Sem preset, o Lighthouse usa a emulação mobile padrão.
      settings: mobile ? {} : { preset: 'desktop' },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: mobile ? '.lighthouseci/mobile' : '.lighthouseci',
    },
  },
}
