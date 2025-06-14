import { useGame } from './Gamecontext';
import wood from '../Images/wooden.jpeg';
import paper from '../Images/paper.jpeg';
import { useNavigate } from 'react-router-dom';
import Dice from './Dice';
import { useEffect, useState } from 'react';
import { hasScore, selectedScore } from '../Calculatescore';
import { useLocation } from 'react-router-dom';

const Match = () => {
    const [turn , setTurn] = useState(1);   //indicates whose turn 0 -> Player 1 and 1 -> Player 2

    /*Array of size two for maintaining scores of two players*/
    const [total, setTotal] = useState([0, 0]);
    const [round, setRound] = useState([0, 0]);
    const [select, setSelect] = useState([0, 0]);

    /*To keep track of those dices that are currently been selected */
    const [dices1, setDices1] = useState([false, false, false, false, false, false]);
    const [dices2, setDices2] = useState([false, false, false, false, false, false]);

    /*To keep values of those dices that are selected */
    const [selectedDvalue1, setSelecteddvalue1] = useState([]);
     const [selectedDvalue2, setSelecteddvalue2] = useState([]);

    /*Current values of each dices of the player 1 */
    const [diceValues1, setdiceValues1] = useState([1,1,1,1,1,1]);
    /*Current values of each dices of the player 2 */
    const [diceValues2, setdiceValues2] = useState([1,1,1,1,1,1]);

    /*To keep track of whose turn is it */
    const [locked1, setLocked1] = useState([false, false, false, false, false, false]);
    const [locked2, setLocked2] = useState([false, false, false, false, false, false]);
    const [message, setMessage] = useState("");

    /*Initial Rolling of full dices tracking */
    const location = useLocation();

    useEffect(() => {
        // Only roll if coming fresh
        if (!location.state?.rolled) {
            rollUnselectedDice(diceValues1, setdiceValues1, dices1);
            rollUnselectedDice(diceValues2, setdiceValues2, dices2);
        }
        //loading saved dice values after clicking help
        const saved1 = sessionStorage.getItem('diceValues1');
        const saved2 = sessionStorage.getItem('diceValues2');
        const savedDices1 = sessionStorage.getItem('dices1');
        const savedDices2 = sessionStorage.getItem('dices2');

        if (saved1 && saved2) {
            setdiceValues1(JSON.parse(saved1));
            setdiceValues2(JSON.parse(saved2));
            setDices1(JSON.parse(savedDices1));
            setDices2(JSON.parse(savedDices2));
        }
    }, []);

    useEffect(() => {
        if (turn === 0) {
            const selected = dices1
                .map((isSelected, index) => isSelected ? diceValues1[index] : null)
                .filter(val => val !== null);
            setSelecteddvalue1(selected);
        } else {
            const selected = dices2
                .map((isSelected, index) => isSelected ? diceValues2[index] : null)
                .filter(val => val !== null);
            setSelecteddvalue2(selected);
        }
    }, [dices1, dices2, turn]);

    useEffect(() => {
        if (turn === 0) {
            if (hasScore(selectedDvalue1)) {
                setSelect(prev => [selectedScore(selectedDvalue1), prev[1]]);
            } else {
                setSelect(prev => [0, prev[1]]);
            }
        } else {
            if (hasScore(selectedDvalue2)) {
                setSelect(prev => [prev[0], selectedScore(selectedDvalue2)]);
            } else {
                setSelect(prev => [prev[0], 0]);
            }
        }
    }, [selectedDvalue1, selectedDvalue2, turn]);

    useEffect(() => {
    const currentValues = turn === 0 ? diceValues1 : diceValues2;
        if (!hasScore(currentValues)) {
            setMessage("No score possible. Turn passed!");
            setRound(prev => turn === 0 ? [0, prev[1]] : [prev[0], 0]);
            setTurn(turn === 0 ? 1 : 0);
            setLocked1([false, false, false, false, false, false]);
            setLocked2([false, false, false, false, false, false]);
        }
    }, [diceValues1, diceValues2]);


    const navigate = useNavigate()
    const { player1, player2, score } = useGame()

    const handleHelp = () => {
        /* Saving dice values before going to help page*/
        sessionStorage.setItem('diceValues1', JSON.stringify(diceValues1));
        sessionStorage.setItem('diceValues2', JSON.stringify(diceValues2));
        sessionStorage.setItem('dices1', JSON.stringify(dices1));
        sessionStorage.setItem('dices2', JSON.stringify(dices2));
        navigate('/help', { state: { from: '/match', rolled: true } });
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

    const handleScoreAndRollAgain = () => {
        const isPlayer1 = turn === 0;
        const selected = isPlayer1 ? selectedDvalue1 : selectedDvalue2;
        const selectedIndices = (isPlayer1 ? dices1 : dices2)
            .map((v, i) => v ? i : null)
            .filter(v => v !== null);

        if (!hasScore(selected)) {
            setMessage("Invalid selection. No score in selected dice.");
            return;
        }

        const scoreGained = selectedScore(selected);
        setRound(prev => isPlayer1 ? [prev[0] + scoreGained, prev[1]] : [prev[0], prev[1] + scoreGained]);

        // Update locked state for next roll
        const newLocked = isPlayer1 ? [...locked1] : [...locked2];
        selectedIndices.forEach(i => newLocked[i] = true);
        if (isPlayer1) {
            setLocked1(newLocked);
            setDices1([false, false, false, false, false, false]);
        } else {
            setLocked2(newLocked);
            setDices2([false, false, false, false, false, false]);
        }

        // Determine if all 6 dice were used (bonus roll case)
        const allUsed = selectedIndices.length + newLocked.filter(Boolean).length === 6;
        if (allUsed) {
            // Reset locks and allow full re-roll
            if (isPlayer1) {
                setLocked1([false, false, false, false, false, false]);
                rollUnselectedDice(diceValues1, setdiceValues1, [false, false, false, false, false, false]);
            } else {
                setLocked2([false, false, false, false, false, false]);
                rollUnselectedDice(diceValues2, setdiceValues2, [false, false, false, false, false, false]);
            }
            setMessage("All dice used! Roll again!");
            return;
        }

        // Normal re-roll with current locked state
        const updatedDiceSetter = isPlayer1 ? setdiceValues1 : setdiceValues2;
        const updatedDiceValues = isPlayer1 ? diceValues1 : diceValues2;
        rollUnselectedDice(updatedDiceValues, updatedDiceSetter, newLocked);

        // Delay to let dice roll animation finish before checking result
        setTimeout(() => {
            const currentValues = isPlayer1 ? diceValues1 : diceValues2;
            if (!hasScore(currentValues.map((val, i) => newLocked[i] ? null : val).filter(Boolean))) {
                // No score on re-rolled dice, lose round and switch turn
                setMessage("No score possible. Round lost!");
                setRound(prev => isPlayer1 ? [0, prev[1]] : [prev[0], 0]);
                setTurn(prev => prev === 0 ? 1 : 0);
                setLocked1([false, false, false, false, false, false]);
                setLocked2([false, false, false, false, false, false]);
            }
        }, 700); // Give time for `rollUnselectedDice` to animate
    };
    
    const handleScoreAndPass = () => {
        const isPlayer1 = turn === 0;
        const selected = isPlayer1 ? selectedDvalue1 : selectedDvalue2;

        if (!hasScore(selected)) {
            setMessage("Invalid selection. No score in selected dice.");
            return;
        }

        const gained = selectedScore(selected);
        const newRoundScore = isPlayer1 ? round[0] + gained : round[1] + gained;

        if (isPlayer1) {
            setTotal(prev => [prev[0] + newRoundScore, prev[1]]);
            setRound([0, round[1]]);
            setLocked1([false, false, false, false, false, false]);
            setDices1([false, false, false, false, false, false]);
        } else {
            setTotal(prev => [prev[0], prev[1] + newRoundScore]);
            setRound([round[0], 0]);
            setLocked2([false, false, false, false, false, false]);
            setDices2([false, false, false, false, false, false]);
        }

        setTurn(isPlayer1 ? 1 : 0);
        setMessage("Turn passed after scoring!");
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
                        onClick={handleScoreAndRollAgain}
                    >
                        Score and Roll Again
                    </button>

                    <button
                        className="flex items-center bg-green-700 text-white px-18 py-4 rounded-md hover:bg-white/10 transition text-lg"
                        onClick={handleScoreAndPass}
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
                        onClick={handleScoreAndRollAgain}
                    >
                        Score and Roll Again
                    </button>

                    <button
                        className="flex items-center bg-green-700 text-white px-18 py-4 rounded-md hover:bg-white/10 transition text-lg"
                        onClick={handleScoreAndPass}
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