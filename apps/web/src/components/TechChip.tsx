import { getTechIconSlug } from '../data/techIcons'

type TechChipProps = {
  label: string
  muted?: boolean
}

/** Chip de stack/competência: logo real da tecnologia quando reconhecida, texto puro quando é um conceito/prática. */
export function TechChip({ label, muted = false }: TechChipProps) {
  const slug = getTechIconSlug(label)
  const className = `chip${slug ? ' chip--icon' : ''}${muted ? ' chip--muted' : ''}`

  if (!slug) {
    return <span className={className}>{label}</span>
  }

  return (
    <span className={className}>
      <img className="chip__icon" src={`/icons/tech/${slug}.svg`} alt="" width={14} height={14} loading="lazy" />
      {label}
    </span>
  )
}
