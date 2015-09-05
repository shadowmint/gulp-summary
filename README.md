# gulp-summary

Collects filenames without processing the files and runs a callback to
handle the list of files.

This is particularly useful for generating client side script bundles and
other similar tasks where its tedious to manually write a list of imports
like:

```
import * as foo from './plugins/foo';
import * as foo1 from './plugins/foo1';
import * as foo2 from './plugins/foo2';
import * as foo3 from './plugins/foo3';
import * as foo4 from './plugins/foo4';

...

app.register_plugin(foo);
app.register_plugin(foo1);
app.register_plugin(foo2);
app.register_plugin(foo3);
app.register_plugin(foo4);
```

## Install

```
$ npm install --save-dev shadowmint/gulp-summary#0.0.1
```

## Usage

```
import gulp from 'gulp';
import ejs from 'ejs';
import summary from '..';

gulp.task('default', function() {
  return gulp.src('./src/**/*.js')
    .pipe(summary({
      filename: "out.txt",
      basePath: "./src",
      handler: (v) => {
        return ejs.render(`
          <% for (var i = 0; i < data.length; ++i) { -%>
            <%= data[i] %>
          <% } -%>`, { data: v });
      }
    }))
    .pipe(gulp.dest('./output'));
});
```

### filename

The output filename.

### handler

A function that takes an array of paths to matched files, and returns a
string to output once the stream is complete.

Notice that the objects in the array are paths, not File objects.

### basePath

This is prefix removed from the array of paths returned to the handler.

## License

MIT
