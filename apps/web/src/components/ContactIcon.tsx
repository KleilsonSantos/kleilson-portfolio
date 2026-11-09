type ContactIconName = 'mail' | 'phone' | 'whatsapp' | 'location'

const PATHS: Record<ContactIconName, string> = {
  mail: 'M3 5h18v14H3zm0 0 9 7 9-7',
  phone:
    'M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z',
  whatsapp: 'M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z',
  location: 'M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z',
}

/** Ícone decorativo (aria-hidden) para os canais diretos de contato; o texto ao lado já descreve o canal. */
export function ContactIcon({ name }: { name: string }) {
  const path = PATHS[name as ContactIconName]
  if (!path) return null

  return (
    <svg
      className="info-list__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
      {name === 'location' ? <circle cx="12" cy="9" r="2.5" /> : null}
    </svg>
  )
}
