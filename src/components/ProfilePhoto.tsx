import { PROFILE } from '../data/profileData'

type ProfilePhotoProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZE_PX = { sm: 72, md: 112, lg: 160 } as const

/**
 * Retrato 1:1 full-bleed — círculo só no wrapper CSS
 * (`overflow` em `<picture>` não clipa de forma confiável).
 */
export function ProfilePhoto({ size = 'md', className = '' }: ProfilePhotoProps) {
  const px = SIZE_PX[size]

  return (
    <div className={`profile-photo profile-photo--${size} ${className}`.trim()}>
      <picture>
        <source srcSet={PROFILE.photo} type="image/webp" />
        <img
          className="profile-photo__img"
          src={PROFILE.photoFallback}
          alt={`Foto profissional de ${PROFILE.name}`}
          width={px}
          height={px}
          decoding="async"
          fetchPriority={size === 'lg' ? 'high' : 'auto'}
        />
      </picture>
    </div>
  )
}
