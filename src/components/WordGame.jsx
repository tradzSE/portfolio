import { useCallback, useEffect, useState } from 'react'

const ANSWERS = ['APPLE', 'BEACH', 'BRAIN', 'CHAIR', 'CLOUD', 'DREAM', 'FLAME', 'FRAME', 'GRAPE', 'HOUSE', 'LIGHT', 'MOUSE', 'PLANT', 'ROBOT', 'SHARE', 'SMILE', 'SPACE', 'TRAIN', 'WATER', 'WORLD']
const KEY_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']
const MAX_GUESSES = 6

function chooseAnswer() {
  return ANSWERS[Math.floor(Math.random() * ANSWERS.length)]
}

function scoreGuess(guess, answer) {
  const result = Array(5).fill('absent')
  const remaining = answer.split('')

  guess.split('').forEach((letter, index) => {
    if (letter === answer[index]) {
      result[index] = 'correct'
      remaining[index] = null
    }
  })

  guess.split('').forEach((letter, index) => {
    if (result[index] === 'correct') return
    const matchIndex = remaining.indexOf(letter)
    if (matchIndex !== -1) {
      result[index] = 'present'
      remaining[matchIndex] = null
    }
  })

  return result
}

export default function WordGame({ active = true }) {
  const [answer, setAnswer] = useState(chooseAnswer)
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [message, setMessage] = useState('Guess the five-letter word.')
  const [gameState, setGameState] = useState('playing')

  const resetGame = () => {
    setAnswer(chooseAnswer())
    setGuesses([])
    setCurrentGuess('')
    setMessage('Guess the five-letter word.')
    setGameState('playing')
  }

  const handleKey = useCallback((key) => {
    if (gameState !== 'playing') return
    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        setMessage('Not enough letters.')
        return
      }
      const nextGuesses = [...guesses, currentGuess]
      setGuesses(nextGuesses)
      setCurrentGuess('')
      if (currentGuess === answer) {
        setGameState('won')
        setMessage(`You got it in ${nextGuesses.length}!`)
      } else if (nextGuesses.length === MAX_GUESSES) {
        setGameState('lost')
        setMessage(`The word was ${answer}.`)
      } else {
        setMessage('Try again.')
      }
      return
    }
    if (key === 'BACKSPACE') {
      setCurrentGuess((value) => value.slice(0, -1))
      return
    }
    if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((value) => `${value}${key}`)
      setMessage('Guess the five-letter word.')
    }
  }, [answer, currentGuess, gameState, guesses])

  useEffect(() => {
    if (!active) return undefined
    const onKeyDown = (event) => {
      if (event.repeat) return
      const key = event.key.toUpperCase()
      if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
        event.preventDefault()
        handleKey(key)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, handleKey])

  const letterScores = {}
  const rank = { absent: 1, present: 2, correct: 3 }
  guesses.forEach((guess) => {
    scoreGuess(guess, answer).forEach((score, index) => {
      const letter = guess[index]
      if (!letterScores[letter] || rank[score] > rank[letterScores[letter]]) letterScores[letter] = score
    })
  })

  return (
    <div className="word-game">
      <header className="word-game-header">
        <div className="word-game-brand">
          <img src="/icons/word.ico" alt="" />
          <div><strong>Word.exe</strong><span>Five-letter word puzzle</span></div>
        </div>
        <button type="button" onClick={resetGame}>New game</button>
      </header>
      <main className="word-game-main">
        <p className={`word-message ${gameState}`} role="status">{message}</p>
        <div className="word-grid" aria-label="Word guesses">
          {Array.from({ length: MAX_GUESSES }, (_, rowIndex) => {
            const guess = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess : '')
            const scores = guesses[rowIndex] ? scoreGuess(guess, answer) : []
            return Array.from({ length: 5 }, (_, columnIndex) => (
              <div className={`word-tile ${scores[columnIndex] || ''} ${guess[columnIndex] ? 'filled' : ''}`} key={`${rowIndex}-${columnIndex}`}>
                {guess[columnIndex] || ''}
              </div>
            ))
          })}
        </div>
      </main>
      <div className="word-keyboard" aria-label="On-screen keyboard">
        {KEY_ROWS.map((row, rowIndex) => (
          <div className="word-key-row" key={row}>
            {rowIndex === 2 && <button type="button" data-sound="none" className="wide" onClick={() => handleKey('ENTER')}>Enter</button>}
            {row.split('').map((letter) => <button type="button" data-sound="none" className={letterScores[letter] || ''} key={letter} onClick={() => handleKey(letter)}>{letter}</button>)}
            {rowIndex === 2 && <button type="button" data-sound="none" className="wide" onClick={() => handleKey('BACKSPACE')} aria-label="Backspace">Del</button>}
          </div>
        ))}
      </div>
      <footer className="word-game-status">
        <span>Attempt {Math.min(guesses.length + 1, MAX_GUESSES)} of {MAX_GUESSES}</span>
        <span>ENTER submits · DEL erases</span>
      </footer>
    </div>
  )
}
