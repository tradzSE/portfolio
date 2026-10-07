import RetroButton from '../components/RetroButton'
import { projects } from '../data'

export default function Home({ navigate, setStatus, onProjectSelect }) {
  const openProject = (projectId) => {
    onProjectSelect(projectId)
    navigate('project')
  }

  return (
    <div className="view home-view">
      <header className="home-header">
        <img src="/icons/application.png" alt="" />
        <div>
          <h1>Ranier Teraldico</h1>
          <p>Software Engineer</p>
        </div>
      </header>

      <section className="recruiter-summary" aria-labelledby="recruiter-heading">
        <div className="recruiter-copy">
          <h2 id="recruiter-heading">Software engineer building practical web products and operational systems.</h2>
          <p className="recruiter-intro">I'm Ranier Teraldico, a software engineer from Central Luzon State University based in Nueva Ecija, Philippines. I currently lead SEED-TRACK for the PhilRice Genebank and build independent products including Kwenta and Resuma.</p>
          <div className="button-row recruiter-actions">
            <RetroButton onMouseEnter={() => setStatus('Opening selected projects...')} onClick={() => navigate('projects')}>View selected work</RetroButton>
            <RetroButton onMouseEnter={() => setStatus('Opening resume.pdf...')} onClick={() => navigate('resume')}>Open resume</RetroButton>
            <RetroButton onMouseEnter={() => setStatus('Opening contact form...')} onClick={() => navigate('contact')}>Contact me</RetroButton>
          </div>
        </div>

        <aside className="recruiter-panel" aria-label="Professional summary">
          <header><span>PROFESSIONAL_PROFILE.INI</span><span>UPDATED 2026</span></header>
          <dl>
            <div><dt>Current work</dt><dd>Project Lead, SEED-TRACK</dd></div>
            <div><dt>Organization</dt><dd>PhilRice Genebank</dd></div>
            <div><dt>Core stack</dt><dd>React, Next.js, Node.js, GraphQL, MySQL</dd></div>
            <div><dt>Availability</dt><dd>Open to full-time and freelance roles</dd></div>
            <div><dt>Location</dt><dd>Nueva Ecija, Philippines</dd></div>
          </dl>
          <a href="https://www.linkedin.com/in/ranierteraldico/" target="_blank" rel="noreferrer">LinkedIn profile ↗</a>
        </aside>
      </section>

      <section className="recruiter-proof" aria-label="Portfolio highlights">
        <div><strong>{projects.length}</strong><span>documented projects</span></div>
        <div><strong>{projects.filter((project) => project.status === 'Live').length}</strong><span>live web products</span></div>
        <div><strong>1</strong><span>client system in development</span></div>
        <div><strong>End to end</strong><span>planning through deployment</span></div>
      </section>

      <section className="featured-project">
        <div className="section-label"><span>Featured projects</span><span>{projects.length} projects / 2026</span></div>
        <div className="featured-list">
          {projects.map((project) => (
            <article className="featured-grid" key={project.id}>
              <img src="/icons/application.png" alt="" />
              <div className="featured-copy">
                <h3>{project.name}</h3>
                <p className="file-type">{project.type} / {project.status}</p>
                <p>{project.description}</p>
              </div>
              <div className="featured-actions">
                <RetroButton onClick={() => openProject(project.id)}>View project</RetroButton>
                {project.url && <a className="retro-button" href={project.url} target="_blank" rel="noreferrer">Visit website</a>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
