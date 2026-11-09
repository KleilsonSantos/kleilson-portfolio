import { getTechIconSlug } from '../data/techIcons'
import { BrandIcon } from './BrandIcon'

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
      <BrandIcon slug={slug} className="chip__icon" />
      {label}
    </span>
  )
}
