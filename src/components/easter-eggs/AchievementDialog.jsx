import RetroButton from '../RetroButton'

export default function AchievementDialog({ repeated = false, onRestore }) {
  return (
    <section className="achievement-dialog" role="dialog" aria-modal="true" aria-labelledby="achievement-title">
      <header id="achievement-title">Achievement Unlocked</header>
      <div className="achievement-content">
        <div className="achievement-trophy" aria-hidden="true">★</div>
        <div>
          <strong>CURIOSITY KILLED THE USER</strong>
          <p>{repeated ? 'Achievement already unlocked.' : 'You ignored a very clear instruction.'}</p>
        </div>
      </div>
      <footer><RetroButton autoFocus onClick={onRestore}>{repeated ? 'OK' : 'RESTORE RANIER.OS'}</RetroButton></footer>
    </section>
  )
}
