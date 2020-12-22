function palindrome(str) {
    const fixedStr = str.toLowerCase().replace(/\W+/g, "").replace(/_/g, "")
    const firstH = fixedStr.split("").splice(0, Math.floor(fixedStr.length / 2))
    const secondH = fixedStr.split("").splice(Math.round(fixedStr.length / 2)).reverse()
    // console.log("compare", firstH, secondH)
    // console.log(fixedStr, lowCase, Math.floor(lowCase.length / 2), Math.round(lowCase.length / 2))
    // console.log(firstH + "" == secondH + "" ? true : false)
    return firstH + "" == secondH + "" ? true : false
}
  
  
  
palindrome("eye"); // true
palindrome("_eye"); // true
palindrome("race car"); // true
palindrome("not a palindrome"); // false
palindrome("nope"); // false
palindrome("0_0 (: /-\ :) 0-0"); // true
palindrome("A man, a plan, a canal. Panama"); // true
palindrome("My age is 0, 0 si ega ym."); // true