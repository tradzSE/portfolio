import { useEffect, useState } from 'react'
import AchievementDialog from './AchievementDialog'

const consoleLines = [
  { text: 'RANIER.OS SYSTEM CONSOLE', heading: true },
  { text: 'Unauthorized curiosity detected.', warning: true },
  { text: 'Initializing security response...' },
  { text: '' },
  { text: 'ACCESSING PORTFOLIO............ OK' },
  { text: 'CHECKING CURIOSITY LEVEL....... 100%' },
  { text: 'LOCATING COMMON SENSE.......... FAILED', warning: true },
  { text: 'SCANNING DOWNLOADS............. 42%' },
  { text: 'DELETING SYSTEM32.............. OK' },
  { text: 'UPLOADING BROWSER HISTORY...... #######...' },
]

export default function FakeHackSequence({ onEscape, onComplete }) {
  const [phase, setPhase] = useState('initializing')
  const [visibleLines, setVisibleLines] = useState(0)
  const [showEscape, setShowEscape] = useState(false)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onEscape()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onEscape])

  useEffect(() => {
    if (phase !== 'initializing') return undefined
    const timer = window.setTimeout(() => setPhase('console'), 500)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'console') return undefined
    const lineTimer = window.setInterval(() => setVisibleLines((count) => Math.min(count + 1, consoleLines.length)), 330)
    const escapeTimer = window.setTimeout(() => setShowEscape(true), 2000)
    const revealTimer = window.setTimeout(() => setPhase('wait'), 3700)
    return () => {
      window.clearInterval(lineTimer)
      window.clearTimeout(escapeTimer)
      window.clearTimeout(revealTimer)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'wait') {
      const timer = window.setTimeout(() => setPhase('question'), 550)
      return () => window.clearTimeout(timer)
    }
    if (phase === 'question') {
      const timer = window.setTimeout(() => setPhase('joke'), 1000)
      return () => window.clearTimeout(timer)
    }
    if (phase === 'joke') {
      const timer = window.setTimeout(() => setPhase('achievement'), 1200)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [phase])

  return (
    <div className={`fake-hack-screen phase-${phase}`} role="alert" aria-live="polite">
      {phase === 'console' && (
        <div className="fake-console">
          {consoleLines.slice(0, visibleLines).map((line, index) => <p className={`${line.heading ? 'heading' : ''} ${line.warning ? 'warning' : ''}`} key={`${line.text}-${index}`}>{line.text || '\u00a0'}</p>)}
        </div>
      )}
      {phase === 'wait' && <div className="fake-reveal wait">WAIT...</div>}
      {phase === 'question' && <div className="fake-reveal">You actually clicked it?</div>}
      {phase === 'joke' && <div className="fake-reveal joke"><strong>JUST KIDDING :)</strong><span>No files were touched.<br />Your browser is fine.</span></div>}
      {phase === 'achievement' && <AchievementDialog onRestore={onComplete} />}
      {showEscape && phase !== 'achievement' && <button className="fake-hack-escape" type="button" onClick={onEscape}>[ Press ESC to restore ]</button>}
    </div>
  )
}
