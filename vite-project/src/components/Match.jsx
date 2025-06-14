import { useGame } from './Gamecontext';
import wood from '../Images/wooden.jpeg';
import paper from '../Images/paper.jpeg';
import { useNavigate } from 'react-router-dom';
import Dice from './Dice';
import { useEffect, useState, useRef } from 'react';
import { hasScore, selectedScore } from '../Calculatescore';
import { useLocation } from 'react-router-dom';

const Match = () => {
    const [turn , setTurn] = useState(0);   //indicates whose turn 0 -> Player 1 and 1 -> Player 2
    const [start, setStart] = useState(0);  //starting index
    const [stop, setStop] = useState(5);    //stopping index

    /*Array of size two for maintaining scores of two players*/
    const [total, setTotal] = useState([0, 0]);
    const [round, setRound] = useState([0, 0]);
    const [select, setSelect] = useState([0, 0]);

    /*Current values of each dices of the players */
    const [diceValues, setDiceValues] = useState([1,1,1,1,1,1,1,1,1,1,1,1]); 

    /*To keep track of those dices that are currently been selected */
    const [selectedDices, setSelectedDices] = useState([false, false, false, false, false, false, false, false, false, false, false, false]);

    /*To keep track of those dices that are already selected and moves to next round */
    const [lockedDices, setLockedDices] = useState([false, false, false, false, false, false, false, false, false, false, false, false]);

    /*Initial Rolling of full dices tracking */
    const location = useLocation();

    /*To store selected dices values*/
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        if (!location.state?.rolled) {
            initialRoll();
        }

    }, []);


    useEffect(() => {
        //console.log(diceValues);
        // loading saved dice values after clicking help
        const saved1 = sessionStorage.getItem('diceValues');
        const saved2 = sessionStorage.getItem('selectedDices');
        const saved3 = sessionStorage.getItem('lockedDices');
        const saved4 = sessionStorage.getItem('select');
        const saved5 = sessionStorage.getItem('round');
        const saved6 = sessionStorage.getItem('total');
        const saved7 = sessionStorage.getItem('turn');

        if (saved1 && saved2 && saved3 && saved4 && saved5 && saved6 && saved7) {
            setDiceValues(JSON.parse(saved1));
            setSelectedDices(JSON.parse(saved2));
            setLockedDices(JSON.parse(saved3));
            setSelect(JSON.parse(saved4));
            setRound(JSON.parse(saved5));
            setTotal(JSON.parse(saved6));
            setTurn(JSON.parse(saved7));
        }
    }, []);

    /*Calling Selected Dice Values whenever selection or deselection happens */
    useEffect(() => {
        getSelectedDiceValues();
    }, [selectedDices]);

    /*Updating select score based on player's selection of dices */
    useEffect(() => {
        if(hasScore(selectedValues, false)){
            setSelect(prev => {
                const updated = [...prev];
                updated[turn] = selectedScore(selectedValues);
                return updated;
            });
        }
        else {
            setSelect(prev => {
                const updated = [...prev];
                updated[turn] = 0;
                return updated;
            });
        }
    }, [selectedValues]);

    /*Initial Rolling and Dice Values and setting the turn*/
    const initialRoll = () => {
        let rollCount = 0;
        const maxRolls = 10;
        const rollInterval = 60;

        const animateRoll = () => {
            return new Promise((resolve) => {
            const interval = setInterval(() => {
                setDiceValues(prev => prev.map(() => Math.floor(Math.random() * 6) + 1));
                rollCount++;

                if (rollCount >= maxRolls) {
                    clearInterval(interval);
                    // Final roll
                    const finalValues = Array.from({ length: 12 }, () => Math.floor(Math.random() * 6) + 1);
                    setDiceValues(finalValues);
                    resolve(finalValues);
                }
            }, rollInterval);
            });
        };
        const checkAndSetTurn = async () => {
            let result = await animateRoll(); // roll all dice
            //console.log(result.slice(0,6))
            //console.log(hasScore(result.slice(0,6),true))
            if (hasScore(result.slice(0,6), true)) {
                return;
            }
            toggleTurn();
            if (hasScore(result.slice(6,12), true)) {
                return;
            }
            toggleTurn();
            // Neither player has a scoring combo — reroll and try again
            checkAndSetTurn();
        };
        checkAndSetTurn();
    };

    const startRoll = () => {
        let rollCount = 0;
        const maxRolls = 10;
        const rollInterval = 60;
        const begin = start === 0 ? 6 : 0;
        const end = stop === 5 ? 11 : 5;
        const animateRoll = () => {
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    setDiceValues(prev => prev.map((val, idx) => {
                        if (idx >= begin && idx <= end) {
                            return Math.floor(Math.random() * 6) + 1;
                        }
                        return val;
                    }));
                    rollCount++;

                    if (rollCount >= maxRolls) {
                        clearInterval(interval);
                        const finalValues = Array.from({ length: end - begin + 1 }, () => Math.floor(Math.random() * 6) + 1);
                        setDiceValues(prev => prev.map((val, idx) => {
                            if (idx >= begin && idx <= end) {
                                return finalValues[idx - begin]; // align with finalValues index
                            }
                            return val;
                        }));
                        // Delay resolve slightly to ensure state is applied
                        setTimeout(() => resolve(finalValues), 0);
                    }
                }, rollInterval);
            });
        };
        const checkAndSetTurn = async () => {
            let result = await animateRoll();
            console.log(result.slice(start, stop + 1))
            if (hasScore(result.slice(start,stop + 1), true)) {
                return;
            }
            //toggleTurn();
            //startRoll();
        };
        checkAndSetTurn();
    }

    const nextRoll = () => {
        const nextDices = [];   //stores indices of those dice that need to be rolled
        for(let i=start; i<=stop; i++){
            if(!selectedDices[i] && !lockedDices[i]){
                nextDices.push(i);
            }
        }
        //console.log(nextDices);
        let rollCount = 0;
        const maxRolls = 10;
        const rollInterval = 60;
        const finalValues = [];
        const animateRoll = () => {
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    setDiceValues(prev =>
                        prev.map((val, idx) =>
                            nextDices.includes(idx) ? Math.floor(Math.random() * 6) + 1 : val
                        )
                    );
                    rollCount++;

                    if (rollCount >= maxRolls) {
                        clearInterval(interval);

                        
                        setDiceValues(prev => {
                            const updated = prev.map((val, idx) => {
                                const newVal = nextDices.includes(idx)
                                    ? Math.floor(Math.random() * 6) + 1
                                    : val;
                                finalValues[idx] = newVal;
                                return newVal;
                            });
                            return updated;
                        });
                        // Delay resolve slightly to ensure state is applied
                        setTimeout(() => resolve(finalValues), 0);
                    }
                }, rollInterval);
            });
        };

        const checkAndSetTurn = async () => {
            //console.log(diceValues);
            let result = await animateRoll(); // roll all dice
            //console.log(result);
            let checkDices = nextDices.map(i => finalValues[i]);
            //console.log(checkDices)
            //console.log(hasScore(checkDices,true));
            if (hasScore(checkDices, true)) {
                return;
            }
            resetScoresandDices();
            toggleTurn();
            startRoll();    
        };
        checkAndSetTurn();
    }

    const resetScoresandDices = () => {
        /*resetting locked and selected Dices */
        const updatedSelectedDices = [...selectedDices];
        const updatedLockedDices = [...lockedDices];

        for (let i = start; i <= stop; i++) {
            updatedSelectedDices[i] = false; // unselect
            updatedLockedDices[i] = false;    // unlock
        }

        setSelectedDices(updatedSelectedDices);
        setLockedDices(updatedLockedDices);

        //resetting round and select
        setRound(prev => {
            const updated = [...prev];
            updated[turn] = 0;
            return updated;
        });
        
        setSelect(prev => {
            const updated = [...prev];
            updated[turn] = 0;
            return updated;
        });
    }


    const navigate = useNavigate()
    const { player1, player2, score } = useGame()

    const handleHelp = () => {
        /* Saving dice values and status before going to help page*/
        sessionStorage.setItem('diceValues', JSON.stringify(diceValues));
        sessionStorage.setItem('selectedDices', JSON.stringify(selectedDices));
        sessionStorage.setItem('lockedDices', JSON.stringify(lockedDices));
        sessionStorage.setItem('select', JSON.stringify(select));
        sessionStorage.setItem('round', JSON.stringify(round));
        sessionStorage.setItem('total', JSON.stringify(total));
        sessionStorage.setItem('turn', JSON.stringify(turn));
        navigate('/help', { state: { from: '/match', rolled: true } });
    }

    const handleQuit = () => {
        navigate('/setting')
    }

    const toggleTurn = () => {
        if(turn == 0) {
            setTurn(1);
            setStart(6);
            setStop(11);
        }
        else {
            setTurn(0);
            setStart(0);
            setStop(5);
        }
    }

    const handleDiceClick = (index) => {
        if(!lockedDices[index]) {
            setSelectedDices((selectedDices) => {
                const updateSelect = [...selectedDices];
                if(updateSelect[index]){
                    updateSelect[index] = false;
                }
                else{
                    updateSelect[index] = true;
                }
                return updateSelect;
            });
        }
    }

    /*Function to filter selected dices values*/
    const getSelectedDiceValues = () => {
        const selected = [];
        for (let i = start; i <= stop; i++) {
            if (selectedDices[i] && !lockedDices[i]) {
                selected.push(diceValues[i]);
            }
        }
        setSelectedValues(selected); // update the state
    };

    const handleScoreandRollAgain = () => {
        //Locking the already selected dice to the next round
        const updatedSelectedDices = [...selectedDices];
        const updatedLockedDices = [...lockedDices];

        for (let i = start; i <= stop; i++) {
            if (selectedDices[i]) {
                //updatedSelectedDices[i] = false; // unselect
                updatedLockedDices[i] = true;    // lock
            }
        }

        setSelectedDices(updatedSelectedDices);
        setLockedDices(updatedLockedDices);

        //updating round and resetting select
        setRound(prev => {
            const updated = [...prev];
            updated[turn] += select[turn];
            return updated;
        });
        
        setSelect(prev => {
            const updated = [...prev];
            updated[turn] = 0;
            return updated;
        });

        //Roll for the next round
        nextRoll();
    };

    return (
        <>
        <div className='flex justify-around mt-5'>
            <div>
                <h2 style={{fontFamily:'Roboto, sans-serif', fontSize: '24px'}}>{player1}</h2>
                <div className={`rounded-lg shadow-lg mx-auto overflow-hidden flex flex-col
                ${turn == 0 ? 'border-4 border-blue-700 rounded-xl' : ''}`} 
                    style={{
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
                            <Dice onClick={() => handleDiceClick(0)} value={diceValues[0]}
                            selected={selectedDices[0]} locked={lockedDices[0]}/>
                            <Dice onClick={() => handleDiceClick(1)} value={diceValues[1]}
                            selected={selectedDices[1]} locked={lockedDices[1]}/>
                            <Dice onClick={() => handleDiceClick(2)} value={diceValues[2]}
                            selected={selectedDices[2]} locked={lockedDices[2]}/>
                            <Dice onClick={() => handleDiceClick(3)} value={diceValues[3]}
                            selected={selectedDices[3]} locked={lockedDices[3]}/>
                            <Dice onClick={() => handleDiceClick(4)} value={diceValues[4]}
                            selected={selectedDices[4]} locked={lockedDices[4]}/>
                            <Dice onClick={() => handleDiceClick(5)} value={diceValues[5]}
                            selected={selectedDices[5]} locked={lockedDices[5]}/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-15 mt-4">
                    <button
                        className="flex items-center bg-blue-700 text-white px-15 py-4 rounded-md hover:bg-white/10 transition text-lg"
                        onClick={turn === 0 ? handleScoreandRollAgain : () => {}}
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
                <div className={`rounded-lg shadow-lg mx-auto overflow-hidden flex flex-col
                ${turn == 1 ? 'border-4 border-blue-700 rounded-xl' : ''}`} 
                 style={{
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
                            <Dice onClick={() => handleDiceClick(6)} value={diceValues[6]}
                            selected={selectedDices[6]} locked={lockedDices[6]}/>
                            <Dice onClick={() => handleDiceClick(7)} value={diceValues[7]}
                            selected={selectedDices[7]} locked={lockedDices[7]}/>
                            <Dice onClick={() => handleDiceClick(8)} value={diceValues[8]}
                            selected={selectedDices[8]} locked={lockedDices[8]}/>
                            <Dice onClick={() => handleDiceClick(9)} value={diceValues[9]}
                            selected={selectedDices[9]} locked={lockedDices[9]}/>
                            <Dice onClick={() => handleDiceClick(10)} value={diceValues[10]}
                            selected={selectedDices[10]} locked={lockedDices[10]}/>
                            <Dice onClick={() => handleDiceClick(11)} value={diceValues[11]}
                            selected={selectedDices[11]} locked={lockedDices[11]}/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start gap-15 mt-4">
                    <button
                        className="flex items-center bg-blue-700 text-white px-15 py-4 rounded-md hover:bg-white/10 transition text-lg"
                        onClick={turn === 1 ? handleScoreandRollAgain : () => {}}
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