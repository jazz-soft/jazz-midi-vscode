const vscode = require('vscode');
const JMVSC = require('jazz-midi-vscode');

var extpath;

function openCustomDocument(uri, context, token) {
    return {
        uri: uri,
        dispose: function() {}
    };
}

async function resolveCustomEditor(document, panel, token) {

    var data = new Uint8Array(await vscode.workspace.fs.readFile(document.uri));

    panel.webview.options = { enableScripts: true };
    function ref(a, b) {
        return JMVSC.context() == 'backend' ? panel.webview.asWebviewUri(vscode.Uri.file(extpath + '/' + a)) : b;
    }
    JMVSC.initView(panel.webview);

    panel.webview.html = `<!DOCTYPE html>
<html>
<head>
<script src="${ref('node_modules/jazz-midi-vscode/main.js', 'https://cdn.jsdelivr.net/npm/jazz-midi-vscode')}"></script>
<script src="${ref('node_modules/jzz/javascript/JZZ.js', 'https://cdn.jsdelivr.net/npm/jzz')}"></script>
<script src="${ref('node_modules/jzz-midi-smf/javascript/JZZ.midi.SMF.js', 'https://cdn.jsdelivr.net/npm/jzz-midi-smf')}"></script>
<script src="${ref('node_modules/jzz-gui-player/javascript/JZZ.gui.Player.js', 'https://cdn.jsdelivr.net/npm/jzz-gui-player')}"></script>
<script src="${ref('node_modules/jzz-synth-tiny/javascript/JZZ.synth.Tiny.js', 'https://cdn.jsdelivr.net/npm/jzz-synth-tiny')}"></script>
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
    extpath = context.extensionPath;
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
