import { useEffect, useRef, useState } from 'react'
import { formatCurrentProject } from '../data/currentProject'

export default function CurrentProjectNotepad({ onExit }) {
  const [text] = useState(formatCurrentProject)
  const [activeMenu, setActiveMenu] = useState(null)
  const [helpOpen, setHelpOpen] = useState(false)
  const [wordWrap, setWordWrap] = useState(true)
  const [cursor, setCursor] = useState({ line: 1, column: 1 })
  const textareaRef = useRef(null)

  useEffect(() => {
    const closeMenus = () => setActiveMenu(null)
    window.addEventListener('pointerdown', closeMenus)
    return () => window.removeEventListener('pointerdown', closeMenus)
  }, [])

  const toggleMenu = (menu, event) => {
    event.stopPropagation()
    setActiveMenu((current) => current === menu ? null : menu)
  }

  const updateCursor = () => {
    const textarea = textareaRef.current
    if (!textarea) return
    const beforeCursor = textarea.value.slice(0, textarea.selectionStart)
    const lines = beforeCursor.split('\n')
    setCursor({ line: lines.length, column: lines.at(-1).length + 1 })
  }

  const saveAs = () => {
    setActiveMenu(null)
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'CURRENT_PROJECT.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  const selectAll = () => {
    setActiveMenu(null)
    textareaRef.current?.focus()
    textareaRef.current?.select()
    updateCursor()
  }

  const copySelection = async () => {
    setActiveMenu(null)
    const textarea = textareaRef.current
    if (!textarea) return
    const selected = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd)
    if (!selected) return
    try {
      await navigator.clipboard.writeText(selected)
    } catch {
      document.execCommand('copy')
    }
    textarea.focus()
  }

  return (
    <div className="notepad-app">
      <nav className="notepad-menu" aria-label="Notepad menu" onPointerDown={(event) => event.stopPropagation()}>
        <div className="notepad-menu-group">
          <button type="button" onClick={(event) => toggleMenu('file', event)}><u>F</u>ile</button>
          {activeMenu === 'file' && <div className="notepad-dropdown">
            <button type="button" onClick={saveAs}>Save As...</button>
            <hr />
            <button type="button" onClick={onExit}>Exit</button>
          </div>}
        </div>
        <div className="notepad-menu-group">
          <button type="button" onClick={(event) => toggleMenu('edit', event)}><u>E</u>dit</button>
          {activeMenu === 'edit' && <div className="notepad-dropdown">
            <button type="button" onClick={selectAll}>Select All <span>Ctrl+A</span></button>
            <button type="button" onClick={copySelection}>Copy <span>Ctrl+C</span></button>
          </div>}
        </div>
        <div className="notepad-menu-group">
          <button type="button" onClick={(event) => toggleMenu('format', event)}><u>F</u>ormat</button>
          {activeMenu === 'format' && <div className="notepad-dropdown">
            <button type="button" onClick={() => { setWordWrap((value) => !value); setActiveMenu(null) }}><span className="menu-check">{wordWrap ? '✓' : ''}</span> Word Wrap</button>
          </div>}
        </div>
        <div className="notepad-menu-group">
          <button type="button" onClick={(event) => toggleMenu('help', event)}><u>H</u>elp</button>
          {activeMenu === 'help' && <div className="notepad-dropdown">
            <button type="button" onClick={() => { setHelpOpen(true); setActiveMenu(null) }}>About CURRENT_PROJECT.TXT</button>
          </div>}
        </div>
      </nav>
      <textarea
        ref={textareaRef}
        className="notepad-document"
        value={text}
        readOnly
        wrap={wordWrap ? 'soft' : 'off'}
        spellCheck="false"
        aria-label="Current project document"
        onClick={updateCursor}
        onKeyUp={updateCursor}
        onSelect={updateCursor}
      />
      <footer className="notepad-status">Ln {cursor.line}, Col {cursor.column}</footer>
      {helpOpen && <div className="notepad-help-layer" role="presentation">
        <section className="notepad-help" role="dialog" aria-modal="true" aria-labelledby="notepad-help-title">
          <header><strong id="notepad-help-title">About CURRENT_PROJECT.TXT</strong><button type="button" aria-label="Close help" onClick={() => setHelpOpen(false)}>×</button></header>
          <div>
            <img src="/icons/text-document.png" alt="" />
            <p><strong>CURRENT_PROJECT.TXT</strong><span>A read-only overview of the project Ranier is currently building.</span><span>Use Select All, Copy, or Save As to keep a local copy.</span></p>
          </div>
          <footer><button type="button" autoFocus onClick={() => setHelpOpen(false)}>OK</button></footer>
        </section>
      </div>}
    </div>
  )
}
