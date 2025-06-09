import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from './Gamecontext'


const Setting = () => {
  const { player1, setPlayer1, player2, setPlayer2, score, setScore } = useGame()
  const navigate = useNavigate()

  const handleHelp = () => {
    navigate('/help')
  }

  return (
     <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <div className=" bg-white/20 rounded-lg shadow-lg mx-auto" style={{
    width: 'min(100vw, 1000px)',
    height: '500px',
  }}>
        <div className='flex justify-center items-center mt-4'>
          <span className="material-icons" style={{fontSize:'40px'}}>settings</span>
            <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '40px' }}
            className="ml-5 text-white ">
              Game Settings
              </span>
        </div>
        <form action="" className="flex flex-col space-y-4 mt-6 px-8">
          <div className="flex flex-col">
          <label className="mb-2 text-lg font-medium">Player 1 Name</label>
        <input
          type="text"
          placeholder="Player 1"
          className="p-3 rounded-md  bg-black/20 focus:outline-none focus:ring-2 focus:ring-white"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
        </div>
        <div className="flex flex-col">
        <label className="mb-2 text-lg font-medium">Player 2 Name</label>
        <input
          type="text"
          placeholder="Player 2"
          className="p-3 rounded-md  bg-black/20 focus:outline-none focus:ring-2 focus:ring-white"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
        </div>
        <div className="flex flex-col">
        <label className="mb-2 text-lg font-medium">Set Score</label>
        <input
          type='number'
          min='2000'
          placeholder='2000'
          className="p-3 rounded-md  bg-black/20 focus:outline-none focus:ring-2 focus:ring-white"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        </div>
        <div className='flex justify-between items-center mt-6 px-8'>
          <button className="flex items-center bg-blue-800 text-white px-9 py-4 rounded-md hover:bg-white/10 transition text-lg"
          onClick={handleHelp}>
          <span className="material-icons mr-2">info</span>
          Help
          </button>
          <button className="flex items-center bg-green-700 text-white px-9 py-4 rounded-md hover:bg-white/10 transition text-lg">
          <span className='material-icons mr-2'>play_arrow</span>
          Start
          </button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Setting