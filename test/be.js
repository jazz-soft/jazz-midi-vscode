backend(); // VSCode Back End environment
const assert = require('assert');
const JMVSC = require('..');
var vw;

describe('backend', function() {
  it('context: backend', function() {
    assert.equal(JMVSC.context(), 'backend');
  });
  it('initView', function() {
    JMVSC.initView(vw);
    vw.sendMessage({ type: 'jazz-midi' });
    vw.sendMessage({ type: 'other' });
  });
  it('refresh', function() {
    vw.sendMessage({ type: 'jazz-midi', detail: ['refresh'] });
  });
  it('other', function() {
    vw.sendMessage({ type: 'jazz-midi', detail: ['other'] });
  });
});

function VW() {}
function backend() {
  VW.prototype.onDidReceiveMessage = function(f) {
    this.hndl = f;
  }
  VW.prototype.sendMessage = function(msg) {
    if (this.hndl) this.hndl(msg);
  }
  VW.prototype.postMessage = function() {}
  vw = new VW();
  global.document = undefined;
  const JZZ = require('jzz');
  JZZ.addMidiIn('Fake MIDI-In', JZZ.Widget());
  JZZ.addMidiOut('Fake MIDI-Out', JZZ.Widget());
}