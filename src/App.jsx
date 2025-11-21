import { useEffect, useState } from "react"
import { GameHeader } from "./components/GameHeader"
import { Card } from "./components/Card"

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function App() {
  const emojis = [
    "🍎",
    "🍌",
    "🍇",
    "🍊",
    "🍓",
    "🥝",
    "🍑",
    "🍒",
  ]

  const [deck, setDeck] = useState([])
  const [firstId, setFirstId] = useState(null)
  const [secondId, setSecondId] = useState(null)
  const [moves, setMoves] = useState(0)
  const [score, setScore] = useState(0)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const pairs = [...emojis, ...emojis]
    const shuffled = shuffle(pairs).map((emoji, idx) => ({
      id: idx,
      emoji,
      flipped: false,
      matched: false,
    }))
    setDeck(shuffled)
    setMoves(0)
    setScore(0)
    setFirstId(null)
    setSecondId(null)
  }, [])

  useEffect(() => {
    if (firstId === null || secondId === null) return

    const first = deck.find((c) => c.id === firstId)
    const second = deck.find((c) => c.id === secondId)
    if (!first || !second) return

    setDisabled(true)
    setMoves((m) => m + 1)

    if (first.emoji === second.emoji) {
      // match
      setDeck((d) =>
        d.map((c) =>
          c.id === firstId || c.id === secondId ? { ...c, matched: true } : c,
        ),
      )
      setScore((s) => s + 1)
      resetTurn()
    } else {
      // no match -> flip back after delay
      setTimeout(() => {
        setDeck((d) =>
          d.map((c) =>
            c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c,
          ),
        )
        resetTurn()
      }, 800)
    }
  }, [secondId])

  function resetTurn() {
    setFirstId(null)
    setSecondId(null)
    setDisabled(false)
  }

  function handleCardClick(id) {
    if (disabled) return
    if (firstId === null) {
      setDeck((d) => d.map((c) => (c.id === id ? { ...c, flipped: true } : c)))
      setFirstId(id)
      return
    }

    if (firstId !== null && secondId === null && id !== firstId) {
      setDeck((d) => d.map((c) => (c.id === id ? { ...c, flipped: true } : c)))
      setSecondId(id)
      return
    }
  }

  return (
    <div className="app">
      <GameHeader Yes={score} No={moves} />

      <div className="cards-grid">
        {deck.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  )
}

export default App
