const vscode = require('vscode');

var provider = {
    openCustomDocument: openCustomDocument,
    resolveCustomEditor: resolveCustomEditor
};

function openCustomDocument(uri, context, token) {
    console.log('running openCustomDocument()');
}

function resolveCustomEditor(document, panel, token) {
    console.log('running resolveCustomEditor()');
}

function activate(context) {
    console.log('Activating extension!');
    vscode.window.registerCustomEditorProvider('midi-demo.player', provider);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
