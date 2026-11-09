/** Logo real de marca (Simple Icons, CC0) para prefixar links de GitHub/LinkedIn/provedores de curso. Decorativo: o texto ao lado já identifica o link. */
export function BrandIcon({ slug }: { slug: string }) {
  return (
    <img
      className="icon-badge"
      src={`/icons/tech/${slug}.svg`}
      alt=""
      width={14}
      height={14}
      loading="lazy"
    />
  )
}
