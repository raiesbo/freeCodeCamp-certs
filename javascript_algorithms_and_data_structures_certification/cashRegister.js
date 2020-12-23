function checkCashRegister(price, cash, cid) {
	let change = cash - price;
	let changeBalance = []
	let totalCash = 0
	let status = ""
	const cidBalance = {}
	const moneyVal = {
		PENNY: 0.01,
		NICKEL: 0.05,
		DIME: 0.1,
		QUARTER: 0.25,
		ONE: 1,
		FIVE: 5,
		TEN: 10,
		TWENTY: 20,
		"ONE HUNDRED": 100,
	}

	// CREATE cidBalance / totalCash
	for (let item of cid) {
		cidBalance[item[0]] = item[1]
		totalCash += item[1]
	}

	// PREPARING THE MONEYVALUE OBJ
	let arrVal = Object.values(moneyVal).reverse()
	let arrKey = Object.keys(moneyVal).reverse()
	// PREPARING THE CID OBJ
	let cidVal = Object.values(cidBalance).reverse()
	// COINS CALCULATOR

	for (let i = 0; i < arrVal.length; i++) {
		let coinsNum = Math.floor(change / arrVal[i])
		// CHECK RESOURCES
		if (arrVal[i] * coinsNum >= cidVal[i]) {
			change -= cidVal[i]
			change = (change).toFixed(2)
			coinsNum !== 0 && changeBalance.push([arrKey[i], cidVal[i]])
		} else {
			change -= arrVal[i] * coinsNum
			change = (change).toFixed(2)
			coinsNum !== 0 && changeBalance.push([arrKey[i], arrVal[i] * coinsNum])
		}
		// console.log(change)
	}

	// CHECK STATUS
	if (cash - price > totalCash || parseFloat(change) > 0) {
		status = "INSUFFICIENT_FUNDS"
		changeBalance = []
	} else if (cash - price - totalCash == 0) {
		status = "CLOSED"
		changeBalance = cid
	} else {
		status = "OPEN"
	}

	//console.log(cash - price, totalCash, parseFloat(change))
	console.log({ status, change: changeBalance })
	return { status, change: changeBalance };
}

// OPEN TESTS
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
// should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
// should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

// CLOSED TESTS
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
//		should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}

// INSUFFICIENT FUNDS TESTS
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// should return {status: "INSUFFICIENT_FUNDS", change: []}.
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// should return {status: "INSUFFICIENT_FUNDS", change: []}.