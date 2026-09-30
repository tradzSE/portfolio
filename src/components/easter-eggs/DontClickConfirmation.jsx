import Dialog from '../Dialog'
import RetroButton from '../RetroButton'

export default function DontClickConfirmation({ onConfirm, onCancel }) {
  return (
    <Dialog title="RANIER.OS" showActions={false} onClose={onCancel} className="dont-click-confirmation">
      <div className="dont-click-warning">
        <span aria-hidden="true">!</span>
        <div><strong>Are you sure?</strong><p>I literally said don't.</p></div>
      </div>
      <div className="dont-click-actions">
        <RetroButton autoFocus onClick={onConfirm}>YES</RetroButton>
        <RetroButton onClick={onCancel}>CANCEL</RetroButton>
      </div>
    </Dialog>
  )
}
