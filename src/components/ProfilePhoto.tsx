import { PROFILE } from '../data/profileData'

type ProfilePhotoProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZE_PX = { sm: 72, md: 112, lg: 160 } as const

/**
 * Retrato profissional — crop 1:1 em `public/images/profile/`.
 * Círculo via CSS (ADR-0004); não embutir máscara no arquivo.
 */
export function ProfilePhoto({ size = 'md', className = '' }: ProfilePhotoProps) {
  const px = SIZE_PX[size]

  return (
    <picture className={`profile-photo profile-photo--${size} ${className}`.trim()}>
      <source srcSet={PROFILE.photo} type="image/webp" />
      <img
        src={PROFILE.photoFallback}
        alt={`Foto profissional de ${PROFILE.name}`}
        width={px}
        height={px}
        decoding="async"
        fetchPriority={size === 'lg' ? 'high' : 'auto'}
      />
    </picture>
  )
}
