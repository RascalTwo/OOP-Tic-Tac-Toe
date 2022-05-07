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
	];

	constructor() {
		this._board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		this._currentPlayer = 'X';
	}

	get currentPlayer() {
		return this._currentPlayer;
	}

	get winner() {
		for (const indexes of TicTacToe.WINNING_INDEXES) {
			const first = this._board[indexes[0]];
			if (first && indexes.every(index => this._board[index] === first)) {
				return first;
			}
		}
		if (this._board.every(value => value !== 0)) {
			return null;
		}

		return undefined;
	}

	place(i) {
		const value = this._board[i];
		if (value) return false;
		this._board[i] = this._currentPlayer;
		this._currentPlayer = this._currentPlayer === 'X' ? 'O' : 'X';
		this.render();
		return true;
	}

	restart() {
		this._board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		this._currentPlayer = 'X';
		this.render();
	}

	render() { }
}

class DOMTicTacToe extends TicTacToe {
	constructor(currentPlayerElement, messageOutput, restartButton, buttons) {
		super();

		this.currentPlayerElement = currentPlayerElement;
		this.messageOutput = messageOutput;
		this.restartButton = restartButton;
		this.buttons = buttons;

		this.message = '';

		this.buttons.forEach((button, i) => button.addEventListener('click', this.place.bind(this, i)));
		this.restartButton.addEventListener('click', this.restart.bind(this));
	}

	restart(){
		this.message = '&nbsp;';
		super.restart();
	}

	render() {
		super.render();

		for (let i = 0; i < this._board.length; i++) {
			if (this._board[i]) {
				this.buttons[i].textContent = this._board[i];
				this.buttons[i].disabled = true;
			} else {
				this.buttons[i].textContent = ''
				this.buttons[i].disabled = false;
			}
		}

		this.currentPlayerElement.textContent = this.currentPlayer;

		const winner = this.winner;
		if (winner !== undefined) {
			this.buttons.forEach(button => button.disabled = true);
			this.message = winner ? winner + ' won!' : 'Draw!';
		}

		this.messageOutput.innerHTML = this.message;
	}
}

new DOMTicTacToe(
	document.querySelector('#current-player'),
	document.querySelector('#message'),
	document.querySelector('footer button'),
	[...document.querySelectorAll('#board button')]
)
