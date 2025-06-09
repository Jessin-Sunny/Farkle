import { createContext, useContext, useState, useEffect } from 'react'

export const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const getInitialValue = (key, defaultValue) => {
    const stored = sessionStorage.getItem(key)
    return stored !== null ? JSON.parse(stored) : defaultValue
  }

  const [player1, setPlayer1State] = useState(() => getInitialValue('player1', 'Player 1'))
  const [player2, setPlayer2State] = useState(() => getInitialValue('player2', 'Player 2'))
  const [score, setScoreState] = useState(() => getInitialValue('score', 2000))

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem('player1', JSON.stringify(player1))
  }, [player1])

  useEffect(() => {
    sessionStorage.setItem('player2', JSON.stringify(player2))
  }, [player2])

  useEffect(() => {
    sessionStorage.setItem('score', JSON.stringify(score))
  }, [score])

  const value = {
    player1, setPlayer1: setPlayer1State,
    player2, setPlayer2: setPlayer2State,
    score, setScore: setScoreState,
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)