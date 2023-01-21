backend(); // VSCode Back End environment
const assert = require('assert');
const version = require('../package.json').version;
const JMVSC = require('..');

describe('backend', function() {
  it('initView', function() {
    JMVSC.initView(vw);
  });
});

function VW() {}
function backend() {
  VW.prototype.onDidReceiveMessage = function() {
  }
  global.vw = new VW();
  global.document = undefined;
}