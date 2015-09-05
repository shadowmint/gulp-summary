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
