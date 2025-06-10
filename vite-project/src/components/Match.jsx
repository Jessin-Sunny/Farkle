import React from 'react'
import { useGame } from './Gamecontext'
import wood from '../Images/wooden.jpeg'
import paper from '../Images/paper.jpeg'
import { useNavigate } from 'react-router-dom'

const Match = () => {
    const navigate = useNavigate()
    const { player1, player2, score } = useGame()

   const handleHelp = () => {
    navigate('/help', { state: { from: '/match' } });
  }

  const handleQuit = () => {
    navigate('/setting')
  }

    return (
        <>
        <div className='flex justify-around mt-5'>
            <div>
                <h2 style={{fontFamily:'Roboto, sans-serif', fontSize: '24px'}}>{player1}</h2>
                <div className="rounded-lg shadow-lg mx-auto overflow-hidden flex flex-col" style={{
                    width: 'min(45vw, 1000px)',
                    height: 'min(50vw, 1000px)'}}>
                    <div className='h-[30%] w-full'
                    style={{
                        backgroundImage:`url(${paper})`
                    }}
                    >
                        <h4 className='kaushan-script-regular mt-3 ml-7' style={{fontSize:'24px'}}>Total: 0 / {score}</h4>
                        <h4 className='kaushan-script-regular mt-3 ml-7' style={{fontSize:'24px'}}>Round: 0</h4>
                        <h4 className='kaushan-script-regular mt-3 ml-7' style={{fontSize:'24px'}}>Selected: 0</h4>
                    </div>
                    <div className='h-[70%] w-full'
                    style={{
                        backgroundImage:`url(${wood})`
                    }}
                    >
                    </div>
                </div>
                <div className="flex justify-end gap-15 mt-4">
                    <button
                        className="flex items-center bg-blue-700 text-white px-20 py-4 rounded-md hover:bg-white/10 transition text-lg"
                        onClick={''}
                    >
                        Score and Roll Again
                    </button>

                    <button
                        className="flex items-center bg-green-700 text-white px-20 py-4 rounded-md hover:bg-white/10 transition text-lg"
                        onClick={''}
                    >
                        Score and Pass
                    </button>
                </div>
            </div>
            <div>
                <h2 style={{fontFamily:'Roboto, sans-serif', fontSize: '24px'}}>{player2}</h2>
                <div className="rounded-lg shadow-lg mx-auto overflow-hidden flex flex-col" style={{
                    width: 'min(45vw, 1000px)',
                    height: 'min(50vw, 1000px)'}}>
                    <div className='h-[30%] w-full'
                    style={{
                        backgroundImage:`url(${paper})`
                    }}
                    >
                        <h4 className='kaushan-script-regular mt-3 ml-7' style={{fontSize:'24px'}}>Total: 0 / {score}</h4>
                        <h4 className='kaushan-script-regular mt-3 ml-7' style={{fontSize:'24px'}}>Round: 0</h4>
                        <h4 className='kaushan-script-regular mt-3 ml-7' style={{fontSize:'24px'}}>Selected: 0</h4>
                    </div>
                    <div className='h-[70%] w-full'
                    style={{
                        backgroundImage:`url(${wood})`
                    }}
                    >
                    </div>
                </div>
                <div className="flex justify-start gap-15 mt-4">
                    <button
                        className="flex items-center bg-blue-700 text-white px-20 py-4 rounded-md hover:bg-white/10 transition text-lg"
                    >
                        Score and Roll Again
                    </button>

                    <button
                        className="flex items-center bg-green-700 text-white px-20 py-4 rounded-md hover:bg-white/10 transition text-lg"
                    >
                        Score and Pass
                    </button>
                </div>
            </div>
        </div>
        <div className='flex  justify-center gap-20 mt-4'>
            <button
                className="flex items-center bg-orange-500 text-white px-20 py-4 rounded-md hover:bg-white/10 transition text-lg"
                onClick={handleHelp}
            >
                Help
            </button>

            <button
                className="flex items-center bg-red-500 text-white px-20 py-4 rounded-md hover:bg-white/10 transition text-lg"
                onClick={handleQuit}
            >
                Quit
            </button>
        </div>
        </>
  )
}

export default Match