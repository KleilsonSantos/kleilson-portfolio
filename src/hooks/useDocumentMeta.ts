import { useEffect } from 'react'
import type { DocumentMetaOptions } from '../types'

function setMetaTag(attribute: string, key: string, content: string | undefined): void {
  if (!content) return

  let element = document.querySelector(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setLinkTag(rel: string, href: string | undefined): void {
  if (!href) return

  let element = document.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function setJsonLd(id: string, data: Record<string, unknown>): void {
  let element = document.getElementById(id)

  if (!element) {
    const script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
    element = script
  }

  element.textContent = JSON.stringify(data)
}

export function useDocumentMeta({
  title,
  description,
  canonical,
  ogImage,
  jsonLd,
}: DocumentMetaOptions): void {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    setMetaTag('name', 'description', description)
    setMetaTag('name', 'robots', 'index, follow')
    setMetaTag('name', 'theme-color', '#4f46e5')
    setLinkTag('canonical', canonical)

    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:url', canonical)
    setMetaTag('property', 'og:locale', 'pt_BR')
    if (ogImage) setMetaTag('property', 'og:image', ogImage)

    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', title)
    setMetaTag('name', 'twitter:description', description)
    if (ogImage) setMetaTag('name', 'twitter:image', ogImage)

    if (jsonLd) setJsonLd('page-json-ld', jsonLd)

    return () => {
      document.title = previousTitle
    }
  }, [title, description, canonical, ogImage, jsonLd])
}
