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

let currentPlayer = 'X';


/**
 * @param {MouseEvent} event
 */
function handleButtonClick(event){
	event.currentTarget.textContent = currentPlayer;
	event.currentTarget.disabled = true;
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

	for (const indexes of WINNING_INDEXES){
		const first = buttons[indexes[0]].textContent
		if (first && indexes.every(index => buttons[index].textContent === first)){
			return alert(first + ' won!');
		}
	}
}

buttons.forEach(button => {
	button.addEventListener('click', handleButtonClick);
})