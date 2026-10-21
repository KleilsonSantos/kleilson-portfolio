import { PROJECT_KIND_LABEL } from '../data/projectsData'
import type { Project } from '../types'

/** Card compacto de projeto (Home): um único link, no título, cobre o card inteiro. */
export function ProjectTeaser({ project }: { project: Project }) {
  return (
    <article className="project-feature project-teaser">
      <p className="project-feature__label">{PROJECT_KIND_LABEL[project.kind]}</p>
      <h3 className="project-feature__title">
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          {project.name}
          <span className="visually-hidden"> (abre em nova aba)</span>
        </a>
      </h3>
      <p className="project-feature__tagline">{project.tagline}</p>
      <p className="project-teaser__why">
        <span className="project-kicker">Por que importa</span>
        {project.impact}
      </p>
      <div className="stack-list">
        {project.stack.slice(0, 3).map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>
      <span className="project-teaser__cta" aria-hidden="true">
        Ver no GitHub ↗
      </span>
    </article>
  )
}
