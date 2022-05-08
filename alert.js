class AlertTicTacToe extends TicTacToe {
	constructor() {
		super();
		this.play()
	}

	toString() {
		const side = this._board.length / 3
		const rows = [
			['-', ...Array.from({ length: side }, (_, i) => i), 'C']
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
		rows.push(['R'])

		return `Current Player: ${this.currentPlayer}\n\n` + rows.map(row => row.join(' | ')).join('\n');
	}

	play(){
		while (this.winner === undefined) {
			let message = 'Enter Row,Column of position to place';
			while (typeof message === 'string') {
				message = this.render(message);
			}
			if (message === null) return alert('Draw!');
			else if (!this.place(message)) message = 'That tile is already full!';
		}

		alert(this.winner ? this.winner + ' won!' : 'Draw!');

		if (!confirm('Play again?')) return;
		this.restart();
		return this.play();
	}

	render(message) {
		super.render();

		const response = prompt(this + '\n\n' + message);
		if (!response) return null;

		const [x, y] = response.split(',').map(part => parseInt(part))
		if (isNaN(x) || isNaN(y)) return 'Must be numbers';
		if (x < 0 || x > 2 || y < 0 || y > 2) return 'Numbers must be between 0 and 2';

		return x * 3 + y;
	}
}

new AlertTicTacToe()