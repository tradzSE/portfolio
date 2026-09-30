import RetroButton from './RetroButton'

export default function Dialog({ title, children, onClose, onMinimize, onMaximize, maximized = false, actionLabel = 'OK', className = '', showActions = true, hidden = false }) {
  return (
    <div className={`dialog-layer ${hidden ? 'dialog-layer-hidden' : ''}`} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`dialog ${className} ${maximized ? 'dialog-maximized' : ''}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <header className="dialog-titlebar">
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
