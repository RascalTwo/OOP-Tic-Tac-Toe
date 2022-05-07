const buttons = [...document.querySelectorAll('button')];

let currentPlayer = 'X';


/**
 * @param {MouseEvent} event
 */
function handleButtonClick(event){
	event.currentTarget.textContent = currentPlayer
}

buttons.forEach(button => {
	button.addEventListener('click', handleButtonClick);
})