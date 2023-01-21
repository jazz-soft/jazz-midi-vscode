webview(); // VSCode WebView environment
const assert = require('assert');
const version = require('../package.json').version;
const JMVSC = require('..');

describe('webview', function() {
  it('version ' + version, function() {
    assert.equal(JMVSC.version(), version);
  });
  it('event: web-midi', function() {
    document.dispatchEvent(new CustomEvent('jazz-midi'));
  });
  it('event: web-midi-msg', function() {
    window.dispatchEvent({ type: 'message', data: { type: 'jazz-midi-msg' } });
  });
  it('event: other', function() {
    window.dispatchEvent({ type: 'message', data: { type: 'other' } });
  });
});

function DOC() {
  this.lst = [];
}
function WIN() {
  this.lst = [];
}
function CustomEvent(t, d) {
  this.type = t;
  this.detail = d;
}
function VSC() {}
function webview() {
  DOC.prototype.addEventListener = function(t, f) {
    this.lst.push([t, f]);
  }
  DOC.prototype.dispatchEvent = function(evt) {
    for (var h of this.lst) if (h[0] == evt.type) h[1](evt);
  }
  WIN.prototype.addEventListener = function(t, f) {
    this.lst.push([t, f]);
  }
  WIN.prototype.dispatchEvent = function(evt) {
    for (var h of this.lst) if (h[0] == evt.type) h[1](evt);
  }
  VSC.prototype.postMessage = function() {
  }
  global.document = new DOC();
  global.window = new WIN();
  global.vscode = new VSC();
  global.CustomEvent = CustomEvent;
  global.acquireVsCodeApi = function() { return vscode; };
}