export function getGamesLink(isAuthenticated) {
  return isAuthenticated
    ? { path: '/dashboard', hash: '#games' }
    : { path: '/', hash: '#games' }
}

export function getAboutLink() {
  return { path: '/', hash: '#about' }
}

export function getFaqLink() {
  return { path: '/faq' }
}

export function scrollToHash(hash, attempts = 0) {
  const selector = hash.startsWith('#') ? hash : `#${hash}`
  const element = document.querySelector(selector)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    return true
  }

  if (attempts < 30) {
    setTimeout(() => scrollToHash(hash, attempts + 1), 50)
  }

  return false
}

export async function navigateToSection(router, target, isAuthenticated) {
  let routeTarget

  if (target === 'games') {
    routeTarget = getGamesLink(isAuthenticated)
  } else if (target === 'about') {
    routeTarget = getAboutLink()
  } else if (target === 'faq') {
    routeTarget = getFaqLink()
  } else {
    return
  }

  const hash = routeTarget.hash || ''
  const current = router.currentRoute.value

  if (current.path === routeTarget.path && (!hash || current.hash === hash)) {
    if (hash) {
      scrollToHash(hash)
    }
    return
  }

  await router.push({
    path: routeTarget.path,
    hash: hash || undefined
  })

  if (hash) {
    scrollToHash(hash)
  }
}
