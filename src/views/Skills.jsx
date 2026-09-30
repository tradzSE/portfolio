import { useState } from 'react'
import { skillGroups } from '../data'

export default function Skills() {
  const [open, setOpen] = useState(() => ({ FRONTEND: true }))
  const totalSkills = skillGroups.reduce((total, [, skills]) => total + skills.length, 0)

  return (
    <div className="view skills-view">
      <nav className="skills-toolbar" aria-label="Skills explorer toolbar">
        <button type="button" disabled>← Back</button>
        <button type="button" disabled>↑ Up</button>
        <span />
        <button type="button" onClick={() => setOpen(Object.fromEntries(skillGroups.map(([name]) => [name, true])))}>Expand all</button>
        <button type="button" onClick={() => setOpen({})}>Collapse all</button>
      </nav>

      <div className="skills-address">
        <label htmlFor="skills-location">Address</label>
        <div><img src="/icons/folder.png" alt="" /><input id="skills-location" value="C:\\RANIER.OS\\SKILLS" readOnly /></div>
      </div>

      <div className="skills-explorer">
        <aside className="skills-info">
          <section>
            <h2>Skill directory</h2>
            <p>Technologies and services I use to build and deploy software.</p>
          </section>
          <dl>
            <div><dt>Folders</dt><dd>{skillGroups.length}</dd></div>
            <div><dt>Items</dt><dd>{totalSkills}</dd></div>
            <div><dt>View</dt><dd>Grouped</dd></div>
          </dl>
        </aside>

        <div className="skills-folders">
          {skillGroups.map(([name, skills]) => {
            const expanded = Boolean(open[name])
            return (
              <section className={`skill-folder ${expanded ? 'open' : ''}`} key={name}>
                <button type="button" aria-expanded={expanded} onClick={() => setOpen((current) => ({ ...current, [name]: !expanded }))}>
                  <span className="folder-toggle" aria-hidden="true">{expanded ? '−' : '+'}</span>
                  <img src="/icons/folder.png" alt="" />
                  <span><strong>{name.replaceAll('_', ' ')}</strong><small>{skills.length} item{skills.length === 1 ? '' : 's'}</small></span>
                </button>
                {expanded && (
                  <div className="skill-files">
                    <div className="skill-file-header"><span>Name</span><span>Type</span></div>
                    {skills.map((skill) => (
                      <div className="skill-file" key={skill}>
                        <span><img src="/icons/application.png" alt="" />{skill}</span>
                        <span>Technology</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </div>

      <footer className="skills-status">{skillGroups.length} folders, {totalSkills} items</footer>
    </div>
  )
}
