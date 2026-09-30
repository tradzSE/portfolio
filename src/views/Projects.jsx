import { useState } from 'react'
import RetroButton from '../components/RetroButton'
import { projects } from '../data'

export default function Projects({ navigate }) {
  const [selected, setSelected] = useState(projects[0]?.id ?? null)
  const selectedProject = projects.find((project) => project.id === selected)

  return (
    <div className="view projects-view">
      <nav className="projects-toolbar" aria-label="Project explorer toolbar">
        <button type="button" disabled>← Back</button>
        <button type="button" disabled>↑ Up</button>
        <span />
        <button type="button" disabled={!selectedProject} onClick={() => navigate('project')}>Open</button>
      </nav>

      <div className="projects-address">
        <label htmlFor="projects-location">Address</label>
        <div><img src="/icons/folder.png" alt="" /><input id="projects-location" value="C:\\RANIER.OS\\PROJECTS" readOnly /></div>
      </div>

      <div className="projects-explorer">
        <aside className="projects-info">
          <section>
            <h1>Project archive</h1>
            <p>Software and web applications built by Ranier.</p>
          </section>
          {selectedProject && (
            <section className="selected-project-info">
              <h2>Details</h2>
              <img src="/icons/application.png" alt="" />
              <strong>{selectedProject.name}</strong>
              <dl>
                <div><dt>Type</dt><dd>{selectedProject.type}</dd></div>
                <div><dt>Year</dt><dd>{selectedProject.year}</dd></div>
                <div><dt>Status</dt><dd>{selectedProject.status}</dd></div>
              </dl>
              <RetroButton type="button" onClick={() => navigate('project')}>Open project</RetroButton>
            </section>
          )}
        </aside>

        <div className="projects-list" role="table" aria-label="Project archive">
          <div className="project-list-header" role="row">
            <span role="columnheader">Name</span><span role="columnheader">Type</span><span role="columnheader">Year</span><span role="columnheader">Status</span>
          </div>
          {projects.map((project) => (
            <button
              type="button"
              className={`project-list-row ${selected === project.id ? 'selected' : ''}`}
              role="row"
              key={project.id}
              onClick={() => setSelected(project.id)}
              onDoubleClick={() => navigate('project')}
            >
              <span role="cell"><img src="/icons/application.png" alt="" />{project.name}</span>
              <span role="cell">{project.type}</span>
              <span role="cell">{project.year}</span>
              <span role="cell">{project.status}</span>
            </button>
          ))}
          {projects.length === 0 && <p className="projects-empty">This folder is empty.</p>}
        </div>
      </div>

      <footer className="projects-status"><span>{projects.length} object{projects.length === 1 ? '' : 's'}</span><span>{selectedProject ? `${selectedProject.name} selected` : 'No selection'}</span></footer>
    </div>
  )
}
