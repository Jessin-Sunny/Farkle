import { useState, useEffect } from 'react'
import './App.css'
import Setting from './components/Setting'

function App() {
  const [player1, setPlayer1] = useState('Player 1')
  const [player2, setPlayer2] = useState('Player 2')
  const [score, setScore] = useState(2000)
  useEffect(() => {
    console.log('Player 1:', player1)
    console.log('Player 2:', player2)
    console.log('Score:', score)
  }, [player1, player2, score]) 

  return (
    <>
    <div className="min-h-screen text-white" style={{ backgroundColor: '#16141C' }}>
      <h1 className="kaushan-script-regular">
       Farkle
      </h1>
      <Setting
        player1={player1} setPlayer1={setPlayer1}
        player2={player2} setPlayer2={setPlayer2}
        score={score} setScore={setScore}
      />
    </div>
    </>

  )
}

export default App
