/**
 * Grade decorativa de nós/linhas atrás do hero (tema de microsserviços/sistemas distribuídos,
 * não gradiente genérico de IA). Puramente visual: `aria-hidden`, cor herdada do token --color-primary.
 */
export function HeroMesh() {
  return (
    <svg className="hero__mesh" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g className="hero__mesh-lines">
        <path d="M560 60 L660 110 L760 70" />
        <path d="M660 110 L690 210" />
        <path d="M560 60 L520 170" />
        <path d="M520 170 L620 230 L690 210" />
        <path d="M620 230 L600 330" />
      </g>
      <g className="hero__mesh-nodes">
        <circle cx="560" cy="60" r="4" />
        <circle cx="660" cy="110" r="4" />
        <circle cx="760" cy="70" r="3" />
        <circle cx="520" cy="170" r="3.5" />
        <circle cx="690" cy="210" r="4" />
        <circle cx="620" cy="230" r="3" />
        <circle cx="600" cy="330" r="3" />
      </g>
    </svg>
  )
}
