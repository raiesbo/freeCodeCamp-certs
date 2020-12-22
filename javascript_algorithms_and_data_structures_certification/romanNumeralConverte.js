function convertToRoman(num) {
    const romanLetters = {
        1: "I",
        4: "IV",
        5: "V",
        9: "IX",
        10: "X",
        40: "XL",
        50: "L",
        90: "XC",
        100: "C",
        400: "CD",
        500: "D",
        900: "CM",
        1000: "M"
    }
    let romanNum = "";
    const keysList = Object.keys(romanLetters)
    //console.log(("" + num).split("").map((i, id) => parseInt(i)))

    for (let item of keysList.reverse()) {
        const letter = Math.floor(num / item)
        num -= letter * item
        romanNum += romanLetters[item].repeat(letter)
        //console.log(item, letter, num, romanNum)
    }

    console.log(romanNum)
    return romanNum;
}
   
convertToRoman(36);
convertToRoman(44); // "XLIV"
convertToRoman(29); // "XXIX"
convertToRoman(12); // "XII"
convertToRoman(3999); // "MMMCMXCIX"