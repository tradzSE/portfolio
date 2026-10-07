import { useEffect, useRef, useState } from 'react'
import DesktopIcon from './components/DesktopIcon'
import Dialog from './components/Dialog'
import PixelIcon from './components/PixelIcon'
import StartMenu from './components/StartMenu'
import Taskbar from './components/Taskbar'
import Home from './views/Home'
import About from './views/About'
import Projects from './views/Projects'
import ProjectDetails from './views/ProjectDetails'
import Skills from './views/Skills'
import Contact from './views/Contact'
import { getUiSoundEnabled, playKeyboardSound, playUiSound, primeUiAudio, setUiSoundEnabled } from './audio'
import BootScreen from './components/BootScreen'
import Minesweeper from './components/Minesweeper'
import WordGame from './components/WordGame'
import CurrentProjectNotepad from './components/CurrentProjectNotepad'
import DontClickEasterEgg from './components/easter-eggs/DontClickEasterEgg'

const desktopItems = [
  ['My Portfolio', 'app', 'home'],
  ['Recycle Bin', 'bin', 'recycle'],
  ['Minesweeper', 'game', 'minesweeper'],
  ['Word.exe', 'word', 'word-game'],
  ['CURRENT_PROJECT.TXT', 'text', 'current-project'],
  ['LOVE-LETTER-FOR-YOU.TXT.vbs', 'danger', 'dont-click'],
]

const views = { home: Home, about: About, projects: Projects, project: ProjectDetails, skills: Skills, contact: Contact }

