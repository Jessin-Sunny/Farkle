import { useEffect, useState } from 'react'
import Dice1 from '../Images/Dice1.png'
import Dice2 from '../Images/Dice2.png'
import Dice3 from '../Images/Dice3.png'
import Dice4 from '../Images/Dice4.png'
import Dice5 from '../Images/Dice5.png'
import Dice6 from '../Images/Dice6.png'

const diceImages = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]

const Dice = ({value, onClick, selected}) => {
    const validValue = value >= 1 && value <= 6 ? value : 1;
    return (
        <>
        <img 
        src={diceImages[validValue - 1]} 
        alt = {`Dice ${validValue}`}
        width='100px' onClick={onClick} 
        className={`cursor-pointer ${selected ? 'border-4 border-red-500 rounded-xl' : ''}`}></img>
        </>
    )
}

export default Dice