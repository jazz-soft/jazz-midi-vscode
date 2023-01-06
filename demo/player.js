const vscode = require('vscode');

function openCustomDocument(uri, context, token) {
    return {
        uri: uri,
        dispose: function() {}
    };
}

async function resolveCustomEditor(document, panel, token) {
    

    var data = new Uint8Array(await vscode.workspace.fs.readFile(document.uri));

    panel.webview.options = { enableScripts: true };
    panel.webview.html = `<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/jzz"></script>
<script src="https://cdn.jsdelivr.net/npm/jzz-midi-smf"></script>
<script src="https://cdn.jsdelivr.net/npm/jzz-gui-player"></script>
<script src="https://cdn.jsdelivr.net/npm/jzz-synth-tiny"></script>
<style>
#text { white-space: pre; font-family: monospace; }
</style>
</head>
<body>
<p><div id="player"></div></p>
<p><div id="text"></div></p>

<script>
var data = new Uint8Array([${data}]);
JZZ.synth.Tiny.register('Web Audio');
var player = new JZZ.gui.Player('player');
try {
    var smf = JZZ.MIDI.SMF(data);
    player.load(smf);
    smf = smf.toString();
}
catch (e) {
    smf = e.toString();
}
document.getElementById('text').innerHTML = smf;
</script>
</body>
</html>`;
}

function activate(context) {
    context.subscriptions.push(vscode.window.registerCustomEditorProvider('midi-demo.player', {
        openCustomDocument: openCustomDocument,
        resolveCustomEditor: resolveCustomEditor
    }));
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
