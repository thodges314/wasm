fetch('./checkers.wasm').then(resonse => resonse.arrayBuffer())
	.then(bytes => WebAssembly.instantiate(bytes, {
		events: {
			piecemoved: (fX, fY, tX, tY) => {
				console.log("A piece moved from (" + fX + ", " + fY + ") to (" + tX+ ", " + tY + ").")
			},
			piececrowned: (x, y) => {
				console.log("A piece was crowned at (" + x + ", " + y + ").")
			}
		},
	}
	))
	.then(results =>{
		instance = results.instance

		instance.exports.initBoard()
		console.log("At start, the owner is " + instance.exports.getTurnOwner())

		instance.exports.move(0, 5, 0, 4)	// B
		instance.exports.move(1, 0, 1, 1)	// W
		instance.exports.move(0, 4, 0, 3)	// B
		instance.exports.move(1, 1, 1, 0)	// W
		instance.exports.move(0, 3, 0, 2)	// B
		instance.exports.move(1, 0, 1, 1)	// W
		instance.exports.move(0, 2, 0, 0)	// B - this will get a crown
		instance.exports.move(1, 1, 1, 0)	// W
		// B - move the crowned piece out
		let res = instance.exports.move(0, 0, 0, 2)

		document.getElementById("container").innerText = res
		console.log("At end, the owner is " + instance.exports.getTurnOwner())
	}).catch(console.error)

// At start, the owner is 1
// index.js:5 A piece moved from (0, 5) to (0, 4).
// index.js:5 A piece moved from (1, 0) to (1, 1).
// index.js:5 A piece moved from (0, 4) to (0, 3).
// index.js:5 A piece moved from (1, 1) to (1, 0).
// index.js:5 A piece moved from (0, 3) to (0, 2).
// index.js:5 A piece moved from (1, 0) to (1, 1).
// index.js:8 A piece was crowned at (0, 0).
// index.js:5 A piece moved from (0, 2) to (0, 0).
// index.js:5 A piece moved from (1, 1) to (1, 0).
// index.js:5 A piece moved from (0, 0) to (0, 2).
// index.js:31 At end, the owner is 2