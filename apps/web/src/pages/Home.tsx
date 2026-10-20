import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { PROFILE, SUMMARY, METRICS, HIGHLIGHTS, SKILL_GROUPS } from '../data/profileData'
import { ProfilePhoto } from '../components/ProfilePhoto'

const EXTERNAL_PROFILES = [
  { label: 'GitHub', href: PROFILE.github },
  { label: 'LinkedIn', href: PROFILE.linkedin },
] as const

function Home() {
  const ogImage = `${PROFILE.siteUrl.replace(/\/$/, '')}/images/og-image.png`

  useDocumentMeta({
    title: `${PROFILE.name} | ${PROFILE.title}`,
    description: SUMMARY,
    canonical: PROFILE.siteUrl,
    ogImage,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PROFILE.name,
      jobTitle: PROFILE.title,
      email: PROFILE.email,
      url: PROFILE.siteUrl,
      image: ogImage,
      sameAs: [PROFILE.github, PROFILE.linkedin],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Paulo Afonso',
        addressRegion: 'BA',
        addressCountry: 'BR',
      },
    },
  })

  return (
    <div className="page">
      <header className="hero hero--home">
        <div className="hero__intro">
          <ProfilePhoto size="lg" className="hero__photo" />
          <div className="hero__copy">
            <p className="hero__status">
              {PROFILE.currentRole} · {PROFILE.currentCompany}
            </p>
            <p className="hero__brand">{PROFILE.shortName}</p>
            <h1>{PROFILE.headline}</h1>
            <p className="hero__lead">{PROFILE.title}</p>
            <p className="hero__meta">
              {PROFILE.location} · {PROFILE.remote} · {PROFILE.yearsOfExperience} anos
            </p>
            <div className="cta-row">
              <Link to="/projetos" className="button-link" viewTransition>
                Ver projetos
              </Link>
              <Link to="/contatos" className="button-link secondary" viewTransition>
                Entrar em contato
              </Link>
              <ul className="hero__links" aria-label="Perfis externos">
                {EXTERNAL_PROFILES.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {label}
                      <span className="visually-hidden"> (abre em nova aba)</span>
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="card" aria-labelledby="summary-heading">
        <h2 id="summary-heading">Resumo profissional</h2>
        <p>{SUMMARY}</p>
      </section>

      <section aria-labelledby="highlights-heading">
        <h2 id="highlights-heading" className="section-heading">
          Destaques
        </h2>
        <ul className="metric-grid">
          {METRICS.map((metric) => (
            <li key={metric.value} className="metric-card">
              <p className="metric-card__value">{metric.value}</p>
              <p className="metric-card__label">{metric.label}</p>
            </li>
          ))}
        </ul>
        <ul className="highlight-grid">
          {HIGHLIGHTS.map((item) => (
            <li key={item} className="highlight-card">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="card" aria-labelledby="skills-heading">
        <h2 id="skills-heading">Competências</h2>
        <div className="grid-2">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="skill-panel">
              <h3>{group.title}</h3>
              <div className="stack-list">
                {group.skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
