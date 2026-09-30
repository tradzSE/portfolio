const icons = {
  app: '/icons/application.png',
  bin: '/icons/recycle-bin.png',
  game: '/icons/minesweeper.png',
  word: '/icons/word.ico',
  danger: '/icons/application.png',
}

export default function PixelIcon({ type = 'app', small = false }) {
  return (
    <span className={`pixel-icon pixel-icon-${type} ${small ? 'pixel-icon-small' : ''}`} aria-hidden="true">
      <img src={icons[type] || icons.app} alt="" draggable="false" />
    </span>
  )
}
