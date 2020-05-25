const exclamations = [
	'Yay!',
	'Yee-haw!',
	'Boo-yah!',
	'Olé',
	'Mh-hmm',
	'Yep',
	'Right on!',
]

function cheering() {
	return exclamations[Math.floor(Math.random() * (exclamations.length - 1) + 1)]
}

export default cheering
