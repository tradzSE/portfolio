const items = [
  ['Projects', 'projects'], ['About Ranier', 'about'], ['Skills', 'skills'], ['Resume', 'resume'], ['Contact', 'contact'],
]

export default function StartMenu({ onNavigate, onShutdown }) {
  return (
    <nav className="start-menu" aria-label="Start menu">
      <div className="start-rail">RANIER.OS</div>
      <div className="start-options">
        <button onClick={() => onNavigate('home')}><b>Programs</b><span>›</span></button>
        {items.map(([label, id]) => <button key={id} onClick={() => onNavigate(id)}>{label}</button>)}
        <hr />
        <a href="https://github.com/tradzSE" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
        <hr />
        <button className="shutdown-option" onClick={onShutdown}>
          <span><img src="/icons/ehres_EHTRAY.ICON.SHUTDOWN.ico" alt="" />Shut Down...</span>
        </button>
      </div>
    </nav>
  )
}
