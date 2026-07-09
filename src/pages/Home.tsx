import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { PROFILE, SUMMARY, HIGHLIGHTS, SKILL_GROUPS } from '../data/profileData'

function Home() {
  useDocumentMeta({
    title: `${PROFILE.name} | ${PROFILE.title}`,
    description: SUMMARY,
    canonical: PROFILE.siteUrl,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PROFILE.name,
      jobTitle: PROFILE.title,
      email: PROFILE.email,
      url: PROFILE.siteUrl,
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
        <p className="hero__brand">{PROFILE.shortName}</p>
        <h1>{PROFILE.headline}</h1>
        <p className="hero__lead">{PROFILE.title}</p>
        <p className="hero__meta">
          {PROFILE.location} · {PROFILE.remote} · {PROFILE.certification}
        </p>
        <div className="cta-row">
          <Link to="/projetos" className="button-link">
            Ver projetos
          </Link>
          <Link to="/contatos" className="button-link secondary">
            Entrar em contato
          </Link>
        </div>
      </header>

      <section className="card card--interactive" aria-labelledby="summary-heading">
        <h2 id="summary-heading">Resumo profissional</h2>
        <p>{SUMMARY}</p>
      </section>

      <section className="card card--interactive" aria-labelledby="highlights-heading">
        <h2 id="highlights-heading">Destaques</h2>
        <ul className="highlight-grid">
          {HIGHLIGHTS.map((item) => (
            <li key={item} className="highlight-card">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="card card--interactive" aria-labelledby="skills-heading">
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
