import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { PROFILE, SUMMARY, EXPERIENCE } from '../data/profileData'

function Sobre() {
  useDocumentMeta({
    title: `Sobre | ${PROFILE.shortName}`,
    description: SUMMARY,
    canonical: `${PROFILE.siteUrl}/sobre`,
  })

  return (
    <div className="page">
      <header className="hero">
        <span className="badge">Trajetória profissional</span>
        <h1>Sobre</h1>
        <p>{SUMMARY}</p>
      </header>

      <section className="card">
        <h2>Informações</h2>
        <ul>
          <li><strong>Experiência:</strong> {PROFILE.yearsOfExperience} anos</li>
          <li><strong>Empresa atual:</strong> {PROFILE.currentCompany}</li>
          <li><strong>Certificação:</strong> {PROFILE.certification}</li>
          <li><strong>Idiomas:</strong> Português (nativo), Inglês (intermediário — leitura técnica)</li>
        </ul>
      </section>

      <section className="card">
        <h2>Experiência profissional</h2>
        {EXPERIENCE.map((job) => (
          <article key={`${job.company}-${job.period}`} style={{ marginBottom: '1.5rem' }}>
            <h3>{job.role} — {job.company}</h3>
            <p><strong>{job.period}</strong> · {job.client}</p>
            <ul>
              {job.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Sobre
