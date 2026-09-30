import RetroButton from '../components/RetroButton'
import { projects } from '../data'

export default function Home({ navigate, setStatus }) {
  const project = projects[0]
  return (
    <div className="view home-view">
      <header className="home-header">
        <img src="/icons/application.png" alt="" />
        <div>
          <h1>Ranier Teraldico</h1>
          <p>Software Engineer</p>
        </div>
      </header>

      <section className="profile-summary" aria-labelledby="welcome-heading">
        <div className="profile-copy">
          <h2 id="welcome-heading">Welcome to my portfolio</h2>
          <p>I build practical software and web experiences from idea to deployment.</p>
          <div className="button-row">
            <RetroButton onMouseEnter={() => setStatus('Opening /projects...')} onClick={() => navigate('projects')}>View my work</RetroButton>
            <RetroButton onMouseEnter={() => setStatus('Opening /about...')} onClick={() => navigate('about')}>About me</RetroButton>
          </div>
        </div>
        <dl className="profile-details">
          <div><dt>Role</dt><dd>Software Engineer</dd></div>
          <div><dt>Focus</dt><dd>Software &amp; Web Development</dd></div>
          <div><dt>Availability</dt><dd>Internship, Employment, Freelance</dd></div>
        </dl>
      </section>

      <section className="featured-project">
        <div className="section-label"><span>Featured project</span><span>Live, 2026</span></div>
        <div className="featured-grid">
          <img src="/icons/application.png" alt="" />
          <div className="featured-copy">
            <h3>{project.name}</h3>
            <p className="file-type">Web application</p>
            <p>{project.description}</p>
          </div>
          <div className="featured-actions">
            <RetroButton onClick={() => navigate('project')}>View project</RetroButton>
            <a className="retro-button" href={project.url} target="_blank" rel="noreferrer">Visit website</a>
          </div>
        </div>
      </section>
    </div>
  )
}
