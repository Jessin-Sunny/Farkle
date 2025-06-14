export function hasScore(diceValues, initialRoll) {
    /*
    maintaining counts of each dice values
    starting from index 1 to 6 for direct counting with index
    Ignoring index 0
    Need Array of size 7
    initialRoll will be set to true, so that at initiall roll if any one dice scores it return true
    */
    const counts = Array(7).fill(0)

    diceValues.forEach(value => {
        counts[value] ++ ;
    });

    const totalDice = diceValues.length;

    // Check for straight (1-6, each exactly once)
    const isStraight = totalDice === 6 && [1, 2, 3, 4, 5, 6].every(i => counts[i] === 1);
    if (isStraight) return true;

    // Check for three pairs
    const pairs = counts.filter(c => c === 2).length;
    if (totalDice === 6 && pairs === 3) return true;

    // Check for two triplets
    const triples = counts.filter(c => c === 3).length;
    if (totalDice === 6 && triples === 2) return true;

    // Check for four-of-a-kind + a pair
    const hasFour = counts.includes(4);
    const hasPair = counts.includes(2);
    if (totalDice === 6 && hasFour && hasPair) return true;

    // Check normal scoring dice (triplets, 1s, 5s)
    let totalUsed = 0;

    for (let i = 1; i <= 6; i++) {
        if (counts[i] >= 3) {
            totalUsed += 3;
            counts[i] -= 3;
        }
    }

    // Add leftover 1s and 5s
    totalUsed += counts[1]; // each 1 is 100
    totalUsed += counts[5]; // each 5 is 50

    //initialRoll will be set to true, so that at initiall roll if any one dice scores it return true
    if(initialRoll)
        return totalUsed > 0;
    // If all dice were used for scoring, return true
    return totalUsed == totalDice
}

export function selectedScore(selectedDices) {

    //maintaining count of each selected dice values
    const counts = Array(7).fill(0);

    selectedDices.forEach((value, i) => {
    const num = Number(value); // safer than parseInt for single digits
    //console.log(`Value ${i}:`, value, '=>', num);
    if (!Number.isInteger(num) || num < 1 || num > 6) {
        console.error('Invalid dice value:', value);
    } else {
        counts[num]++;
    }
    });


    //removing those dice indexes which does not have count
    //const distinctCounts = counts.filter(c => c > 0);

    //checking if 1,2,3,4,5,6 dice values are there - straight condition
    //dice are from 1 to 6 and no need of 0th index, reassigning count array
    // console.log("Selected Dices:", selectedDices);
    //console.log("Counts:", counts.slice(1));

    // STRAIGHT check: exactly [1,2,3,4,5,6]
    const isStraight =
        selectedDices.length === 6 &&
        [1, 2, 3, 4, 5, 6].every(num => counts[num] === 1);
    if(isStraight) return 1500;


    //checking if there are exactly three pairs
    const pairs = counts.filter( c => c == 2).length;
    if (pairs == 3) return 1500;

    //checking if there are two different values appear three times
    const triples = counts.filter( c => c == 3).length;
    if (triples == 2) return 2500;

    //checking four of a kind and a pair exist
    const fourIndex = counts.findIndex( c => c == 4);
    const hasPair = counts.includes(2);
    if(fourIndex != -1 && hasPair) return 1500;

    //regular scores
    let score = 0;
    for (let i=1; i<=6; i++){
        const count = counts[i];

        if(count >= 3){
            if ( i==1 ){
                 score +=  1000 * (count - 2);
            }
            else {
                score += 100 * i * (count - 2)
            }
        }
        else {
            if ( i==1 ) {
                score += 100 * count
            }
            else if ( i==5 ) {
                score += 50 * count
            }
        }
    }
    return score;
}