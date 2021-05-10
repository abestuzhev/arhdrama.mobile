//gulp del gulp-csso gulp-sass browser-sync gulp-autoprefixer gulp-concat

const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const sync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const twig = require('gulp-twig');



function html(){
  return src('./**.html')
    .pipe(sync.stream())
}

function scss(){
  return src('./src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist : ['last 3 versions']
    }))
    .pipe(concat('main.css'))
    .pipe(dest('dist'))
}

function twigTemplate(){
  return src('./templates/**.twig')
    .pipe(
      twig().on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end');
      })
    )
    .pipe(dest('./'))
}


function serve(){
  sync.init({
    port: 8081,
    server: {
      baseDir: './'
    }
  });

  watch('./**.html', series(html)).on('change', sync.reload);
  watch('./templates/**.twig', series(twigTemplate)).on('change', sync.reload);
  watch('./templates/layout/**.twig', series(twigTemplate)).on('change', sync.reload);
  watch('./src/scss/**.scss', series(scss)).on('change', sync.reload);
}

// function clear(){
//   return del('dist');
// }


exports.default = series(scss, twigTemplate, html, serve);
