const vscode = require('vscode');
const JMVSC = require('jazz-midi-vscode');

function activate(context) {
    const extpath = context.extensionPath;
    var panels = {};

    context.subscriptions.push(vscode.commands.registerCommand('midi-demo.midi-out', async function (port) {
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        if (panels[port]) {
            panels[port].reveal(column);
            return;
        }
        panels[port] = vscode.window.createWebviewPanel('midi-demo.midi-out-view', port, column, { enableScripts: true });
        panels[port].onDidDispose(() => { delete panels[port]; }, null, context.subscriptions);
        function ref(a, b) {
            return JMVSC.context() == 'backend' ? panels[port].webview.asWebviewUri(vscode.Uri.file(extpath + '/' + a)) : b;
        }
       JMVSC.init(panels[port]);

       panels[port].webview.html =`<!DOCTYPE html>
<html>
<head>
<script src="${ref('node_modules/jazz-midi-vscode/main.js', 'https://cdn.jsdelivr.net/npm/jazz-midi-vscode')}"></script>
<script src="${ref('node_modules/jzz/javascript/JZZ.js', 'https://cdn.jsdelivr.net/npm/jzz')}"></script>
<script src="${ref('node_modules/jzz-input-kbd/javascript/JZZ.input.Kbd.js', 'https://cdn.jsdelivr.net/npm/jzz-input-kbd')}"></script>
</head>
<body>
<h1>${port}</h1>
<p id="piano"></p>
<script>
var piano = JZZ.input.Kbd({ at: 'piano', from: 'C5', to: 'B5' });
var port = JZZ().openMidiOut('${port}').or(() => log.innerHTML = 'Cannot open port!');
piano.connect(port);
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
