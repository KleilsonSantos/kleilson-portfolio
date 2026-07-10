import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { PROFILE, SUMMARY, EXPERIENCE } from '../data/profileData'
import {
  CERTIFICATIONS,
  COURSE_GROUPS,
  COURSES_SOURCE_NOTE,
  EDUCATION,
} from '../data/credentialsData'
import { ProfilePhoto } from '../components/ProfilePhoto'

function Sobre() {
  const primaryCert = CERTIFICATIONS[0]
  const ogImage = `${PROFILE.siteUrl.replace(/\/$/, '')}/images/profile/kleilson-avatar.webp`

  useDocumentMeta({
    title: `Sobre | ${PROFILE.shortName}`,
    description: SUMMARY,
    canonical: `${PROFILE.siteUrl}/sobre`,
    ogImage,
    jsonLd: primaryCert
      ? {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: PROFILE.name,
          jobTitle: PROFILE.title,
          url: PROFILE.siteUrl,
          image: ogImage,
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            name: primaryCert.name,
            credentialCategory: 'Professional Certification',
            recognizedBy: {
              '@type': 'Organization',
              name: primaryCert.issuer,
            },
            dateCreated: primaryCert.year,
            url: primaryCert.verificationUrl,
          },
        }
      : undefined,
  })

  return (
    <div className="page">
      <header className="hero hero--about">
        <ProfilePhoto size="md" className="hero__photo" />
        <div className="hero__copy">
          <span className="badge">Trajetória profissional</span>
          <h1>Sobre</h1>
          <p>{SUMMARY}</p>
        </div>
      </header>

      <section className="card card--interactive">
        <h2>Informações</h2>
        <ul>
          <li>
            <strong>Experiência:</strong> {PROFILE.yearsOfExperience} anos
          </li>
          <li>
            <strong>Empresa atual:</strong> {PROFILE.currentCompany}
          </li>
          <li>
            <strong>Certificação:</strong> {PROFILE.certification}
          </li>
          <li>
            <strong>Idiomas:</strong> Português (nativo), Inglês (intermediário —
            leitura técnica)
          </li>
        </ul>
      </section>

      <section className="card card--interactive">
        <h2>Experiência profissional</h2>
        {EXPERIENCE.map((job) => (
          <article key={`${job.company}-${job.period}-${job.client}`} className="experience-item">
            <h3>
              {job.role} — {job.company}
            </h3>
            <p>
              <strong>{job.period}</strong> · {job.client}
            </p>
            <ul>
              {job.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="card card--interactive" aria-labelledby="certifications-heading">
        <h2 id="certifications-heading">Certificações</h2>
        <p className="section-lead">
          Credenciais emitidas por vendors (distintas de cursos online).
        </p>
        <ul className="credential-list">
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.id} className="credential-item">
              <div>
                <strong>{cert.name}</strong>
                <p>
                  {cert.issuer} · {cert.year}
                </p>
              </div>
              {cert.verificationUrl ? (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="credential-link"
                >
                  Sobre a credencial
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="card card--interactive" aria-labelledby="education-heading">
        <h2 id="education-heading">Educação</h2>
        <ul className="credential-list">
          {EDUCATION.map((item) => (
            <li key={item.id} className="credential-item">
              <div>
                <strong>{item.program}</strong>
                <p>
                  {item.institution} · {item.status}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card card--interactive" aria-labelledby="courses-heading">
        <h2 id="courses-heading">Cursos e treinamentos</h2>
        <p className="section-lead">
          Formação contínua via Udemy, agrupada por domínio. Não equivale a
          certificação vendor.
        </p>
        <div className="course-groups">
          {COURSE_GROUPS.map((group) => (
            <div key={group.id} className="course-group">
              <h3>{group.title}</h3>
              <ul>
                {group.courses.map((course) => (
                  <li key={course.id}>
                    {course.title}
                    <span className="chip chip--muted">{course.provider}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="source-note">{COURSES_SOURCE_NOTE}</p>
      </section>
    </div>
  )
}

export default Sobre
