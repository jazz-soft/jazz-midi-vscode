const vscode = require('vscode');
//const JZZ = require('jzz');
//const JMVSC = require('jazz-midi-vscode');

function activate(context) {
    vscode.window.showInformationMessage('Activated!');
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('midi-demo.piano', {
        resolveWebviewView: function(webviewView, context, token) {
            webviewView.webview.html = 'coming soon...';
        }
    }));
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
