/** Logo real de marca (Simple Icons, CC0) — `public/icons/tech/<slug>.svg`. Decorativo: o texto ao lado já identifica o link/chip. */
export function BrandIcon({ slug, className = 'icon-badge' }: { slug: string; className?: string }) {
  return (
    <img
      className={className}
      src={`/icons/tech/${slug}.svg`}
      alt=""
      width={14}
      height={14}
      loading="lazy"
    />
  )
}
