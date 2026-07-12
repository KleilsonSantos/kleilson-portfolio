;(function () {
  var BASE = 'https://kleilson-portfolio.pages.dev'
  var REPO_PREFIX = /^\/kleilson-portfolio\/?/

  function canonicalPath(pathname) {
    var path = pathname.replace(REPO_PREFIX, '/') || '/'
    if (path.charAt(0) !== '/') path = '/' + path
    // Direct hits on the redirect assets themselves map to home.
    if (path === '/404.html' || path === '/index.html' || path === '/redirect.js') {
      return '/'
    }
    return path
  }

  function buildTarget() {
    return BASE + canonicalPath(location.pathname) + location.search + location.hash
  }

  var target = buildTarget()
  var dest = document.getElementById('dest')
  if (dest) {
    dest.href = target
    dest.textContent = target.replace(/^https:\/\//, '')
  }
  var canonical = document.getElementById('canonical')
  if (canonical) canonical.href = target

  location.replace(target)
})()
