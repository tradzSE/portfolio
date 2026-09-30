import { useCallback, useState } from 'react'
import AchievementDialog from './AchievementDialog'
import DontClickConfirmation from './DontClickConfirmation'
import FakeHackSequence from './FakeHackSequence'

export default function DontClickEasterEgg({ completed, onClose, onComplete }) {
  const [stage, setStage] = useState(completed ? 'already-completed' : 'confirmation')
  const restore = useCallback(() => onClose(), [onClose])

  if (stage === 'confirmation') return <DontClickConfirmation onCancel={onClose} onConfirm={() => setStage('sequence')} />
  if (stage === 'already-completed') return <div className="achievement-layer"><AchievementDialog repeated onRestore={onClose} /></div>
  if (stage === 'sequence') return <FakeHackSequence onEscape={restore} onComplete={onComplete} />
  return null
}
