const piano = require('./piano');

function activate(context) {
	piano.activate(context);
}

function deactivate() {
	piano.deactivate();
}

module.exports = {
	activate,
	deactivate
}
