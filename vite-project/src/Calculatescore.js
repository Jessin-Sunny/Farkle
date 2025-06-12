export function hasScore(diceValues) {
    /*
    maintaining counts of each dice values
    starting from index 1 to 6 for direct counting with index
    Ignoring index 0
    Need Array of size 7
    */
    const counts = Array(7).fill(0)

    diceValues.forEach(value => {
        counts[value] ++ ;
    });
    
    for (let index=1; index<=6; index++){
        const count = counts[index];
        if (count == 3)
            return true;
        if (count >= 1 && (index == 1 || index == 5))
            return true;
    }
    return false;
}

export function selectedScore(selectedDices) {

    //maintaining count of each selected dice values
    const counts = Array(7).fill(0);

    selectedDices.forEach(value => {
        counts[value] ++ ;
    });

   

    //removing those dice indexes which does not have count
    //const distinctCounts = counts.filter(c => c > 0);

    //checking if 1,2,3,4,5,6 dice values are there - straight condition
    //dice are from 1 to 6 and no need of 0th index, reassigning count array
    const isStraight = counts.slice(1).every(c => c==1 );
    if (isStraight) return 1500;

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
                score +=  100 * (count - 2);
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