const vscode = require('vscode');
const JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('midi-demo.scale', function () {
        var data = JZZ.lib.fromBase64('TVRoZAAAAAYAAAABAGBNVHJrAAAARwDAEACQPH9ggDxAAJA+f2CAPkAAkEB/YIBAQACQQX9ggEFAAJBDf2CAQ0AAkEV/YIBFQACQR39ggEdAAJBIf2CASEAA/y8A');
        var smf = JZZ.MIDI.SMF(data);
        var player = smf.player();
        JZZ().or(() => vscode.window.showErrorMessage('Cannot start MIDI engine!'))
            .openMidiOut().or(() => vscode.window.showErrorMessage('Cannot open MIDI Out!'))
            .and(function() { player.connect(this); player.play(); });
        JZZ().openMidiOut().note(0, 60, 127, 1000);
    }));
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
