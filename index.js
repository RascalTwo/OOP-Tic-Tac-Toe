const WINNING_INDEXES = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],

	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],

	[0, 4, 8],
	[6, 4, 2]
]

const buttons = [...document.querySelectorAll('button')];
const currentPlayerElement = document.querySelector('#current-player');

let currentPlayer = 'X';


/**
 * @param {MouseEvent} event
 */
function handleButtonClick(event){
	event.currentTarget.textContent = currentPlayer;
	event.currentTarget.disabled = true;
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
	currentPlayerElement.textContent = currentPlayer

	for (const indexes of WINNING_INDEXES){
		const first = buttons[indexes[0]].textContent
		if (first && indexes.every(index => buttons[index].textContent === first)){
			buttons.forEach(button => button.disabled = true)
			return alert(first + ' won!');
		}
	}

	if (buttons.every(button => button.textContent !== '')){
		alert('Draw!')
	}
}

buttons.forEach(button => {
	button.addEventListener('click', handleButtonClick);
})