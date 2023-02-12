const vscode = require('vscode');
const JZZ = require('jzz');

function activate(context) {
    const extpath = context.extensionPath;
    context.subscriptions.push(vscode.window.registerTreeDataProvider('midi-demo.tree', {
        getChildren: async function(item) {
            if (!item) {
                return [
                    { label: 'MIDI-Out', tooltip: 'MIDI-Out ports' },
                    { label: 'MIDI-In', tooltip: 'MIDI-In ports' }
                ];
            }
        },
        getTreeItem: function(item) {
            return item;
        }
    }));
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