export default function App() {
  const [booted, setBooted] = useState(() => localStorage.getItem('ranier-os-boot-complete-v1') === 'true')
  const [section, setSection] = useState('home')
  const [selectedProjectId, setSelectedProjectId] = useState('draftix')
  const [windowOpen, setWindowOpen] = useState(() => localStorage.getItem('ranier-os-welcome-letter-shown-v1') === 'true')
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [startOpen, setStartOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [dialog, setDialog] = useState(null)
  const [status, setStatus] = useState('Ready')
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [soundEnabled, setSoundEnabled] = useState(getUiSoundEnabled)
  const [welcomeOpen, setWelcomeOpen] = useState(false)
  const [minesweeperOpen, setMinesweeperOpen] = useState(false)
  const [minesweeperMinimized, setMinesweeperMinimized] = useState(false)
  const [minesweeperMaximized, setMinesweeperMaximized] = useState(false)
  const [wordGameOpen, setWordGameOpen] = useState(false)
  const [wordGameMinimized, setWordGameMinimized] = useState(false)
  const [wordGameMaximized, setWordGameMaximized] = useState(false)
  const [notepadOpen, setNotepadOpen] = useState(false)
  const [notepadMinimized, setNotepadMinimized] = useState(false)
  const [notepadMaximized, setNotepadMaximized] = useState(false)
  const [easterEggOpen, setEasterEggOpen] = useState(false)
  const [easterEggCompleted, setEasterEggCompleted] = useState(() => sessionStorage.getItem('ranier-os-curiosity-achievement') === 'unlocked')
  const [shutdownPhase, setShutdownPhase] = useState(null)
  const drag = useRef(null)
  const View = views[section] || Home

  const navigate = (target) => {
    setStartOpen(false)
    if (target === 'resume') {
      window.open('/resume.pdf', '_blank', 'noopener,noreferrer')
      return
    }
    if (target === 'recycle') return setDialog('recycle')
    if (target === 'minesweeper') {
      setMinesweeperOpen(true)
      setMinesweeperMinimized(false)
      return
    }
    if (target === 'word-game') {
      setWordGameOpen(true)
      setWordGameMinimized(false)
      return
    }
    if (target === 'current-project') {
      setNotepadOpen(true)
      setNotepadMinimized(false)
      setStatus('CURRENT_PROJECT.TXT - Notepad')
      return
    }
    if (target === 'dont-click') {
      setEasterEggOpen(true)
      return
    }
    setSection(target)
    setWindowOpen(true)
    setMinimized(false)
    setStatus(`Opened /${target}`)
  }

  const toggleSound = () => {
    const nextValue = !soundEnabled
    setSoundEnabled(nextValue)
    setUiSoundEnabled(nextValue)
  }

  const restoreAfterFailedShutdown = () => {
    setShutdownPhase(null)
    setStatus('Shutdown cancelled: socket initialization failed')
    window.requestAnimationFrame(() => {
      primeUiAudio()
      playUiSound('open')
    })
  }

  useEffect(() => {
    const move = (event) => {
      if (!drag.current || maximized || window.innerWidth < 768) return
      setPosition({ x: event.clientX - drag.current.x, y: event.clientY - drag.current.y })
    }
    const up = () => { drag.current = null }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [maximized])

  useEffect(() => {
    if (!booted || localStorage.getItem('ranier-os-welcome-letter-shown-v1')) return
    const timer = setTimeout(() => {
      setWelcomeOpen(true)
      localStorage.setItem('ranier-os-welcome-letter-shown-v1', 'true')
    }, 500)
    return () => clearTimeout(timer)
  }, [booted])

  useEffect(() => {
    const playMouseDown = () => playUiSound('mouse-down')
    const playMouseUp = () => playUiSound('mouse-up')
    const playKeyDown = (event) => { if (!event.repeat) playKeyboardSound() }
    window.addEventListener('pointerdown', playMouseDown, true)
    window.addEventListener('pointerup', playMouseUp, true)
    window.addEventListener('keydown', playKeyDown, true)
    return () => {
      window.removeEventListener('pointerdown', playMouseDown, true)
      window.removeEventListener('pointerup', playMouseUp, true)
      window.removeEventListener('keydown', playKeyDown, true)
    }
  }, [])

  useEffect(() => {
    if (shutdownPhase !== 'shutting-down') return undefined
    const timer = window.setTimeout(() => setShutdownPhase('failed'), 2400)
    return () => window.clearTimeout(timer)
  }, [shutdownPhase])

  if (!booted) return <BootScreen onComplete={() => {
    localStorage.setItem('ranier-os-boot-complete-v1', 'true')
    setBooted(true)
  }} />

  return (
    <main className="desktop" onClick={(event) => event.target === event.currentTarget && (setSelectedIcon(null), setStartOpen(false))}>
      <div className="desktop-brand" aria-hidden="true"><strong>RANIER.OS</strong><span>PORTFOLIO EDITION 2026</span></div>
      <div className="desktop-icons">
        {desktopItems.map(([label, type, target]) => {
          const displayLabel = label
          return <DesktopIcon key={target} label={displayLabel} type={type} selected={selectedIcon === displayLabel} onSelect={() => setSelectedIcon(displayLabel)} onOpen={() => navigate(target)} openOnTouch onMouseEnter={target === 'current-project' ? () => setStatus('See what Ranier is currently building') : undefined} onMouseLeave={target === 'current-project' ? () => setStatus(notepadOpen && !notepadMinimized ? 'CURRENT_PROJECT.TXT - Notepad' : 'Ready') : undefined} />
        })}
      </div>

      {windowOpen && !minimized && (
        <section className={`app-window ${maximized ? 'maximized' : ''}`} style={maximized ? undefined : { transform: `translate(${position.x}px, ${position.y}px)` }} aria-label="Ranier portfolio application">
          <header className="titlebar" onPointerDown={(event) => { if (!maximized && !event.target.closest('button')) drag.current = { x: event.clientX - position.x, y: event.clientY - position.y } }} onDoubleClick={() => setMaximized((value) => !value)}>
            <span className="title"><PixelIcon type="app" small /> RANIER.OS - PORTFOLIO</span>
            <span className="window-controls">
              <button data-sound="close" aria-label="Minimize" onClick={() => setMinimized(true)}>_</button>
              <button aria-label={maximized ? 'Restore' : 'Maximize'} onClick={() => setMaximized((value) => !value)}>{maximized ? '◱' : '□'}</button>
              <button data-sound="close" aria-label="Close" onClick={() => setWindowOpen(false)}>×</button>
            </span>
          </header>
          <nav className="menu-bar" aria-label="Application menu">
            <button onClick={() => navigate('home')}><u>F</u>ile</button>
            <button onClick={() => setMaximized((value) => !value)}><u>V</u>iew</button>
            <button onClick={() => navigate('projects')}><u>P</u>rojects</button>
            <button onClick={() => setDialog('about-os')}><u>H</u>elp</button>
          </nav>
          <div className="app-layout">
            <aside className="sidebar">
              <div className="sidebar-brand"><strong>RANIER<br />TERALDICO</strong><span>SOFTWARE ENGINEER</span></div>
              <nav aria-label="Portfolio sections">
                {['home', 'about', 'projects', 'skills', 'contact'].map((item) => <button key={item} className={section === item || (section === 'project' && item === 'projects') ? 'active' : ''} onMouseEnter={() => setStatus(`Opening /${item}...`)} onMouseLeave={() => setStatus('Ready')} onClick={() => navigate(item)}>{item.toUpperCase()}</button>)}
              </nav>
              <div className="sidebar-links"><a href="https://github.com/tradzSE" target="_blank" rel="noreferrer" onMouseEnter={() => setStatus('Opening github.com/tradzSE...')}>GITHUB ↗</a><button onClick={() => navigate('resume')}>RESUME.PDF</button></div>
            </aside>
            <div className="content-area"><View navigate={navigate} setStatus={setStatus} selectedProjectId={selectedProjectId} onProjectSelect={setSelectedProjectId} /></div>
          </div>
          <footer className="statusbar"><span>{status}</span><span>RANIER.OS / ONLINE</span></footer>
        </section>
      )}

      {startOpen && <StartMenu onNavigate={navigate} onShutdown={() => { setStartOpen(false); setShutdownPhase('confirm') }} />}
      <Taskbar
        startOpen={startOpen}
        onStart={() => setStartOpen((value) => !value)}
        windowOpen={windowOpen}
        minimized={minimized}
        onWindowClick={() => { if (!windowOpen) setWindowOpen(true); setMinimized((value) => !value) }}
        minesweeperOpen={minesweeperOpen}
        minesweeperMinimized={minesweeperMinimized}
        onMinesweeperClick={() => setMinesweeperMinimized((value) => !value)}
        wordGameOpen={wordGameOpen}
        wordGameMinimized={wordGameMinimized}
        onWordGameClick={() => setWordGameMinimized((value) => !value)}
        notepadOpen={notepadOpen}
        notepadMinimized={notepadMinimized}
        onNotepadClick={() => { setNotepadMinimized((value) => !value); setStatus('CURRENT_PROJECT.TXT - Notepad') }}
        soundEnabled={soundEnabled}
        onSoundToggle={toggleSound}
      />

      {welcomeOpen && <Dialog title="Please read carefully" className="welcome-dialog" actionLabel="START EXPLORING" onClose={() => setWelcomeOpen(false)}>
        <div className="welcome-document">
          <h2>WELCOME TO RANIER.OS</h2>
          <p className="welcome-rule">====================</p>
          <p>Hi, I'm Ranier.</p>
          <p>This desktop is my portfolio.</p>
          <p>You can explore it like an old computer:</p>
          <ul>
            <li>Open Projects to see what I've built.</li>
            <li>Open CURRENT_PROJECT.TXT to see what I'm working on.</li>
            <li>Open My Portfolio to explore my skills.</li>
            <li>Open Resume.pdf for my resume.</li>
            <li>Use the Start menu to discover other programs.</li>
          </ul>
          <p>Some things may be hidden.</p>
          <p>Have fun exploring.</p>
          <p>- Ranier</p>
        </div>
      </Dialog>}

      {shutdownPhase === 'confirm' && <Dialog title="Shut Down RANIER.OS" showActions={false} onClose={() => setShutdownPhase(null)}>
        <div className="shutdown-confirmation">
          <img src="/icons/ehres_EHTRAY.ICON.SHUTDOWN.ico" alt="" />
          <div><p className="dialog-lead">Shut down RANIER.OS?</p><p>Any open programs will be closed before the system powers off.</p></div>
        </div>
        <div className="shutdown-confirm-actions">
          <button type="button" className="retro-button" onClick={() => setShutdownPhase(null)}>Cancel</button>
          <button type="button" className="retro-button" onClick={() => setShutdownPhase('shutting-down')}>Shut Down</button>
        </div>
      </Dialog>}
      {(shutdownPhase === 'shutting-down' || shutdownPhase === 'failed') && <section className="shutdown-screen" aria-live="assertive">
        {shutdownPhase === 'shutting-down' ? (
          <div className="shutdown-progress"><img src="/icons/tab-image.ico" alt="" /><p>RANIER.OS is shutting down...</p><span>Closing network services</span><i aria-hidden="true" /></div>
        ) : (
          <section className="shutdown-error" role="alertdialog" aria-modal="true" aria-labelledby="shutdown-error-title">
            <header id="shutdown-error-title">RANIER.OS - System Error</header>
            <div><span aria-hidden="true">×</span><p><strong>Socket initialization failed.</strong><br />The network service did not respond.<br /><br />Shutdown has been cancelled.</p></div>
            <footer><button type="button" className="retro-button" autoFocus onClick={restoreAfterFailedShutdown}>Return to Desktop</button></footer>
          </section>
        )}
      </section>}
      {dialog === 'about-os' && <Dialog title="About RANIER.OS" onClose={() => setDialog(null)}>
        <div className="about-os">
          <div className="about-os-product">
            <img src="/icons/tab-image.ico" alt="RANIER.OS icon" />
            <div><strong>RANIER.OS</strong><span>Portfolio Edition</span><span>Version 1.0</span></div>
          </div>
          <div className="about-os-owner"><strong>Ranier Teraldico</strong><span>Software Engineer</span></div>
          <p>© 2026 Ranier Teraldico</p>
        </div>
      </Dialog>}
      {dialog === 'recycle' && <Dialog title="RECYCLE BIN" onClose={() => setDialog(null)}>
        <p><strong>{easterEggCompleted ? '4 items' : '3 items'}</strong></p>
        <div className="bin-list" role="list">
          <button type="button" role="listitem"><img src="/icons/application.png" alt="" />bad-design.exe</button>
          <button type="button" role="listitem"><img src="/icons/application.png" alt="" />unused-code.js</button>
          <button type="button" role="listitem" onDoubleClick={() => setDialog('zip-error')} onClick={() => setStatus('Double-click to open final_final_v2_REAL.zip')}><img src="/icons/folder.png" alt="" />final_final_v2_REAL.zip</button>
          {easterEggCompleted && <button type="button" role="listitem" onDoubleClick={() => setDialog('virus-joke')} onClick={() => setStatus('Double-click to open totally_not_a_virus.exe')}><img src="/icons/application.png" alt="" />totally_not_a_virus.exe</button>}
        </div>
      </Dialog>}
      {dialog === 'zip-error' && <Dialog title="Error" onClose={() => setDialog(null)}><p className="zip-error-message">Nobody knows which final<br />version is actually final.</p></Dialog>}
      {dialog === 'virus-joke' && <Dialog title="Nice try" onClose={() => setDialog(null)}><p className="zip-error-message">Nice try.<br />We're not doing this again.</p></Dialog>}
      {minesweeperOpen && (
        <Dialog
          title="Minesweeper"
          className="minesweeper-dialog"
          showActions={false}
          hidden={minesweeperMinimized}
          maximized={minesweeperMaximized}
          onMinimize={() => setMinesweeperMinimized(true)}
          onMaximize={() => setMinesweeperMaximized((value) => !value)}
          onClose={() => { setMinesweeperOpen(false); setMinesweeperMaximized(false) }}
        >
          <Minesweeper />
        </Dialog>
      )}
      {wordGameOpen && (
        <Dialog
          title="Word.exe"
          className="word-game-dialog"
          showActions={false}
          hidden={wordGameMinimized}
          maximized={wordGameMaximized}
          onMinimize={() => setWordGameMinimized(true)}
          onMaximize={() => setWordGameMaximized((value) => !value)}
          onClose={() => { setWordGameOpen(false); setWordGameMaximized(false) }}
        >
          <WordGame active={!wordGameMinimized && !easterEggOpen} />
        </Dialog>
      )}
      {notepadOpen && (
        <Dialog
          title="CURRENT_PROJECT.TXT - Notepad"
          className="notepad-dialog"
          showActions={false}
          hidden={notepadMinimized}
          maximized={notepadMaximized}
          draggable
          onMinimize={() => { setNotepadMinimized(true); setStatus('Ready') }}
          onMaximize={() => setNotepadMaximized((value) => !value)}
          onClose={() => { setNotepadOpen(false); setNotepadMaximized(false); setStatus('Ready') }}
        >
          <CurrentProjectNotepad onExit={() => { setNotepadOpen(false); setNotepadMaximized(false); setStatus('Ready') }} />
        </Dialog>
      )}
      {easterEggOpen && (
        <DontClickEasterEgg
          completed={easterEggCompleted}
          onClose={() => setEasterEggOpen(false)}
          onComplete={() => {
            sessionStorage.setItem('ranier-os-curiosity-achievement', 'unlocked')
            setEasterEggCompleted(true)
            setEasterEggOpen(false)
          }}
        />
      )}
    </main>
  )
}
