import PixelIcon from './PixelIcon'
import { playUiSound } from '../audio'

export default function DesktopIcon({ label, type, selected, onSelect, onOpen, openOnTouch = false }) {
  return (
    <button
      className={`desktop-icon desktop-icon-${type} ${selected ? 'selected' : ''}`}
      data-sound="none"
      onClick={onSelect}
      onDoubleClick={() => { playUiSound('open'); onOpen() }}
      onPointerUp={(event) => { if (openOnTouch && event.pointerType !== 'mouse') { playUiSound('open'); onOpen() } }}
      onKeyDown={(event) => { if (event.key === 'Enter') { playUiSound('open'); onOpen() } }}
      aria-label={`Open ${label}`}
    >
      <PixelIcon type={type} />
      <span>{label}</span>
    </button>
  )
}
