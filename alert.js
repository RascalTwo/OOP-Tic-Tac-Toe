class PromptTicTacToe extends TicTacToe {
	constructor() {
		super();
		this.render();
	}

	toString() {
		const side = this._board.length / 3
		const rows = [
			['-', ...Array.from({ length: side }, (_, i) => i)]
		];
		let row = [0];
		for (let i = 0; i < this._board.length; i++) {
			if (row.length === side + 1) {
				rows.push(row);
				row = [rows.length - 1];
			}
			row.push(this._board[i] || '-')
		}
		if (row.length === side + 1) rows.push(row);

		return `Current Player: ${this.currentPlayer}\n\n` + rows.map(row => row.join(' | ')).join('\n');
	}

	getTileIndex(message){
		const response = prompt(this + '\n\n' + message);
		if (!response) return null;

		const [x, y] = response.split(',').map(part => parseInt(part))
		if (isNaN(x) || isNaN(y)) return 'Must be numbers';
		if (x < 0 || x > 2 || y < 0 || y > 2) return 'Numbers must be between 0 and 2';

		return x * 3 + y;
	}

	render(message = 'Enter X,Y of position to place') {
		super.render();

		while (typeof	message === 'string'){
			message = this.getTileIndex(message);
		}
		if (message === null) return alert('Draw!');

		if (!this.place(message)) return this.render('That tile is already full!');


		const winner = this.winner;
		if (winner === undefined) return this.render();
		alert(winner ? winner + ' won!' : 'Draw!');


		if (!confirm('Play again?')) return;
		this.restart();
		return this.render();
	}
}

new PromptTicTacToe()