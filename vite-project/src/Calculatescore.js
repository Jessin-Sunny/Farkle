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
        else if (count >= 1 && (index == 1 || index == 5))
            return true;
    }
    return false;
}