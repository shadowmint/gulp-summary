import gutil from 'gulp-util';
import {Plugin} from 'gulp-tools';
import path from 'path';

class GulpPlugin extends Plugin {

  constructor() {
    super('gulp-summary');
    this.read = false;
    this.files = [];
  }

  configure(options) {
    this.options = options ? options : {};

    // Generate a file called this
    this.option('filename', 'output.txt');

    // Remove this prefix from filename outputs
    this.option('basePath', './');

    // Run this function on the list of files at the end, and take
    // the result to write to a file.
    this.option('handler', null);

    // Resolve path for abs helpers
    this.options.basePath = path.resolve(this.options.basePath);
    console.log(this.options.basePath);
  }

  handle_file(file, enc) {
    var p = file.path;
    if (p.indexOf(this.options.basePath) == 0) {
      p = p.substr(this.options.basePath.length + path.sep.length);
    }
    this.files.push(p);
  }

  handle_close(target, callback) {
    var output = this.options.handler(this.files);
    this.file(target, this.options.filename, './', './', output);
    callback();
  }
}

export default function handler(opts) {
  return new GulpPlugin().handler()(opts);
}
