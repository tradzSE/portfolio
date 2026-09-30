import { useEffect, useState } from 'react'

const BOARD_SIZE = 9
const MINE_COUNT = 10
const CELL_COUNT = BOARD_SIZE * BOARD_SIZE

function createBoard() {
  return Array.from({ length: CELL_COUNT }, (_, index) => ({
    index,
    mine: false,
    revealed: false,
    flagged: false,
    adjacent: 0,
  }))
}

function getNeighbors(index) {
  const row = Math.floor(index / BOARD_SIZE)
  const column = index % BOARD_SIZE
  const neighbors = []

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
      if (rowOffset === 0 && columnOffset === 0) continue
      const neighborRow = row + rowOffset
      const neighborColumn = column + columnOffset
      if (neighborRow >= 0 && neighborRow < BOARD_SIZE && neighborColumn >= 0 && neighborColumn < BOARD_SIZE) {
        neighbors.push(neighborRow * BOARD_SIZE + neighborColumn)
      }
    }
  }

  return neighbors
}

function plantMines(safeIndex) {
  const board = createBoard()
  const candidates = board.map((cell) => cell.index).filter((index) => index !== safeIndex)

  for (let current = candidates.length - 1; current > 0; current -= 1) {
    const randomIndex = Math.floor(Math.random() * (current + 1))
    ;[candidates[current], candidates[randomIndex]] = [candidates[randomIndex], candidates[current]]
  }

  candidates.slice(0, MINE_COUNT).forEach((index) => { board[index].mine = true })
  board.forEach((cell) => {
    if (!cell.mine) cell.adjacent = getNeighbors(cell.index).filter((index) => board[index].mine).length
  })
  return board
}

function revealArea(board, startIndex) {
  const nextBoard = board.map((cell) => ({ ...cell }))
  const pending = [startIndex]
  const visited = new Set()

  while (pending.length) {
    const currentIndex = pending.shift()
    if (visited.has(currentIndex)) continue
    visited.add(currentIndex)
    const cell = nextBoard[currentIndex]
    if (cell.flagged || cell.mine) continue
    cell.revealed = true
    if (cell.adjacent === 0) {
      getNeighbors(currentIndex).forEach((neighborIndex) => {
        if (!visited.has(neighborIndex)) pending.push(neighborIndex)
      })
    }
  }

  return nextBoard
}

function counter(value) {
  return String(Math.max(-99, Math.min(999, value))).padStart(3, '0')
}

export default function Minesweeper() {
  const [board, setBoard] = useState(createBoard)
  const [gameState, setGameState] = useState('ready')
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (gameState !== 'playing') return undefined
    const timer = window.setInterval(() => setSeconds((value) => Math.min(value + 1, 999)), 1000)
    return () => window.clearInterval(timer)
  }, [gameState])

  const resetGame = () => {
    setBoard(createBoard())
    setGameState('ready')
    setSeconds(0)
  }

  const revealCell = (index) => {
    if (gameState === 'won' || gameState === 'lost' || board[index].revealed || board[index].flagged) return

    let nextBoard = gameState === 'ready' ? plantMines(index) : board
    if (nextBoard[index].mine) {
      nextBoard = nextBoard.map((cell) => cell.mine ? { ...cell, revealed: true } : cell)
      setBoard(nextBoard)
      setGameState('lost')
      return
    }

    nextBoard = revealArea(nextBoard, index)
    const cleared = nextBoard.every((cell) => cell.mine || cell.revealed)
    if (cleared) {
      nextBoard = nextBoard.map((cell) => cell.mine ? { ...cell, flagged: true } : cell)
      setGameState('won')
    } else {
      setGameState('playing')
    }
    setBoard(nextBoard)
  }

  const toggleFlag = (event, index) => {
    event.preventDefault()
    if (gameState === 'won' || gameState === 'lost' || board[index].revealed) return
    setBoard((currentBoard) => currentBoard.map((cell) => cell.index === index ? { ...cell, flagged: !cell.flagged } : cell))
  }

  const flaggedCount = board.filter((cell) => cell.flagged).length
  const face = gameState === 'lost' ? 'X(' : gameState === 'won' ? 'B)' : ':)'

  return (
    <div className="minesweeper">
      <div className="minesweeper-display">
        <output aria-label={`${MINE_COUNT - flaggedCount} mines remaining`}>{counter(MINE_COUNT - flaggedCount)}</output>
        <button type="button" className="minesweeper-reset" onClick={resetGame} aria-label="Start a new game">{face}</button>
        <output aria-label={`${seconds} seconds elapsed`}>{counter(seconds)}</output>
      </div>
      <div className="minefield" role="grid" aria-label="Minesweeper board">
        {board.map((cell) => {
          const label = cell.flagged ? 'Flagged square' : cell.revealed && cell.mine ? 'Mine' : cell.revealed && cell.adjacent ? `${cell.adjacent} nearby mines` : cell.revealed ? 'Empty square' : 'Hidden square'
          return (
            <button
              type="button"
              role="gridcell"
              key={cell.index}
              className={`mine-cell ${cell.revealed ? 'revealed' : ''} ${cell.mine && cell.revealed ? 'mine' : ''} count-${cell.adjacent}`}
              onClick={() => revealCell(cell.index)}
              onContextMenu={(event) => toggleFlag(event, cell.index)}
              onKeyDown={(event) => {
                if (event.shiftKey && (event.key === 'Enter' || event.key === ' ')) toggleFlag(event, cell.index)
              }}
              aria-label={label}
            >
              {cell.flagged ? 'F' : cell.revealed && cell.mine ? '*' : cell.revealed && cell.adjacent ? cell.adjacent : ''}
            </button>
          )
        })}
      </div>
      <p className="minesweeper-help">Left-click to reveal. Right-click to flag.</p>
    </div>
  )
}
