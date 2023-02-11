const vscode = require('vscode');
const JMVSC = require('jazz-midi-vscode');

function activate(context) {
    const extpath = context.extensionPath;

    context.subscriptions.push(vscode.window.registerWebviewViewProvider('midi-demo.piano', {
        resolveWebviewView: function(webviewView, context, token) {
            webviewView.webview.options = { enableScripts: true };
            function ref(a, b) {
                return JMVSC.context() == 'backend' ? webviewView.webview.asWebviewUri(vscode.Uri.file(extpath + '/' + a)) : b;
            }
    
            JMVSC.init(webviewView);
            webviewView.webview.html = `<!DOCTYPE html>
            <html>
            <head>
            <script src="${ref('node_modules/jazz-midi-vscode/main.js', 'https://cdn.jsdelivr.net/npm/jazz-midi-vscode')}"></script>
            <script src="${ref('node_modules/jzz/javascript/JZZ.js', 'https://cdn.jsdelivr.net/npm/jzz')}"></script>
            <script src="${ref('node_modules/jzz-input-kbd/javascript/JZZ.input.Kbd.js', 'https://cdn.jsdelivr.net/npm/jzz-input-kbd')}"></script>
            </head>
            <body>
            <p id="piano"></p>
            <script>
            var piano = JZZ.input.Kbd({ at: 'piano', from: 'C5', to: 'B5' });
            </script>
            </body>
            </html>`;
        }
    }));
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
