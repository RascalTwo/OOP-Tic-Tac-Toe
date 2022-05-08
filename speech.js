class TicTacToeRecognition {
	static POSITIONS = [
		'top left',
		'top center',
		'top right',
		'center left',
		'center center',
		'center right',
		'bottom left',
		'bottom center',
		'bottom right',
	];
	constructor() {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
		const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList

		if (!SpeechRecognition) return alert("You're browser does not support SpeechRecognition!");

		this.recognition = new SpeechRecognition();
		this.recognition.continuous = false;
		this.recognition.lang = 'en-US';
		this.recognition.interimResults = false;
		this.recognition.maxAlternatives = 1;

		const speechRecognitionList = new SpeechGrammarList();
		speechRecognitionList.addFromString('#JSGF V1.0; grammar positions; public <position> = ' + TicTacToeRecognition.POSITIONS.join(' | ') + ' ;', 1);
		this.recognition.grammars = speechRecognitionList;
	}

	getSpeechResult = () => new Promise((resolve, reject) => {
		try {
			this.recognition.start();
		} catch (_) { }

		let result = '';
		this.recognition.onresult = event => result = event.results[0][0].transcript;
		this.recognition.onend = () => resolve(result)
		this.recognition.onnomatch = () => reject("I didn't recognize that word")
		this.recognition.onerror = event => reject('Error occurred in recognition: ' + event.error);
	})
}

class SpeechTicTacToe extends DOMTicTacToe {
	constructor(currentPlayerElement, messageOutput, restartButton, buttons) {
		super(currentPlayerElement, messageOutput, restartButton, buttons);
		this.recognition = new TicTacToeRecognition();
		this.render();
	}

	render() {
		for (let i = 0; i < this._board.length; i++) {
			if (this._board[i]) {
				this.buttons[i].querySelector('div').textContent = this._board[i];
				this.buttons[i].disabled = true;
			} else {
				this.buttons[i].querySelector('div').textContent = ''
				this.buttons[i].disabled = false;
			}
		}

		this.currentPlayerElement.textContent = this.currentPlayer;

		const winner = this.winner;
		if (winner !== undefined) {
			this.buttons.forEach(button => button.disabled = true);
			this.message = winner ? winner + ' won!' : 'Draw!';
		} else if (this.recognition) {
			this.recognition.getSpeechResult().then(word => {
				const index = TicTacToeRecognition.POSITIONS.indexOf(word.toLowerCase().replace(/[-_]/g, ' '))

				if (index === -1) {
					this.message = 'Invalid word: ' + word
				} else {
					this.place(index)
				}
				this.render()
			})
		}

		this.messageOutput.innerHTML = this.message;
	}
}

new SpeechTicTacToe(
	document.querySelector('#current-player'),
	document.querySelector('#message'),
	document.querySelector('footer button'),
	[...document.querySelectorAll('#board button')]
)
