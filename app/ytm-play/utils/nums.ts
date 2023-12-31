const numsToString = (num: number) => {
    let numInString = new String(num);
    if (numInString.length <= 3) {
        return numInString;
    } else if (numInString.length > 3 && numInString.length <= 6) {
        numInString = new String(Math.floor(num/1000));
        return numInString + "K+";
    } else if(numInString.length > 6 && numInString.length <= 9) {
        numInString = new String(Math.floor(num/1000000));
        return numInString + "M+";
    } else {
        numInString = new String(Math.floor(num/1000000000));
        return numInString + "B+";
    }
}

export default numsToString;