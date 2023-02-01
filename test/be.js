backend(); // VSCode Back End environment
const assert = require('assert');
const JMVSC = require('..');
var vw1, vw2, pan2, pan1, fake_in;

describe('backend', function() {
  it('context: backend', function() {
    assert.equal(JMVSC.context(), 'backend');
  });
  it('init', function() {
    JMVSC.init(pan1);
    JMVSC.init(pan2);
    vw1.sendMessage({ type: 'jazz-midi' });
    vw1.sendMessage({ type: 'other' });
  });
  it('new', function() {
    vw1.sendMessage({ type: 'jazz-midi', detail: ['new'] });
  });
  it('refresh', function() {
    vw1.sendMessage({ type: 'jazz-midi', detail: ['refresh'] });
  });
  it('openout', function() {
    vw1.sendMessage({ type: 'jazz-midi', detail: ['openout', 0, 'Not existent'] });
    vw1.sendMessage({ type: 'jazz-midi', detail: ['openout', 0, 'Fake MIDI-Out 1'] });
    vw1.sendMessage({ type: 'jazz-midi', detail: ['openout', 0, 'Fake MIDI-Out 1'] });
    vw1.sendMessage({ type: 'jazz-midi', detail: ['openout', 0, 'Fake MIDI-Out 2'] });
    vw1.sendMessage({ type: 'jazz-midi', detail: ['openout', 1, 'Fake MIDI-Out 1'] });
  });
  it('openin', function() {
    vw1.sendMessage({ type: 'jazz-midi', detail: ['openin', 0, 'Not existent'] });
    vw1.sendMessage({ type: 'jazz-midi', detail: ['openin', 0, 'Fake MIDI-In 1'] });
    vw1.sendMessage({ type: 'jazz-midi', detail: ['openin', 0, 'Fake MIDI-In 1'] });
    vw1.sendMessage({ type: 'jazz-midi', detail: ['openin', 0, 'Fake MIDI-In 2'] });
    vw1.sendMessage({ type: 'jazz-midi', detail: ['openin', 1, 'Fake MIDI-In 1'] });
  });
  it('closeout', function() {
    vw1.sendMessage({ type: 'jazz-midi', detail: ['closeout', 0] });
    vw1.sendMessage({ type: 'jazz-midi', detail: ['closeout', 0] });
  });
  it('closein', function() {
    vw1.sendMessage({ type: 'jazz-midi', detail: ['closein', 0] });
    vw1.sendMessage({ type: 'jazz-midi', detail: ['closein', 0] });
  });
  it('midi', function() {
    fake_in._emit([]);
    fake_in._emit([0x90, 0x60, 0x7f]);
  });
  it('play', function() {
    vw1.sendMessage({ type: 'jazz-midi', detail: ['play', 0, 0x90, 0x60, 0x7f] });
    vw1.sendMessage({ type: 'jazz-midi', detail: ['play', 1, 0x90, 0x60, 0x7f] });
  });
  it('other', function() {
    vw1.sendMessage({ type: 'jazz-midi', detail: ['other'] });
  });
  it('exit', function() {
    pan1.dispose();
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
  vw1 = new VW();
  vw2 = new VW();
  pan1 = new PAN(vw1);
  pan2 = new PAN(vw2);
  global.document = undefined;
  const JZZ = require('jzz');
  fake_in = JZZ.Widget();
  JZZ.addMidiIn('Fake MIDI-In 1', fake_in);
  JZZ.addMidiIn('Fake MIDI-In 2', JZZ.Widget());
  JZZ.addMidiOut('Fake MIDI-Out 1', JZZ.Widget());
  JZZ.addMidiOut('Fake MIDI-Out 2', JZZ.Widget());
}