import RetroButton from '../components/RetroButton'
import { projects } from '../data'

export default function ProjectDetails({ navigate, selectedProjectId }) {
  const project = projects.find((item) => item.id === selectedProjectId) || projects[0]

  return (
    <article className="view project-detail">
      <header className="case-header">
        <div>
          <p>PROJECT FILE / {project.status.toUpperCase()}</p>
          <h1>{project.name.toUpperCase()}</h1>
          <h2>{project.subtitle}</h2>
        </div>
        {project.url && (
          <a className="retro-button" href={project.url} target="_blank" rel="noreferrer">
            OPEN LIVE PROJECT
          </a>
        )}
      </header>

      <dl className="project-meta">
        <div><dt>TYPE</dt><dd>{project.type}</dd></div>
        <div><dt>ROLE</dt><dd>{project.role}</dd></div>
        <div><dt>CATEGORY</dt><dd>{project.category}</dd></div>
        <div><dt>STATUS</dt><dd>{project.status} / {project.year}</dd></div>
      </dl>

      <section className="case-section case-overview">
        <h3>OVERVIEW</h3>
        <p>{project.description}</p>
      </section>

      <section className="case-study-grid" aria-label={`${project.name} project case study`}>
        <div>
          <h3>THE CHALLENGE</h3>
          <p>{project.challenge}</p>
        </div>
        <div>
          <h3>THE SOLUTION</h3>
          <p>{project.solution}</p>
        </div>
      </section>

      <section className="case-delivery">
        <div className="case-responsibilities">
          <h3>MY RESPONSIBILITIES</h3>
          <ul>
            {project.responsibilities.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <aside className="case-outcome">
          <h3>PROJECT OUTCOME</h3>
          <p>{project.outcome}</p>
        </aside>
      </section>

      <section className="case-columns">
        <div>
          <h3>FEATURES</h3>
          <ul>{project.features.map((item) => <li key={item}>[+] {item}</li>)}</ul>
        </div>
        <div>
          <h3>TECH STACK</h3>
          <ul>{project.stack.map((item) => <li key={item}>[SYS] {item}</li>)}</ul>
        </div>
      </section>

      <footer className="case-actions">
        <RetroButton onClick={() => navigate('projects')}>BACK TO PROJECTS</RetroButton>
        {project.url && (
          <a className="retro-button" href={project.url} target="_blank" rel="noreferrer">
            VISIT {new URL(project.url).hostname.toUpperCase()}
          </a>
        )}
      </footer>
    </article>
  )
}
