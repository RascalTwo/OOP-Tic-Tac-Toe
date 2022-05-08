new DOMTicTacToe(
	document.querySelector('#current-player'),
	document.querySelector('#message'),
	document.querySelector('footer button'),
	Array.from(document.querySelectorAll('#board button'), button => new DOMTile(button))
)
