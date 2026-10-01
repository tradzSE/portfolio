import Dialog from '../Dialog'
import RetroButton from '../RetroButton'

export default function DontClickConfirmation({ onConfirm, onCancel }) {
  return (
    <Dialog title="Security Warning" showActions={false} onClose={onCancel} className="dont-click-confirmation">
      <div className="dont-click-warning">
        <span aria-hidden="true">!</span>
        <div><strong>Open this attachment?</strong><p>LOVE-LETTER-FOR-YOU.TXT.vbs may be unsafe.</p></div>
      </div>
      <div className="dont-click-actions">
        <RetroButton autoFocus onClick={onConfirm}>OPEN</RetroButton>
        <RetroButton onClick={onCancel}>CANCEL</RetroButton>
      </div>
    </Dialog>
  )
}
