const player = require('./player');
const piano = require('./piano');

function activate(context) {
    player.activate(context);
    piano.activate(context);
}

function deactivate() {
    player.deactivate();
    piano.deactivate();
}

module.exports = {
    activate,
    deactivate
}
