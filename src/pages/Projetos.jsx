import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { PROFILE } from '../data/profileData'
import { PROJECTS } from '../data/projectsData'

function Projetos() {
  const featured = PROJECTS.filter((project) => project.featured)
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
        <span className="badge">Open Source</span>
        <h1>Projetos</h1>
        <p>
          Repositórios públicos que demonstram arquitetura, qualidade de código e práticas de
          engenharia adotadas em produção e em laboratórios técnicos.
        </p>
      </header>

      <section className="card">
        <h2>Destaques</h2>
        <div className="grid-2">
          {featured.map((project) => (
            <article key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="stack-list">
                {project.stack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
              <p style={{ marginTop: '1rem' }}>
                <a href={project.url} target="_blank" rel="noreferrer">
                  Ver no GitHub →
                </a>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Outros projetos</h2>
        <div className="grid-2">
          {others.map((project) => (
            <article key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="stack-list">
                {project.stack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
              <p style={{ marginTop: '1rem' }}>
                <a href={project.url} target="_blank" rel="noreferrer">
                  Ver no GitHub →
                </a>
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projetos
