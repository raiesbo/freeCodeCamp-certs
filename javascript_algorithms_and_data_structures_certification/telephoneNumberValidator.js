function telephoneCheck(str) {
    let isNumber = false;
    if(str[3] == "-" && str[7] == "-" || str[3] == " " && str[7] == " " && str.length == 12) {
        isNumber = true;
    } else if (/* (/\w{10]/).test(str) &&  */str.length == 10) {
        isNumber = true;
    } else if (str[0] == "1" && str.length == 14 && str[1] == "(" && str[5] == ")") {
        console.log("1:", str)
        isNumber = true;
    } else if (str[0] == "1" && str.length >= 14 && str[1] == " " && str[2] == "(") {
        console.log("2:", str)
        isNumber = true;
    } else if (str[0] == "1" && str.length >= 14 && str[1] == " " && str[5] == "-" || str[0] == "1" && str[5] == " ") {
        console.log("3:", str)
        isNumber = true;
    } else if (str[0] == "(" && str[4] == ")" && str.length == 13 && str[8] == "-") {
        isNumber = true;
    } else if (str[0] == "(" && str[4] == ")" && str[5] == " " && str.length == 14) {
        isNumber = true;
    }
    console.log(isNumber)
    return isNumber;
}


telephoneCheck("1 555-555-5555") // should return true.
telephoneCheck("1 (555) 555-5555") // should return true.
telephoneCheck("1(555)555-5555"); // true
telephoneCheck("1 555 555 5555"); // true

telephoneCheck("1 555)555-5555"); // false
telephoneCheck("2 757 622-7382"); // false

/* telephoneCheck("555-555-5555"); // true
telephoneCheck("555 555 5555"); // true
telephoneCheck("5555555555"); // true
telephoneCheck("(555)555-5555"); // true
telephoneCheck("(555) 555-5555"); // true */




/* telephoneCheck("123**&!!asdf#"); // false
telephoneCheck("2 (757) 622-7382"); // false
telephoneCheck("0 (757) 622-7382"); // false
telephoneCheck("27576227382"); // false
telephoneCheck("(275)76227382"); // false */


// \d

// CORRECT OPTIONS

/*
555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555
*/