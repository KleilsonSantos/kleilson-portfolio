import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { PROFILE } from '../data/profileData'
import { PROJECTS } from '../data/projectsData'
import type { Project } from '../types'

function FeaturedProject({ project, primary }: { project: Project; primary?: boolean }) {
  return (
    <article className={`project-feature${primary ? ' project-feature--primary' : ''}`}>
      <div className="project-feature__body">
        <p className="project-feature__label">{primary ? 'Projeto em destaque' : 'Destaque'}</p>
        <h3 className="project-feature__title">
          <a href={project.url} target="_blank" rel="noreferrer">
            {project.name}
          </a>
        </h3>
        <p className="project-feature__tagline">{project.tagline}</p>
        <p className="project-feature__desc">{project.description}</p>
        <p className="project-feature__impact">{project.impact}</p>
        <div className="stack-list">
          {project.stack.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>
        <a className="project-feature__link" href={project.url} target="_blank" rel="noreferrer">
          Ver no GitHub →
        </a>
      </div>
    </article>
  )
}

function CompactProject({ project }: { project: Project }) {
  return (
    <article className="project-row">
      <div className="project-row__main">
        <h3>
          <a href={project.url} target="_blank" rel="noreferrer">
            {project.name}
          </a>
        </h3>
        <p>{project.tagline}</p>
      </div>
      <div className="project-row__stack">
        {project.stack.slice(0, 4).map((tech) => (
          <span key={tech} className="chip chip--muted">
            {tech}
          </span>
        ))}
      </div>
      <a className="project-row__link" href={project.url} target="_blank" rel="noreferrer">
        GitHub →
      </a>
    </article>
  )
}

function Projetos() {
  const featured = PROJECTS.filter((project) => project.featured)
  const [primary, ...secondaryFeatured] = featured
  const others = PROJECTS.filter((project) => !project.featured)

  useDocumentMeta({
    title: `Projetos | ${PROFILE.shortName}`,
    description:
      'Projetos open source e referências técnicas em microsserviços, DevSecOps, Spring Boot, Kafka e AI Engineering.',
    canonical: `${PROFILE.siteUrl}/projetos`,
  })

  return (
    <div className="page">
      <header className="hero">
        <p className="hero__brand">Open Source</p>
        <h1>Projetos</h1>
        <p className="hero__lead">
          Repositórios públicos que demonstram arquitetura, qualidade de código e práticas de
          engenharia — em laboratórios técnicos e padrões alinhados a produção.
        </p>
      </header>

      {primary ? (
        <section aria-labelledby="featured-primary-heading">
          <h2 id="featured-primary-heading" className="visually-hidden">
            Projeto em destaque
          </h2>
          <FeaturedProject project={primary} primary />
        </section>
      ) : null}

      {secondaryFeatured.length > 0 ? (
        <section aria-labelledby="featured-more-heading">
          <h2 id="featured-more-heading" className="section-heading">
            Mais destaques
          </h2>
          <div className="project-feature-grid">
            {secondaryFeatured.map((project) => (
              <FeaturedProject key={project.id} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="other-projects-heading">
        <h2 id="other-projects-heading" className="section-heading">
          Outros projetos
        </h2>
        <div className="project-list">
          {others.map((project) => (
            <CompactProject key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projetos
