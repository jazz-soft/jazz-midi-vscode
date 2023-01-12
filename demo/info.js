const vscode = require('vscode');
const JZZ = require('jzz');

var panel;

function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('midi-demo.info', async function () {
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        if (panel) {
            panel.reveal(column);
            return;
        }
        panel = vscode.window.createWebviewPanel('midi-demo.info-view', 'MIDI Info', column, { enableScripts: true });
        panel.onDidDispose(() => { panel = undefined; }, null, context.subscriptions);
        var info = await JZZ().info();
        var inputs = 'none';
        var outputs = 'none';
        if (info.inputs.length) {
            inputs = '';
            for (var x of info.inputs) {
                if (inputs) inputs += '; ';
                inputs += x.name;
            }
        }
        if (info.outputs.length) {
            outputs = '';
            for (var x of info.outputs) {
                if (outputs) outputs += '; ';
                outputs += x.name;
            }
        }
        panel.webview.html =`<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/jzz"></script>
<script src="https://cdn.jsdelivr.net/npm/jzz-synth-tiny"></script>
<script src="https://cdn.jsdelivr.net/npm/jzz-input-kbd"></script>
</head>
<body>
<h2>Back End</h2>
<div>Web Audio: not supported</div>
<div>Web MIDI: not supported</div>
<div>MIDI engine: ${info.engine}</div>
<div>MIDI outputs: ${outputs}</div>
<div>MIDI inputs: ${inputs}</div>
<h2>Web View</h2>
<div>Web Audio: <span id="wvwa">not supported<span></div>
<div>Web MIDI: <span id="wvwm">not supported<span></div>
<div>MIDI engine: <span id="wvjzz">none<span></div>
<div>MIDI outputs: <span id="wvout">none<span></div>
<div>MIDI inputs: <span id="wvin">none<span></div>
<p id="piano"></p>
<script>
try {
    if (window.AudioContext) document.getElementById('wvwa').innerHTML = 'supported';
} catch (e) {}
try {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(function() {
            document.getElementById('wvwm').innerHTML = 'available';
        }, function(x) {
            document.getElementById('wvwm').innerHTML = 'disabled';
        });
    }
} catch (e) {}
JZZ.synth.Tiny.register('Web Audio');
JZZ.input.Kbd.register('HTML Piano', { at: 'piano', from: 'C5', to: 'B5' });
var midiin, midiout;
JZZ().and(function() {
    var info = this.info();
    midiin = JZZ().openMidiIn('HTML Piano');
    midiout = JZZ().openMidiOut('Web Audio');
    midiin.connect(midiout);
    var outputs = 'none';
    if (info.inputs.length) {
        inputs = '';
        for (var x of info.inputs) {
            if (inputs) inputs += '; ';
            inputs += x.name;
        }
    }
    if (info.outputs.length) {
        outputs = '';
        for (var x of info.outputs) {
            if (outputs) outputs += '; ';
            outputs += x.name;
        }
    }
    document.getElementById('wvin').innerHTML = inputs;
    document.getElementById('wvout').innerHTML = outputs;
})
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
