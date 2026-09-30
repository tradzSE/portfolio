export default function About() {
  return (
    <article className="view document-view">
      <header><span>ABOUT_ME.TXT</span><span>2 KB</span></header>
      <dl className="identity-grid">
        <div><dt>Name:</dt><dd>Ranier Teraldico</dd></div>
        <div><dt>Role:</dt><dd>Software Engineer</dd></div>
        <div><dt>Focus:</dt><dd>Software &amp; Web Development</dd></div>
        <div><dt>Status:</dt><dd>Open to opportunities</dd></div>
      </dl>
      <div className="text-document">
        <p>I'm Ranier Teraldico, a software engineer focused on turning ideas and real-world problems into practical software. I enjoy working across the development process, from planning and interface design to implementation, testing, and deployment.</p>
        <p>I'm particularly interested in building web applications and systems that are useful, maintainable, and straightforward to use. I continuously explore new technologies and approaches while strengthening the fundamentals behind the software I build.</p>
        <aside className="resume-download">
          <img src="/icons/resume-download.gif" alt="" />
          <div><strong>Want to see my resume?</strong><span>Download the complete PDF for a closer look at my experience.</span></div>
          <a className="retro-button" href="/resume.pdf" target="_blank" rel="noreferrer">Click here</a>
        </aside>
      </div>
      <footer>END OF FILE</footer>
    </article>
  )
}
