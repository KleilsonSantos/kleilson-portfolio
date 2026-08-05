import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { PROFILE, SUMMARY, HIGHLIGHTS, SKILL_GROUPS } from '../data/profileData'
import { ProfilePhoto } from '../components/ProfilePhoto'

function Home() {
  const ogImage = `${PROFILE.siteUrl.replace(/\/$/, '')}/images/profile/kleilson-avatar.webp`
  const featuredHighlights = HIGHLIGHTS.slice(0, 4)
  const heroStack = ['Java', 'Spring Boot', 'Kafka', 'AppSec', 'DevSecOps']

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
            <p className="hero__brand">{PROFILE.shortName}</p>
            <h1>{PROFILE.headline}</h1>
            <p className="hero__lead">{PROFILE.title}</p>
            <p className="hero__meta">
              {PROFILE.location} · {PROFILE.remote} · {PROFILE.yearsOfExperience} anos ·{' '}
              {PROFILE.currentCompany}
            </p>
            <div className="cta-row">
              <Link to="/projetos" className="button-link" viewTransition>
                Ver projetos
              </Link>
              <Link to="/experiencia" className="button-link secondary" viewTransition>
                Ver experiência
              </Link>
            </div>
            <p className="hero__quick-links">
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                Ver currículo
              </a>
              <span aria-hidden="true"> · </span>
              <Link to="/contatos" viewTransition>
                Entrar em contato
              </Link>
            </p>
            <p className="hero__case-study-cta">
              <Link to="/projetos/banking" className="case-study-link" viewTransition>
                📋 Ler case study do projeto principal
              </Link>
            </p>
            <div className="hero__stack" aria-label="Stack principal">
              {heroStack.map((tech) => (
                <span key={tech} className="chip chip--hero">
                  {tech}
                </span>
              ))}
            </div>
            <div className="hero__proof" aria-label="Pontos de destaque da atuação">
              <div className="hero__proof-item">
                <strong>Arquitetura</strong>
                <span>Microsserviços, APIs e integração confiável</span>
              </div>
              <div className="hero__proof-item">
                <strong>Segurança</strong>
                <span>AppSec, testes e hardening contínuo</span>
              </div>
              <div className="hero__proof-item">
                <strong>Operação</strong>
                <span>Observabilidade e entregas com disciplina</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="card card--interactive" aria-labelledby="value-heading">
        <div className="section-heading-row">
          <p className="hero__brand">Arquitetura, segurança e entregas confiáveis</p>
          <h2 id="value-heading">Arquitetura, segurança e entregas confiáveis</h2>
        </div>
        <p>{SUMMARY}</p>
        <ul className="highlight-grid">
          {featuredHighlights.map((item) => (
            <li key={item} className="highlight-card">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="card card--interactive" aria-labelledby="skills-heading">
        <div className="section-heading-row">
          <p className="hero__brand">O que entrego</p>
          <h2 id="skills-heading">O que entrego</h2>
        </div>
        <p>
          Trabalho com foco em backend, arquitetura, segurança e evolução sustentável, com base em
          engenharia sólida, clareza operacional e entregas confiáveis.
        </p>
        <div className="grid-2">
          {SKILL_GROUPS.slice(0, 4).map((group) => (
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
