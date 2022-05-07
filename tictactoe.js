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
		return true;
	}

	restart() {
		this._board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		this._currentPlayer = 'X';
	}

	render() { }
}
