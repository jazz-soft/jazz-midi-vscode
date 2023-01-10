const vscode = require('vscode');


function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('midi-demo.info', function () {
        const panel = vscode.window.createWebviewPanel(
            'helloMidiPlayer', 'MIDI Info',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );
        panel.webview.html =`<!DOCTYPE html>
<html>
<head>
</head>
<body>
<h2>Web View</h2>
<div id="wv"></div>
<script>
var ac = !!window.AudioContext;
var wm = !!navigator.requestMIDIAccess;

var txt = '<p>Web Audio:' + (ac ? '' : ' not') + ' supported</p>';
txt += '<p>Web MIDI:' + (wm ? '' : ' not') + ' supported</p>';
document.getElementById('wv').innerHTML = txt;
</script>
</body>
</html>`;
    }));
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
