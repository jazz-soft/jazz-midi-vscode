const assert = require('assert');
const version = require('../package.json').version;
const JMVSC = require('..');

describe('version ' + version, function() {
  it('version', function() {
    assert.equal(JMVSC.version(), version);
  });
});

