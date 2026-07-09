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
      <header className="hero">
        <span className="badge">{PROFILE.certification}</span>
        <h1>{PROFILE.name}</h1>
        <p>{PROFILE.headline}</p>
        <p>
          {PROFILE.location} · {PROFILE.remote}
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

      <section className="card">
        <h2>Resumo profissional</h2>
        <p>{SUMMARY}</p>
      </section>

      <section className="card">
        <h2>Destaques</h2>
        <ul>
          {HIGHLIGHTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Competências</h2>
        <div className="grid-2">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title}>
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
