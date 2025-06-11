import { useGame } from './Gamecontext'
import wood from '../Images/wooden.jpeg'
import paper from '../Images/paper.jpeg'
import { useNavigate } from 'react-router-dom'
import Dice from './Dice'
import { useEffect, useState } from 'react'


const Match = () => {
    const [turn , setTurn] = useState(0);   //indicates whose turn 0 -> Player 1 and 1 -> Player 2

    /*Array of size two for maintaining scores of two players*/
    const [total, setTotal] = useState([0, 0]);
    const [round, setRound] = useState([0, 0]);
    const [select, setSelect] = useState([0, 0]);

    /*To keep track of those dices that are currently been selected */
    const [dices1, setDices1] = useState([false, false, false, false, false, false]);
    const [dices2, setDices2] = useState([false, false, false, false, false, false]);

    /*Current values of each dices of the player 1 */
    const [diceValues1, setdiceValues1] = useState([1,1,1,1,1,1])
    /*Current values of each dices of the player 2 */
    const [diceValues2, setdiceValues2] = useState([1,1,1,1,1,1])

   useEffect(() => {
        rollUnselectedDice(diceValues1, setdiceValues1, dices1);
        rollUnselectedDice(diceValues2, setdiceValues2, dices2);
    }, []);
    const navigate = useNavigate()
    const { player1, player2, score } = useGame()

    const handleHelp = () => {
        navigate('/help', { state: { from: '/match' } });
    }

    const handleQuit = () => {
        navigate('/setting')
    }

    const handleDclick1 = (index) => {
        setDices1((dices1) => {
            const updateSelect = [...dices1];
            if(updateSelect[index]){
                updateSelect[index] = false;
            }
            else{
                updateSelect[index] = true;
            }
            return updateSelect;
        });
    }

    const handleDclick2 = (index) => {
        setDices2((dices2) => {
            const updateSelect = [...dices2];
            if(updateSelect[index]){
                updateSelect[index] = false;
            }
            else{
                updateSelect[index] = true;
            }
            return updateSelect;
        });
    }

    //console.log(dices1)
    //console.log(dices2)



    const updateDiceValue1 = (index, value) => {
        setdiceValues1((diceValues1) => {
        const updatedValues = [...diceValues1]; // Create a copy
        updatedValues[index] = value; // Update the correct dice index
        return updatedValues;
        }); 
    };
    const updateDiceValue2 = (index, value) => {
        setdiceValues2((diceValues2) => {
        const updatedValues = [...diceValues2]; // Create a copy
        updatedValues[index] = value; // Update the correct dice index
        return updatedValues;
        }); 
    };

    const rollUnselectedDice = (diceValues, setDiceValues, diceSelected) => {
        let rollCount = 0;
        const maxRolls = 10;

        const interval = setInterval(() => {
            setDiceValues(prev =>
            prev.map((val, i) =>
                diceSelected[i] ? val : Math.floor(Math.random() * 6) + 1
            )
            );
            rollCount++;
            if (rollCount >= maxRolls) {
            clearInterval(interval);
            }
        }, 60);
    };

    const handleRollAgain = () => {
        if (turn === 0) {
            rollUnselectedDice(diceValues1, setdiceValues1, dices1);
        } else {
            rollUnselectedDice(diceValues2, setdiceValues2, dices2);
        }
    };
      
    return (
        <>
        <div className='flex justify-around mt-5'>
            <div>
                <h2 style={{fontFamily:'Roboto, sans-serif', fontSize: '24px'}}>{player1}</h2>
                <div className="rounded-lg shadow-lg mx-auto overflow-hidden flex flex-col" style={{
                    width: 'min(40vw, 1000px)',
                    height: 'min(40vw, 1000px)'}}>
                    <div className='h-[30%] w-full'
                    style={{
                        backgroundImage:`url(${paper})`
                    }}
                    >
                        <h4 className='kaushan-script-regular mt-3 ml-7' style={{fontSize:'24px'}}>Total: {total[0]} / {score}</h4>
                        <h4 className='kaushan-script-regular mt-3 ml-7' style={{fontSize:'24px'}}>Round: {round[0]}</h4>
                        <h4 className='kaushan-script-regular mt-3 ml-7' style={{fontSize:'24px'}}>Selected: {select[0]}</h4>
                    </div>
                    <div className='h-[70%] w-full'
                    style={{
                        backgroundImage:`url(${wood})`
                    }}
                    >
                        <div className='grid grid-cols-3 gap-10 mt-20 ml-10'>
                            <Dice onClick={() => handleDclick1(0)} value={diceValues1[0]}
                            selected={dices1[0]}/>
                            <Dice onClick={() => handleDclick1(1)} value={diceValues1[1]}
                            selected={dices1[1]}/>
                            <Dice onClick={() => handleDclick1(2)} value={diceValues1[2]}
                            selected={dices1[2]}/>
                            <Dice onClick={() => handleDclick1(3)} value={diceValues1[3]}
                            selected={dices1[3]}/>
                            <Dice onClick={() => handleDclick1(4)} value={diceValues1[4]}
                            selected={dices1[4]}/>
                            <Dice onClick={() => handleDclick1(5)} value={diceValues1[5]}
                            selected={dices1[5]}/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-15 mt-4">
                    <button
                        className="flex items-center bg-blue-700 text-white px-15 py-4 rounded-md hover:bg-white/10 transition text-lg"
                        onClick={handleRollAgain}
                    >
                        Score and Roll Again
                    </button>

                    <button
                        className="flex items-center bg-green-700 text-white px-18 py-4 rounded-md hover:bg-white/10 transition text-lg"

                    >
                        Score and Pass
                    </button>
                </div>
            </div>
            <div>
                <h2 style={{fontFamily:'Roboto, sans-serif', fontSize: '24px'}}>{player2}</h2>
                <div className="rounded-lg shadow-lg mx-auto overflow-hidden flex flex-col" style={{
                    width: 'min(40vw, 1000px)',
                    height: 'min(40vw, 1000px)'}}>
                    <div className='h-[30%] w-full'
                    style={{
                        backgroundImage:`url(${paper})`
                    }}
                    >
                        <h4 className='kaushan-script-regular mt-3 ml-7' style={{fontSize:'24px'}}>Total: {total[1]} / {score}</h4>
                        <h4 className='kaushan-script-regular mt-3 ml-7' style={{fontSize:'24px'}}>Round: {round[1]}</h4>
                        <h4 className='kaushan-script-regular mt-3 ml-7' style={{fontSize:'24px'}}>Selected: {select[1]}</h4>
                    </div>
                    <div className='h-[70%] w-full'
                    style={{
                        backgroundImage:`url(${wood})`
                    }}
                    >
                        <div className='grid grid-cols-3 gap-10 mt-20 ml-10'>
                            <Dice onClick={() => handleDclick2(0)} value={diceValues2[0]}
                            selected={dices2[0]}/>
                            <Dice onClick={() => handleDclick2(1)} value={diceValues2[1]}
                            selected={dices2[1]}/>
                            <Dice onClick={() => handleDclick2(2)} value={diceValues2[2]}
                            selected={dices2[2]}/>
                            <Dice onClick={() => handleDclick2(3)} value={diceValues2[3]}
                            selected={dices2[3]}/>
                            <Dice onClick={() => handleDclick2(4)} value={diceValues2[4]}
                            selected={dices2[4]}/>
                            <Dice onClick={() => handleDclick2(5)} value={diceValues2[5]}
                            selected={dices2[5]}/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start gap-15 mt-4">
                    <button
                        className="flex items-center bg-blue-700 text-white px-15 py-4 rounded-md hover:bg-white/10 transition text-lg"
                    >
                        Score and Roll Again
                    </button>

                    <button
                        className="flex items-center bg-green-700 text-white px-18 py-4 rounded-md hover:bg-white/10 transition text-lg"
                    >
                        Score and Pass
                    </button>
                </div>
            </div>
        </div>
        <div className='flex  justify-center gap-36 mt-4'>
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