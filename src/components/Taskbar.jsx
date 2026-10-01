import { useEffect, useState } from 'react'
import PixelIcon from './PixelIcon'

export default function Taskbar({ startOpen, onStart, windowOpen, minimized, onWindowClick, minesweeperOpen, minesweeperMinimized, onMinesweeperClick, wordGameOpen, wordGameMinimized, onWordGameClick, notepadOpen, notepadMinimized, onNotepadClick, soundEnabled, onSoundToggle }) {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  return (
    <footer className="taskbar">
      <button className={`start-button ${startOpen ? 'pressed' : ''}`} onClick={onStart} aria-expanded={startOpen}><img className="start-icon" src="/icons/ehres_EHTRAY.ICON.SHUTDOWN.ico" alt="" /> START</button>
      <span className="taskbar-divider" />
      {windowOpen && <button className={`task-button ${!minimized ? 'active' : ''}`} onClick={onWindowClick}><PixelIcon type="app" small /> Ranier.OS - Portfolio</button>}
      {minesweeperOpen && <button className={`task-button ${!minesweeperMinimized ? 'active' : ''}`} onClick={onMinesweeperClick}><PixelIcon type="game" small /> Minesweeper</button>}
      {wordGameOpen && <button className={`task-button ${!wordGameMinimized ? 'active' : ''}`} onClick={onWordGameClick}><PixelIcon type="word" small /> Word.exe</button>}
      {notepadOpen && <button className={`task-button ${!notepadMinimized ? 'active' : ''}`} onClick={onNotepadClick}><PixelIcon type="text" small /> CURRENT_PROJECT.TXT</button>}
      <button className="sound-button" onClick={onSoundToggle} aria-label={soundEnabled ? 'Mute interface sounds' : 'Enable interface sounds'} title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}>
        {soundEnabled ? '♪' : '×'}
      </button>
      <time dateTime={time.toISOString()}>{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time>
    </footer>
  )
}
