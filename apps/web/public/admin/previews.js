/**
 * Decap CMS — preview pane templates (oficial: registerPreviewTemplate)
 * https://decapcms.org/docs/customization/
 *
 * File collections: name do ficheiro em config.yml (projects, profile, …).
 * Carregar DEPOIS de decap-cms.js; requer createClass + h no global CMS.
 */
;(function () {
  if (!window.CMS || typeof createClass === 'undefined' || typeof h === 'undefined') {
    console.warn('[admin] CMS/createClass/h indisponíveis — previews não registados')
    return
  }

  function listOf(entry, path) {
    var v = entry.getIn(['data'].concat(path.split('.')))
    if (!v || !v.map) return []
    return v
  }

  function str(node, key, fallback) {
    if (!node || typeof node.get !== 'function') return fallback || ''
    var v = node.get(key)
    return v == null || v === '' ? fallback || '' : String(v)
  }

  function stackChips(stack) {
    if (!stack || !stack.map) return null
    return h(
      'ul',
      { className: 'preview-stack' },
      stack.map(function (tech, i) {
        return h('li', { key: i, className: 'preview-chip' }, String(tech))
      }),
    )
  }

  var ProjectsPreview = createClass({
    displayName: 'ProjectsPreview',
    render: function () {
      var projects = listOf(this.props.entry, 'projects')
      return h(
        'div',
        { className: 'preview-root', 'data-testid': 'preview-projects' },
        h('p', { className: 'preview-eyebrow' }, 'Pré-visualização · Projetos'),
        h(
          'div',
          { className: 'preview-grid' },
          projects.map(function (p, i) {
            var name = str(p, 'name', str(p, 'id', 'Projeto'))
            var url = str(p, 'url')
            return h(
              'article',
              { key: str(p, 'id', String(i)), className: 'preview-card' },
              h(
                'header',
                { className: 'preview-card__head' },
                h('h2', { className: 'preview-card__title' }, name),
                p.get('featured')
                  ? h('span', { className: 'preview-badge' }, 'Featured')
                  : null,
              ),
              h('p', { className: 'preview-card__tagline' }, str(p, 'tagline')),
              h('p', { className: 'preview-card__body' }, str(p, 'description')),
              h('p', { className: 'preview-card__impact' }, str(p, 'impact')),
              stackChips(p.get('stack')),
              url
                ? h(
                    'a',
                    {
                      className: 'preview-card__link',
                      href: url,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                    'GitHub →',
                  )
                : null,
            )
          }),
        ),
      )
    },
  })

  var ProfilePreview = createClass({
    displayName: 'ProfilePreview',
    render: function () {
      var entry = this.props.entry
      var profile = entry.getIn(['data', 'profile'])
      var name = profile ? str(profile, 'name') : ''
      var title = profile ? str(profile, 'title') : ''
      var headline = profile ? str(profile, 'headline') : ''
      var summary = entry.getIn(['data', 'summary'])
      summary = summary == null ? '' : String(summary)
      return h(
        'div',
        { className: 'preview-root', 'data-testid': 'preview-profile' },
        h('p', { className: 'preview-eyebrow' }, 'Pré-visualização · Perfil'),
        h('h1', { className: 'preview-hero-name' }, name || 'Perfil'),
        h('p', { className: 'preview-hero-title' }, title),
        h('p', { className: 'preview-card__tagline' }, headline),
        h('p', { className: 'preview-card__body' }, summary),
      )
    },
  })

  var CredentialsPreview = createClass({
    displayName: 'CredentialsPreview',
    render: function () {
      var certs = listOf(this.props.entry, 'certifications')
      return h(
        'div',
        { className: 'preview-root', 'data-testid': 'preview-credentials' },
        h('p', { className: 'preview-eyebrow' }, 'Pré-visualização · Credenciais'),
        h(
          'ul',
          { className: 'preview-list' },
          certs.map(function (c, i) {
            return h(
              'li',
              { key: str(c, 'id', String(i)), className: 'preview-card' },
              h('strong', {}, str(c, 'name')),
              h('span', { className: 'preview-muted' }, ' · ' + str(c, 'issuer') + ' · ' + str(c, 'year')),
            )
          }),
        ),
      )
    },
  })

  var ContactPreview = createClass({
    displayName: 'ContactPreview',
    render: function () {
      var channels = listOf(this.props.entry, 'channels')
      return h(
        'div',
        { className: 'preview-root', 'data-testid': 'preview-contact' },
        h('p', { className: 'preview-eyebrow' }, 'Pré-visualização · Contacto'),
        h(
          'ul',
          { className: 'preview-list' },
          channels.map(function (ch, i) {
            return h(
              'li',
              { key: str(ch, 'id', String(i)), className: 'preview-card' },
              h('strong', {}, str(ch, 'label')),
              h('div', { className: 'preview-muted' }, str(ch, 'value')),
            )
          }),
        ),
      )
    },
  })

  CMS.registerPreviewTemplate('projects', ProjectsPreview)
  CMS.registerPreviewTemplate('profile', ProfilePreview)
  CMS.registerPreviewTemplate('credentials', CredentialsPreview)
  CMS.registerPreviewTemplate('contact', ContactPreview)
})()
