class TicTacToe {
	static WINNING_INDEXES = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],

		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],

		[0, 4, 8],
		[6, 4, 2]
	]

	constructor() {
		this._board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		this._currentPlayer = 'X';
	}

	get currentPlayer() {
		return this._currentPlayer
	}

	get winner() {
		for (const indexes of TicTacToe.WINNING_INDEXES) {
			const first = this._board[indexes[0]]
			if (first && indexes.every(index => this._board[index] === first)) {
				return first;
			}
		}
		if (this._board.every(value => value !== 0)) {
			return null
		}

		return undefined
	}

	place(i) {
		const value = this._board[i];
		if (value) return false;
		this._board[i] = this._currentPlayer;
		this._currentPlayer = this._currentPlayer === 'X' ? 'O' : 'X';
		this.render()
		return true;
	}

	render() { }
}

class DOMTicTacToe extends TicTacToe {
	constructor(currentPlayerElement, buttons) {
		super();

		this.currentPlayerElement = currentPlayerElement;
		this.buttons = buttons;

		this.buttons.forEach((button, i) => button.addEventListener('click', this.place.bind(this, i)));
	}

	render() {
		for (let i = 0; i < this._board.length; i++) {
			if (!this._board[i]) continue;
			this.buttons[i].textContent = this._board[i];
			this.buttons[i].disabled = true;
		}

		this.currentPlayerElement.textContent = this.currentPlayer;

		const winner = this.winner;
		if (winner === undefined) return;
		this.buttons.forEach(button => button.disabled = true);
		alert(winner ? winner + ' won!' : 'Draw!');
	}
}

new DOMTicTacToe(document.querySelector('#current-player'), [...document.querySelectorAll('button')])
