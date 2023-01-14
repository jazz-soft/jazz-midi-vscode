(function(global, factory) {
  /* istanbul ignore next */
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  }
  else if (typeof define === 'function' && define.amd) {
    define('JMVSC', [], factory);
  }
  else {
    if (!global) global = window;
    if (global.JMVSC && global.JMVSC.MIDI) return;
    global.JMVSC = factory();
  }
})(this, function() {

  var JMVSC = {};
  var webview = false;
  try {
    if (document) webview = true;
  } catch (e) {/**/}
  if (webview) {
    console.log('Initializing jazz-midi-vscode in the webview...');
  }
  else {
    if (require('jazz-midi')) {
      console.log('Initializing jazz-midi-vscode in the back end...');
    }
    else {
      console.log('Initializing jazz-midi-vscode in the web plugin back end...');
    }
  }

  return JMVSC;
});
