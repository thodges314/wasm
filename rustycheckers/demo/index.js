fetch('./rustycheckers.wasm')
	.then(resonse => resonse.arrayBuffer())
	.then(bytes =>
		WebAssembly.instantiate(bytes, {
			env: {
				notify_piecemoved: (fX, fY, tX, tY) => {
					console.log('A piece moved from (' + fX + ', ' + fY + ') to (' + tX + ', ' + tY + ').');
				},
				notify_piececrowned: (x, y) => {
					console.log('A piece was crowned at (' + x + ', ' + y + ').');
				}
			},
		})
	)
	.then(results => {
		instance = results.instance;
		const {get_current_turn, get_piece, move_piece} = instance.exports;

		console.log("At start, current turn is: " + get_current_turn());
		let piece = get_piece(0, 7);
		console.log("The piece at (0,7) is: " + piece);
		let res = move_piece(0, 5, 1, 4); //B
		console.log("First move result: " +  res);
		console.log("Turn after move: " + get_current_turn());
		let bad = move_piece(1, 4, 2, 2) // illegal move
		console.log("Illegal move result: " + bad);
		console.log("Turn after illegal move: "+ get_current_turn());
	})
	.catch(console.error);

// At start, current turn is: 1
// index.js:21 The piece at (0,7) is: 1
// index.js:7 A piece moved from (0, 5) to (1, 4).
// index.js:23 First move result: 1
// index.js:24 Turn after move: 2
// index.js:26 Illegal move result: 0
// index.js:27 Turn after illegal move: 2
