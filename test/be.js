backend(); // VSCode Back End environment
const assert = require('assert');
const JMVSC = require('..');
var vw, pan, fake_in;

describe('backend', function() {
  it('context: backend', function() {
    assert.equal(JMVSC.context(), 'backend');
  });
  it('init', function() {
    JMVSC.init(pan);
    vw.sendMessage({ type: 'jazz-midi' });
    vw.sendMessage({ type: 'other' });
  });
  it('refresh', function() {
    vw.sendMessage({ type: 'jazz-midi', detail: ['refresh'] });
  });
  it('openout', function() {
    vw.sendMessage({ type: 'jazz-midi', detail: ['openout', 0, 'Not existent'] });
    vw.sendMessage({ type: 'jazz-midi', detail: ['openout', 0, 'Fake MIDI-Out 1'] });
    vw.sendMessage({ type: 'jazz-midi', detail: ['openout', 0, 'Fake MIDI-Out 1'] });
    vw.sendMessage({ type: 'jazz-midi', detail: ['openout', 0, 'Fake MIDI-Out 2'] });
    vw.sendMessage({ type: 'jazz-midi', detail: ['openout', 1, 'Fake MIDI-Out 1'] });
  });
  it('openin', function() {
    vw.sendMessage({ type: 'jazz-midi', detail: ['openin', 0, 'Not existent'] });
    vw.sendMessage({ type: 'jazz-midi', detail: ['openin', 0, 'Fake MIDI-In 1'] });
    vw.sendMessage({ type: 'jazz-midi', detail: ['openin', 0, 'Fake MIDI-In 1'] });
    vw.sendMessage({ type: 'jazz-midi', detail: ['openin', 0, 'Fake MIDI-In 2'] });
    vw.sendMessage({ type: 'jazz-midi', detail: ['openin', 1, 'Fake MIDI-In 1'] });
  });
  it('closeout', function() {
    vw.sendMessage({ type: 'jazz-midi', detail: ['closeout', 0] });
    vw.sendMessage({ type: 'jazz-midi', detail: ['closeout', 0] });
  });
  it('closein', function() {
    vw.sendMessage({ type: 'jazz-midi', detail: ['closein', 0] });
    vw.sendMessage({ type: 'jazz-midi', detail: ['closein', 0] });
  });
  it('midi', function() {
    fake_in._emit([]);
    fake_in._emit([0x90, 0x60, 0x7f]);
  });
  it('play', function() {
    vw.sendMessage({ type: 'jazz-midi', detail: ['play', 0, 0x90, 0x60, 0x7f] });
    vw.sendMessage({ type: 'jazz-midi', detail: ['play', 1, 0x90, 0x60, 0x7f] });
  });
  it('other', function() {
    vw.sendMessage({ type: 'jazz-midi', detail: ['other'] });
  });
  it('exit', function() {
    pan.dispose();
  });
});

function VW() {}
function PAN(v) { this.webview = v; }
function backend() {
  VW.prototype.onDidReceiveMessage = function(f) {
    this.onMsg = f;
  }
  VW.prototype.sendMessage = function(msg) {
    if (this.onMsg) this.onMsg(msg);
  }
  VW.prototype.postMessage = function() {}
  PAN.prototype.onDidDispose = function(f) {
    this.onDis = f;
  }
  PAN.prototype.dispose = function() {
    if (this.onDis) this.onDis();
  }
  vw = new VW();
  pan = new PAN(vw);
  global.document = undefined;
  const JZZ = require('jzz');
  fake_in = JZZ.Widget();
  JZZ.addMidiIn('Fake MIDI-In 1', fake_in);
  JZZ.addMidiIn('Fake MIDI-In 2', JZZ.Widget());
  JZZ.addMidiOut('Fake MIDI-Out 1', JZZ.Widget());
  JZZ.addMidiOut('Fake MIDI-Out 2', JZZ.Widget());
}