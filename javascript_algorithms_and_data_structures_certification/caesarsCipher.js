function rot13(str) {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const arr = str.split("")
    arr.map((i, id) => {
        if ((/[A-Z]/).test(i)) {
            let nId = abc.indexOf(i)
             return arr.splice(id, 1, abc[nId + 13  >= abc.length ? nId + 13 - abc.length : nId + 13])
        } else {
            return i
        }
    })

    console.log(arr.join(""))
    return arr.join("");
}
  
rot13("SERR PBQR PNZC"); // FREE CODE CAMP
rot13("SERR CVMMN!"); // FREE PIZZA!
rot13("SERR YBIR?"); // FREE LOVE?
rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."); // THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.