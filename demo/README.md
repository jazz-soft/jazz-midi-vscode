# midi-demo

## jazz-midi-vscode examples

[![](https://raw.githubusercontent.com/jazz-soft/jazz-midi-vscode/main/demo/demo.png)](https://github.com/jazz-soft/jazz-midi-vscode/tree/main/demo)

## Commands
- (Ctrl-Shift-P) -> `MIDI Demo: Info` - show the Info page (backend/webview)
- (Ctrl-Shift-P) -> `MIDI Demo: Play Note` - play note (backend)
- (Ctrl-Shift-P) -> `MIDI Demo: Play Scale` - play MIDI file (backend)
- open MIDI file in the File Explorer - MIDI Player (webview)

## Run
### Test in VSCode
- `code . &`
- Debug -> Run Extension

### Test Web Extension
- `npm run compile`
- `npm run browser`

### Package/Install
- `npm install -g @vscode/vsce`
- `vsce package`
- `code --install-extension midi-demo-0.0.0.vsix`
