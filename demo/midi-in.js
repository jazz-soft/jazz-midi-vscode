const vscode = require('vscode');
const JMVSC = require('jazz-midi-vscode');

function activate(context) {
    const extpath = context.extensionPath;
    var panels = {};

    context.subscriptions.push(vscode.commands.registerCommand('midi-demo.midi-in', async function (port) {
        const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
        if (panels[port]) {
            panels[port].reveal(column);
            return;
        }
        panels[port] = vscode.window.createWebviewPanel('midi-demo.midi-in-view', port, column, { enableScripts: true });
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
</head>
<body>
<h1>${port}</h1>
<script>
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
