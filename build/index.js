'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = handler;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpTools = require('gulp-tools');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var GulpPlugin = (function (_Plugin) {
  _inherits(GulpPlugin, _Plugin);

  function GulpPlugin() {
    _classCallCheck(this, GulpPlugin);

    _get(Object.getPrototypeOf(GulpPlugin.prototype), 'constructor', this).call(this, 'gulp-summary');
    this.read = false;
    this.files = [];
  }

  _createClass(GulpPlugin, [{
    key: 'configure',
    value: function configure(options) {
      this.options = options ? options : {};

      // Generate a file called this
      this.option('filename', 'output.txt');

      // Remove this prefix from filename outputs
      this.option('basePath', './');

      // Run this function on the list of files at the end, and take
      // the result to write to a file.
      this.option('handler', null);

      // Resolve path for abs helpers
      this.options.basePath = _path2['default'].resolve(this.options.basePath);
      console.log(this.options.basePath);
    }
  }, {
    key: 'handle_file',
    value: function handle_file(file, enc) {
      var p = file.path;
      if (p.indexOf(this.options.basePath) == 0) {
        p = p.substr(this.options.basePath.length + _path2['default'].sep.length);
      }
      this.files.push(p);
    }
  }, {
    key: 'handle_close',
    value: function handle_close(target, callback) {
      var output = this.options.handler(this.files);
      this.file(target, this.options.filename, './', './', output);
      callback();
    }
  }]);

  return GulpPlugin;
})(_gulpTools.Plugin);

function handler(opts) {
  return new GulpPlugin().handler()(opts);
}

module.exports = exports['default'];