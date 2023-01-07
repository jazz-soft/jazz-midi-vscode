const player = require('./player');
const piano = require('./piano');
const note = require('./note');

function activate(context) {
    player.activate(context);
    piano.activate(context);
    note.activate(context);
}

function deactivate() {
    player.deactivate();
    piano.deactivate();
    note.deactivate();
}

module.exports = {
    activate,
    deactivate
}
