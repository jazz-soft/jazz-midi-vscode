const player = require('./player');
const info = require('./info');
const note = require('./note');
const scale = require('./scale');

function activate(context) {
    player.activate(context);
    info.activate(context);
    note.activate(context);
    scale.activate(context);
}

function deactivate() {
    player.deactivate();
    info.deactivate();
    note.deactivate();
    scale.deactivate();
}

module.exports = {
    activate,
    deactivate
}
