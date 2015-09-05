'use strict';

import * as sutils from 'gulp-tools/lib/utils';
import plugin from './index';
import fs from 'fs';
import File from 'vinyl';

export function test_with_buffer(test) {
  test.expect(1);

  var file1 = new File({ path: 'source1.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("Hello") });
  var file2 = new File({ path: 'source2.js', cwd: 'tests/', base: 'tests/', contents: new Buffer("World") });

  var stream = plugin({
    handler: (v) => {
      return JSON.stringify(v);
    }
  });

  sutils.read_from_stream(stream, 'utf-8', function(value) {
    var output = JSON.parse(value);
    test.ok(output.length ==  2);
    test.done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
}

export function test_with_stream(test) {
  test.expect(1);

  var file1 = new File({
    path: 'source1.js',
    cwd: 'tests/',
    base: 'tests/',
    contents: fs.createReadStream('./tests/source1.js')
  });
  var file2 = new File({
    path: 'source2.js',
    cwd: 'tests/',
    base: 'tests/',
    contents: fs.createReadStream('./tests/source2.js')
  });

  var stream = plugin({
    filename: 'foo.txt',
    handler: (v) => {
      return JSON.stringify(v);
    }
  });

  sutils.read_from_stream(stream, 'utf-8', function(value) {
    var output = JSON.parse(value);
    test.ok(output.length == 2);
    test.done();
  });

  stream.write(file1);
  stream.write(file2);
  stream.end();
}

export function test_with_no_options(test) {
  try {
    var stream = plugin();
    test.ok(false); // Unreachable
  }
  catch(err) {
    test.ok(true);
    test.done();
  }
}
