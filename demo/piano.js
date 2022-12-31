const vscode = require('vscode');

function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand('midi-demo.piano', function () {
		vscode.window.showInformationMessage('Hello from midi-demo!');
	}));
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}