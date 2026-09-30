let audioContext
let enabled = localStorage.getItem('ranier-os-sound') !== 'off'
const mouseSamples = {
  down: new Audio('/audio/mouse_down.mp3'),
  up: new Audio('/audio/mouse_up.mp3'),
}
const keyboardSamples = Array.from({ length: 6 }, (_, index) => new Audio(`/audio/keyboard/key_${index + 1}.mp3`))

mouseSamples.down.preload = 'auto'
mouseSamples.up.preload = 'auto'
keyboardSamples.forEach((sample) => { sample.preload = 'auto' })

const playMouseSample = (sample) => {
  if (!enabled) return
  const audio = mouseSamples[sample].cloneNode()
  audio.volume = 0.8
  audio.play().catch(() => {})
}

export function primeUiAudio() {
  if (!enabled) return
  Object.values(mouseSamples).forEach((sample) => {
    sample.load()
    sample.volume = 0
    const playback = sample.play()
    if (playback) {
      playback.then(() => {
        sample.pause()
        sample.currentTime = 0
        sample.volume = 0.8
      }).catch(() => {})
    }
  })
  getContext()
}

const getContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return null
  if (!audioContext) audioContext = new AudioContext()
  if (audioContext.state === 'suspended') audioContext.resume()
  return audioContext
}

const tone = (context, { frequency, duration, volume, type = 'square', delay = 0 }) => {
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  const start = context.currentTime + delay
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.004)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(start)
  oscillator.stop(start + duration + 0.01)
}

export function playUiSound(name = 'click') {
  if (!enabled) return

  if (name === 'mouse-down') {
    playMouseSample('down')
    return
  }

  if (name === 'mouse-up') {
    playMouseSample('up')
    return
  }

  const context = getContext()
  if (!context) return

  if (name === 'open') {
    tone(context, { frequency: 330, duration: 0.055, volume: 0.035 })
    tone(context, { frequency: 495, duration: 0.07, volume: 0.03, delay: 0.045 })
    return
  }

  if (name === 'close') {
    tone(context, { frequency: 420, duration: 0.05, volume: 0.03 })
    tone(context, { frequency: 245, duration: 0.075, volume: 0.035, delay: 0.035 })
    return
  }

  playMouseSample('down')
}

export function playKeyboardSound() {
  if (!enabled) return
  const sample = keyboardSamples[Math.floor(Math.random() * keyboardSamples.length)].cloneNode()
  sample.volume = 0.8
  sample.play().catch(() => {})
}

export function setUiSoundEnabled(value) {
  enabled = value
  localStorage.setItem('ranier-os-sound', value ? 'on' : 'off')
  if (value) playUiSound('open')
}

export function getUiSoundEnabled() {
  return enabled
}
