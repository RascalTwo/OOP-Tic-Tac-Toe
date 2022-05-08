class DOMTile {
	constructor(button) {
		this.button = button;
		this._value = ''
	}

	get value() {
		return this._value
	}

	set value(value) {
		this._value = value
		this.button.disabled = !!this.value

		this.render()
	}

	render() {
		this.button.textContent = this.value;
	}
}

class DOMTicTacToe extends TicTacToe {
	constructor(currentPlayerElement, messageOutput, restartButton, tiles) {
		super();

		this.currentPlayerElement = currentPlayerElement;
		this.messageOutput = messageOutput;
		this.restartButton = restartButton;
		this.tiles = tiles;

		this.message = '';

		this.tiles.forEach((tile, i) => tile.button.addEventListener('click', () => this.place(i)));
		this.restartButton.addEventListener('click', () => this.restart());
	}

	place(i) {
		super.place(i);
		this.render();
	}

	restart() {
		this.message = '&nbsp;';
		super.restart();
		this.render();
	}

	render() {
		super.render();

		for (let i = 0; i < this._board.length; i++) {
			this.tiles[i].value = this._board[i] ? this._board[i] : '';
		}

		this.currentPlayerElement.textContent = this.currentPlayer;

		const winner = this.winner;
		if (winner !== undefined) {
			this.tiles.forEach(tile => tile.button.disabled = true);
			this.message = winner ? winner + ' won!' : 'Draw!';
		}

		this.messageOutput.innerHTML = this.message;
	}
}