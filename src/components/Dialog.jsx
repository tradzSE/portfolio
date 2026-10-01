import { useEffect, useId, useRef, useState } from 'react'
import RetroButton from './RetroButton'

export default function Dialog({ title, children, onClose, onMinimize, onMaximize, maximized = false, actionLabel = 'OK', className = '', showActions = true, hidden = false, draggable = false }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const drag = useRef(null)
  const dialogRef = useRef(null)
  const previousFocus = useRef(null)
  const onCloseRef = useRef(onClose)
  const titleId = useId()

  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  useEffect(() => {
    if (hidden) return undefined
    previousFocus.current = document.activeElement
    const dialog = dialogRef.current
    const focusable = dialog?.querySelector('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])')
    focusable?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !dialog) return
      const controls = [...dialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])')]
      if (!controls.length) {
        event.preventDefault()
        dialog.focus()
        return
      }
      const first = controls[0]
      const last = controls.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousFocus.current?.focus?.()
    }
  }, [hidden])

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
      <section ref={dialogRef} className={`dialog ${className} ${maximized ? 'dialog-maximized' : ''}`} style={draggable && !maximized ? { transform: `translate(${position.x}px, ${position.y}px)` } : undefined} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex="-1">
        <header className="dialog-titlebar" onPointerDown={(event) => { if (draggable && !maximized && !event.target.closest('button')) drag.current = { x: event.clientX - position.x, y: event.clientY - position.y } }} onDoubleClick={() => onMaximize?.()}>
          <span id={titleId}>{title}</span>
          <span className="dialog-controls">
            {onMinimize && <button type="button" aria-label="Minimize" onClick={onMinimize}>_</button>}
            {onMaximize && <button type="button" aria-label={maximized ? 'Restore' : 'Maximize'} onClick={onMaximize}>{maximized ? '[]' : '□'}</button>}
            <button type="button" data-sound="close" aria-label="Close dialog" onClick={onClose}>×</button>
          </span>
        </header>
        <div className="dialog-content">{children}</div>
        {showActions && <footer className="dialog-actions"><RetroButton onClick={onClose}>{actionLabel}</RetroButton></footer>}
      </section>
    </div>
  )
}
