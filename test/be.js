backend(); // VSCode Back End environment
const JMVSC = require('..');
var vw;

describe('backend', function() {
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