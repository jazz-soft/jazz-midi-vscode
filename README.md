# jazz-midi-vscode

[![npm](https://img.shields.io/npm/v/jazz-midi-vscode.svg)](https://www.npmjs.com/package/jazz-midi-vscode)
[![npm](https://img.shields.io/npm/dt/jazz-midi-vscode.svg)](https://www.npmjs.com/package/jazz-midi-vscode)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/jzz-synth-osc/badge)](https://www.jsdelivr.com/package/npm/jazz-midi-vscode)
[![build](https://github.com/jazz-soft/jazz-midi-vscode/actions/workflows/build.yml/badge.svg)](https://github.com/jazz-soft/jazz-midi-vscode/actions)
[![Coverage Status](https://coveralls.io/repos/github/jazz-soft/jazz-midi-vscode/badge.svg?branch=main)](https://coveralls.io/github/jazz-soft/jazz-midi-vscode?branch=main)

## MIDI for VSCode

Enable MIDI in your VSCode extensions.

[![](https://raw.githubusercontent.com/jazz-soft/jazz-midi-vscode/main/demo/demo.png)](https://github.com/jazz-soft/jazz-midi-vscode/tree/main/demo)

## Usage
( see the [Demo Project](https://github.com/jazz-soft/jazz-midi-vscode/tree/main/demo) above... )

### Backend

```js
const JZZ = require('jzz');
// jazz-midi-vscode is not required for the Backend
// ...
JZZ().openMidiOut() // ...
```
Backend sees all MIDI ports that would be available in normal node application.  
It can also create virtual MIDI ports.

### WebView

```html
<script src="path/to/node_modules/jazz-midi-vscode/main.js"></script>
<script src="path/to/node_modules/jzz/javascript/JZZ.js"></script>
// ...
JZZ().openMidiOut() // ...
```
```js
// when creating the WebView:
const JMVSC = require('jazz-midi-vscode');
// ...
panel = vscode.window.createWebviewPanel( ..., { enableScripts: true });
JMVSC.init(panel);
panel.webview.html = `...`;
// ...
```
WebView will see all MIDI ports (including virtual) available to the backend.  
It can create additional Web Audio and HTML-based MIDI ports
(see [jzz-synth-tiny](https://github.com/jazz-soft/JZZ-synth-Tiny) and [jzz-input-kbd](https://github.com/jazz-soft/JZZ-input-Kbd)).