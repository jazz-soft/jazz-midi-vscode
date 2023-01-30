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

  var _ver = '0.1.1';
  var _env = 'webextension';
  var JMVSC = {
    version: function() { return _ver; },
    context: function() { return _env; }
  };
  var webview = false;
  try {
    if (document) webview = true;
  } catch (e) {/**/}
  if (webview) {
    _env = 'webview';
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
      _env = 'backend';
    }
    var JZZ = require('jzz');
    var CLs = [];
    var client = function(pan, n) {
      var c;
      for (c of CLs) if (c.pan == pan && c.n == n) return c;
      c = { pan: pan, n: n };
      CLs.push(c);
      return c;
    }
    JMVSC.init = function(pan) {
      var vw = pan.webview;
      vw.onDidReceiveMessage(function(msg) {
        var i, c, p, s;
        if (msg.type == 'jazz-midi') {
          if (!msg.detail || msg.detail[0] == 'version') {
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
          else if (msg.detail[0] == 'openout') {
            c = client(pan, msg.detail[1]);
            p = c.out;
            s = p ? p.name() : '';
            if (s == msg.detail[2]) {
              vw.postMessage({ type: 'jazz-midi-msg', detail: ['openout', msg.detail[1], msg.detail[2]] });
              return;
            }
            JZZ().openMidiOut(msg.detail[2]).then(function() {
              c.out = this;
              if (p) p.close();
              vw.postMessage({ type: 'jazz-midi-msg', detail: ['openout', msg.detail[1], msg.detail[2]] });
            }, function() {
              vw.postMessage({ type: 'jazz-midi-msg', detail: ['openout', msg.detail[1], s] });
            });
          }
          else if (msg.detail[0] == 'openin') {
            c = client(pan, msg.detail[1]);
            p = c.in;
            s = p ? p.name() : '';
            if (s == msg.detail[2]) {
              vw.postMessage({ type: 'jazz-midi-msg', detail: ['openin', msg.detail[1], msg.detail[2]] });
              return;
            }
            JZZ().openMidiIn(msg.detail[2]).then(function() {
              c.in = this;
              if (p) p.close();
              vw.postMessage({ type: 'jazz-midi-msg', detail: ['openin', msg.detail[1], msg.detail[2]] });
              c.in.connect(function(midi) {
                if (midi.length) vw.postMessage({ type: 'jazz-midi-msg', detail: ['midi', msg.detail[1], 0].concat(midi.slice()) });
              });
            }, function() {
              vw.postMessage({ type: 'jazz-midi-msg', detail: ['openin', msg.detail[1], s] });
            });
          }
          else if (msg.detail[0] == 'closeout') {
            c = client(pan, msg.detail[1]);
            if (c.out) c.out.close();
            delete c.out;
          }
          else if (msg.detail[0] == 'closein') {
            c = client(pan, msg.detail[1]);
            if (c.in) c.in.close();
            delete c.in;
          }
          else if (msg.detail[0] == 'play') {
            c = client(pan, msg.detail[1]);
            if (c.out) c.out.send(msg.detail.slice(2));
          }
        }
      });
      pan.onDidDispose(function() {
        var CC = [];
        var c;
        for (c of CLs) {
          if (c.pan == pan) {
            if (c.out) c.out.close();
            if (c.in) c.in.close();
          }
          else {
            CC.push(c);
          }
        }
        CLs = CC;
      });
    }
  }

  return JMVSC;
});
