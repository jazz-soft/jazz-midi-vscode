const vscode = require('vscode');

function openCustomDocument(uri, context, token) {
    console.log('running openCustomDocument()');
    return {
        uri: uri,
        dispose: function() {}
    };
}

function resolveCustomEditor(document, panel, token) {
    console.log('running resolveCustomEditor()');
    panel.webview.options = { enableScripts: true };
    panel.webview.html = `<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/jzz"></script>
<script src="https://cdn.jsdelivr.net/npm/jzz-midi-smf"></script>
<script src="https://cdn.jsdelivr.net/npm/jzz-gui-player"></script>
<script src="https://cdn.jsdelivr.net/npm/jzz-synth-tiny"></script>
</head>
<body>
<div id="player"></div>
<script>
JZZ.synth.Tiny.register('Web Audio');
var player = new JZZ.gui.Player('player');
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
