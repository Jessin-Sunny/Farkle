import React from 'react'
import Dice1 from '../Images/Dice1.png'
import Dice2 from '../Images/Dice2.png'
import Dice3 from '../Images/Dice3.png'
import Dice4 from '../Images/Dice4.png'
import Dice5 from '../Images/Dice5.png'
import Dice6 from '../Images/Dice6.png'
import { useNavigate } from 'react-router-dom'

const Help = () => {
    const navigate = useNavigate()
    
    const handleContinue = () => {
        navigate('/') // Go back to the previous page
      }
  return (
    <>
    <div className='ml-10' style={{ fontFamily: "Roboto, sans-serif" }}>
        <h1 style={{fontSize:'30px'}}>Dice Point Combinations</h1>
        <h2 style={{fontSize:'28px'}}>Below are all dice combinations and their point values</h2>
        <div className="flex gap-150">
            <div className="flex flex-col gap-5">
                <div className='flex gap-5'>
                    <img src={Dice1} alt="Dice showing value 1" className="w-15 h-15 rounded-lg shadow-md" />
                    <p className='mt-3' style={{fontSize:'28px'}}>100</p>
                </div>
                <div className='flex gap-5'>
                    <img src={Dice5} alt="Dice showing value 5" className="w-15 h-15 rounded-lg shadow-md" />
                    <p className='mt-3' style={{fontSize:'28px'}}>50</p>
                </div>
                <div className='flex gap-5'>
                    <img src={Dice1} alt="Dice showing value 1" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice1} alt="Dice showing value 1" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice1} alt="Dice showing value 1" className="w-15 h-15 rounded-lg shadow-md" />
                    <p className='mt-3' style={{fontSize:'28px'}}>1000</p>
                </div>
                <div className='flex gap-5'>
                    <img src={Dice2} alt="Dice showing value 2" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice2} alt="Dice showing value 2" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice2} alt="Dice showing value 2" className="w-15 h-15 rounded-lg shadow-md" />
                    <p className='mt-3' style={{fontSize:'28px'}}>200</p>
                </div>
                <div className='flex gap-5'>
                    <img src={Dice3} alt="Dice showing value 3" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice3} alt="Dice showing value 3" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice3} alt="Dice showing value 3" className="w-15 h-15 rounded-lg shadow-md" />
                    <p className='mt-3' style={{fontSize:'28px'}}>300</p>
                </div>
                <div className='flex gap-5'>
                    <img src={Dice4} alt="Dice showing value 4" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice4} alt="Dice showing value 4" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice4} alt="Dice showing value 4" className="w-15 h-15 rounded-lg shadow-md" />
                    <p className='mt-3' style={{fontSize:'28px'}}>400</p>
                </div>
                <div className='flex gap-5'>
                    <img src={Dice5} alt="Dice showing value 5" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice5} alt="Dice showing value 5" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice5} alt="Dice showing value 5" className="w-15 h-15 rounded-lg shadow-md" />
                    <p className='mt-3' style={{fontSize:'28px'}}>500</p>
                </div>
                <div className='flex gap-5'>
                    <img src={Dice6} alt="Dice showing value 6" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice6} alt="Dice showing value 6" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice6} alt="Dice showing value 6" className="w-15 h-15 rounded-lg shadow-md" />
                    <p className='mt-3' style={{fontSize:'28px'}}>600</p>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className='flex gap-5'>
                    <img src={Dice1} alt="Dice showing value 1" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice2} alt="Dice showing value 2" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice3} alt="Dice showing value 3" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice4} alt="Dice showing value 4" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice5} alt="Dice showing value 5" className="w-15 h-15 rounded-lg shadow-md" />
                    <img src={Dice6} alt="Dice showing value 6" className="w-15 h-15 rounded-lg shadow-md" />
                    <p className='mt-3' style={{fontSize:'28px'}}>1500</p>
                </div>
                <div className='flex gap-5'>
                    <p className='mt-3' style={{fontSize:'28px'}}>4 OF A KIND</p>
                    <p className='mt-3' style={{fontSize:'28px'}}>1000</p>
                </div>
                <div className='flex gap-5'>
                    <p className='mt-3' style={{fontSize:'28px'}}>5 OF A KIND</p>
                    <p className='mt-3' style={{fontSize:'28px'}}>2000</p>
                </div>
                <div className='flex gap-5'>
                    <p className='mt-3' style={{fontSize:'28px'}}>6 OF A KIND</p>
                    <p className='mt-3' style={{fontSize:'28px'}}>3000</p>
                </div>
                <div className='flex gap-5'>
                    <p className='mt-3' style={{fontSize:'28px'}}>3 PAIRS</p>
                    <p className='mt-3' style={{fontSize:'28px'}}>1500</p>
                </div>
                <div className='flex gap-5'>
                    <p className='mt-3' style={{fontSize:'28px'}}>2 TRIPLETS</p>
                    <p className='mt-3' style={{fontSize:'28px'}}>2500</p>
                </div>
                <div className='flex gap-5'>
                    <p className='mt-3' style={{fontSize:'28px'}}>4 OF A KIND WITH A PAIR</p>
                    <p className='mt-3' style={{fontSize:'28px'}}>1500</p>
                </div>
                <button 
                className="flex items-center bg-green-700 text-white w-45 h-15 rounded-md hover:bg-white/10 transition"
                style={{ fontSize: '28px' }}
                onClick={handleContinue}>
                
                <span className='material-icons mr-2 '>play_arrow</span>
                    Continue
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Help