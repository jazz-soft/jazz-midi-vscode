const vscode = require('vscode');
const JZZ = require('jzz');

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('midi-demo.note', function () {
        JZZ().or(() => vscode.window.showErrorMessage('Cannot start MIDI engine!'))
            .openMidiOut().or(() => vscode.window.showErrorMessage('Cannot open MIDI Out!'))
            .note(0, 60, 127, 1000);
    }));
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
