const vscode = require('vscode');
const JZZ = require('jzz');
const player = require('./player');
const info = require('./info');
const note = require('./note');
const scale = require('./scale');
const piano = require('./piano');
const tree = require('./tree');
var tick;

function activate(context) {
    var needMsg = true;
    var vmOut = JZZ.Widget();
    vmOut.connect(function(msg) {
        if (needMsg) {
            vscode.window.showInformationMessage('"Virtual MIDI-Out" outputs MIDI messages to the console.');
            needMsg = false;
        }
        console.log(msg.toString());
    });
    var vmIn = JZZ.Widget();
    var n;
    tick = setInterval(function() {
        if (n) {
            vmIn.noteOff(0, n);
            n = undefined;
        }
        else {
            n = Math.floor(Math.random() * 12) + 60;
            vmIn.noteOn(0, n, 127);
        }
    }, 500);
    JZZ.addMidiOut('Virtual MIDI-Out', vmOut);
    JZZ.addMidiIn('Virtual MIDI-In', vmIn);

    player.activate(context);
    info.activate(context);
    note.activate(context);
    scale.activate(context);
    piano.activate(context);
    tree.activate(context);
}

function deactivate() {
    clearInterval(tick);
    player.deactivate();
    info.deactivate();
    note.deactivate();
    scale.deactivate();
    piano.deactivate();
    tree.deactivate();
}

module.exports = {
    activate,
    deactivate
}
