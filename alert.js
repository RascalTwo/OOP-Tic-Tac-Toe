class PromptTicTacToe extends TicTacToe {
	constructor() {
		super();
		this.render();
	}

	toString() {
		const rows = [
			['-', 0, 1, 2]
		];
		let row = [0];
		for (let i = 0; i < this._board.length; i++) {
			if (row.length === 4) {
				rows.push(row);
				row = [rows.length - 1];
			}
			row.push(this._board[i] || '-')
		}
		if (row.length === 4) rows.push(row);

		return `Current Player: ${this.currentPlayer}\n\n` + rows.map(row => row.join(' | ')).join('\n');
	}

	render(message = 'Enter X,Y of position to place') {
		super.render();

		const response = prompt(this + '\n\n' + message);
		if (!response) return alert('Draw!');

		const [x, y] = response.split(',').map(part => parseInt(part))
		if (isNaN(x) || isNaN(y)) return this.render('Must be numbers');
		if (x < 0 || x > 2 || y < 0 || y > 2) return this.render('Numbers must be between 0 and 2');
		if (!this.place(x * 3 + y)) return this.render('That tile is already full!');


		const winner = this.winner;
		if (winner === undefined) return this.render();
		alert(winner ? winner + ' won!' : 'Draw!');
		if (!confirm('Play again?')) return

		this.restart();
		return this.render();
	}
}

new PromptTicTacToe()