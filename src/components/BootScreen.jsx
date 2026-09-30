import { useEffect, useRef, useState } from 'react'
import { playUiSound, primeUiAudio } from '../audio'

const resources = [
  ['desktop_shell', 18],
  ['portfolio_data', 36],
  ['vintage_icons', 54],
  ['interface_audio', 72],
  ['desktop_wallpaper', 88],
  ['ranier_os', 100],
]

export default function BootScreen({ onComplete }) {
  const [loaded, setLoaded] = useState(0)
  const [stage, setStage] = useState('loading')
  const startButton = useRef(null)

  const showPrompt = () => {
    setLoaded(resources.length)
    setStage('ready')
  }

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      const timer = setTimeout(showPrompt, 250)
      return () => clearTimeout(timer)
    }

    const timer = setInterval(() => {
      setLoaded((current) => {
        if (current >= resources.length) {
          clearInterval(timer)
          setTimeout(() => setStage('ready'), 450)
          return current
        }
        return current + 1
      })
    }, 280)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape' && stage === 'loading') showPrompt()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [stage])

  useEffect(() => {
    if (stage === 'ready') startButton.current?.focus()
  }, [stage])

  const start = () => {
    primeUiAudio()
    playUiSound('open')
    onComplete()
  }

  const date = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })

  return (
    <main className="boot-screen" aria-live="polite">
      {stage === 'loading' ? (
        <section className="bios-screen" aria-label="RANIER.OS startup sequence">
          <header className="bios-header">
            <div><strong>Teraldico,</strong><br /><strong>Ranier Systems.</strong></div>
            <div>Released: 09/30/2026<br />RTBIOS (C)2026 Ranier Systems.</div>
          </header>

          <div className="bios-body">
            <p>RSP S26 PORTFOLIO EDITION</p>
            <p>RANIER.OS PROFESSIONAL WORKSTATION</p>
            <p>Checking memory : 16384 MB OK</p>
            <div className="bios-gap" />
            <p>{loaded >= resources.length ? 'FINISHED LOADING RESOURCES' : `LOADING RESOURCES (${loaded}/${resources.length})`}</p>
            <div className="bios-resources">
              {resources.slice(0, loaded).map(([name, progress]) => (
                <p key={name}><span>Loaded {name}</span><span>... {progress}%</span></p>
              ))}
            </div>
            {loaded >= resources.length && <p className="bios-complete">All content loaded. Launching <strong>'Ranier Teraldico Portfolio'</strong>.</p>}
            <span className="boot-cursor" aria-hidden="true">_</span>
          </div>

          <footer className="bios-footer">
            <p>Press <strong>ESC</strong> to skip startup test</p>
            <p>{date}</p>
          </footer>
        </section>
      ) : (
        <section className="boot-prompt" aria-labelledby="boot-title">
          <div>
            <h1 id="boot-title">RANIER.OS PORTFOLIO EDITION 2026</h1>
            <p>System ready. Click start to enter.<span className="boot-cursor" aria-hidden="true">_</span></p>
            <button ref={startButton} onClick={start}>START</button>
          </div>
        </section>
      )}
    </main>
  )
}
