'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.test_with_buffer = test_with_buffer;
exports.test_with_stream = test_with_stream;
exports.test_with_no_options = test_with_no_options;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _gulpToolsLibUtils = require('gulp-tools/lib/utils');

var sutils = _interopRequireWildcard(_gulpToolsLibUtils);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _vinyl = require('vinyl');

var _vinyl2 = _interopRequireDefault(_vinyl);

function test_with_buffer(test) {
  test.expect(1);

  var file1 = new _vinyl2['default']({ path: 'source1.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("Hello") });
  var file2 = new _vinyl2['default']({ path: 'source2.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("World") });

  var stream = (0, _index2['default'])({
    handler: function handler(v) {
      return JSON.stringify(v);
    }
  });

  sutils.read_from_stream(stream, 'utf-8', function (value) {
    var output = JSON.parse(value);
    test.ok(output.length == 2);
    test.done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
}

function test_with_stream(test) {
  test.expect(1);

  var file1 = new _vinyl2['default']({
    path: 'source1.js',
    cwd: 'tests/',
    base: 'tests/',
    contents: _fs2['default'].createReadStream('./tests/source1.js')
  });
  var file2 = new _vinyl2['default']({
    path: 'source2.js',
    cwd: 'tests/',
    base: 'tests/',
    contents: _fs2['default'].createReadStream('./tests/source2.js')
  });

  var stream = (0, _index2['default'])({
    filename: 'foo.txt',
    handler: function handler(v) {
      return JSON.stringify(v);
    }
  });

  sutils.read_from_stream(stream, 'utf-8', function (value) {
    var output = JSON.parse(value);
    test.ok(output.length == 2);
    test.done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
}

function test_with_no_options(test) {
  try {
    var stream = (0, _index2['default'])();
    test.ok(false); // Unreachable
  } catch (err) {
    test.ok(true);
    test.done();
  }
}