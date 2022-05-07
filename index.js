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

	place(i){
		super.place(i);
		this.render();
	}

	restart(){
		this.message = '&nbsp;';
		super.restart();
		this.render();
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
