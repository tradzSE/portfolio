import { useEffect, useRef, useState } from 'react'
import RetroButton from './RetroButton'

export default function Dialog({ title, children, onClose, onMinimize, onMaximize, maximized = false, actionLabel = 'OK', className = '', showActions = true, hidden = false, draggable = false }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const drag = useRef(null)

  useEffect(() => {
    if (!draggable) return undefined
    const move = (event) => {
      if (!drag.current || maximized || window.innerWidth < 768) return
      setPosition({ x: event.clientX - drag.current.x, y: event.clientY - drag.current.y })
    }
    const stop = () => { drag.current = null }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', stop)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', stop)
    }
  }, [draggable, maximized])

  return (
    <div className={`dialog-layer ${hidden ? 'dialog-layer-hidden' : ''}`} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`dialog ${className} ${maximized ? 'dialog-maximized' : ''}`} style={draggable && !maximized ? { transform: `translate(${position.x}px, ${position.y}px)` } : undefined} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <header className="dialog-titlebar" onPointerDown={(event) => { if (draggable && !maximized && !event.target.closest('button')) drag.current = { x: event.clientX - position.x, y: event.clientY - position.y } }} onDoubleClick={() => onMaximize?.()}>
          <span id="dialog-title">{title}</span>
          <span className="dialog-controls">
            {onMinimize && <button type="button" aria-label="Minimize" onClick={onMinimize}>_</button>}
            {onMaximize && <button type="button" aria-label={maximized ? 'Restore' : 'Maximize'} onClick={onMaximize}>{maximized ? '[]' : '□'}</button>}
            <button type="button" data-sound="close" aria-label="Close dialog" onClick={onClose}>×</button>
          </span>
        </header>
        <div className="dialog-content">{children}</div>
        {showActions && <footer className="dialog-actions"><RetroButton autoFocus onClick={onClose}>{actionLabel}</RetroButton></footer>}
      </section>
    </div>
  )
}
