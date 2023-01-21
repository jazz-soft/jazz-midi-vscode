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

  var _ver = '0.0.4';
  var JMVSC = { version: function() { return _ver; } };
  var webview = false;
  try {
    if (document) webview = true;
  } catch (e) {/**/}
  if (webview) {
    const vscode = acquireVsCodeApi();
    document.addEventListener('jazz-midi', function(msg) {
      vscode.postMessage({ type: 'jazz-midi', detail: msg.detail });
    });
    window.addEventListener('message', function(msg) {
      if (msg.data.type == 'jazz-midi-msg') {
        document.dispatchEvent(new CustomEvent(msg.data.type, { detail: msg.data.detail }));
      }
    });
  }
  else {
    if (require('jazz-midi')) {
      var JZZ = require('jzz');
      JMVSC.initView = function(vw) {
        vw.onDidReceiveMessage(function(msg) {
          //console.log('JMVSC received message:', msg);
          var i;
          if (msg.type == 'jazz-midi') {
            if (!msg.detail) {
              vw.postMessage({ type: 'jazz-midi-msg', detail: ['version', 0, _ver] });
            }
            else if (msg.detail[0] == 'refresh') {
              JZZ().refresh().and(function() {
                var info = this.info();
                var ins = [];
                var outs = [];
                for (i = 0; i < info.inputs.length; i++) {
                  ins.push({ name: info.inputs[i].name, manufacturer: info.inputs[i].manufacturer, version: info.inputs[i].version });
                }
                for (i = 0; i < info.outputs.length; i++) {
                  outs.push({ name: info.outputs[i].name, manufacturer: info.outputs[i].manufacturer, version: info.outputs[i].version });
                }
                vw.postMessage({ type: 'jazz-midi-msg', detail: ['refresh', { ins: ins, outs: outs }] });
              });
            }
          }
        });
      }
    }
    else {
      JMVSC.initView = function() {};
    }
  }

  return JMVSC;
});
