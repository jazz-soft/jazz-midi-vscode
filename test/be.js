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
  });
});

function VW() {}
function backend() {
  VW.prototype.onDidReceiveMessage = function() {
  }
  vw = new VW();
  global.document = undefined;
}