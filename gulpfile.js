const gulp = require('gulp');
const fs = require('fs');
const nunjucks = require('nunjucks');
const gulpnunjucks = require('gulp-nunjucks');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const cssnano = require('gulp-cssnano');
const filter = require('gulp-filter');
const gulpIgnore = require('gulp-ignore');
const gulpif = require('gulp-if');
const markdown = require('nunjucks-markdown');
const marked = require('marked');
const hljs = require('highlight.js');

const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revCss = require('gulp-rev-css-url');
const revDel = require('gulp-rev-delete-original');

const runTimestamp = Math.round(Date.now() / 1000);

const nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('./www/'));
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    langPrefix: 'hljs language-',
    highlight: function(code, lang, callback) {
        return hljs.highlightAuto(code).value;
    }
});

markdown.register(nunjucksEnv, marked);

function loadConfigData() {
    content = fs.readFileSync('./www/_config.js')
    return {
        'config': JSON.parse(content)
    }
}

// Copy all the static assets to the dist folder
gulp.task('static', () =>
    gulp.src(['./www/**/*.html', './www/static/*', './www/static/**/*.!(png|svg|jpg|gif|ico|js|css)', '!./www/_partials/**/*'])
        .pipe(plumber())
        .pipe(gulpif(
            function (file) {
                if (file.isDirectory()) {
                    return false;
                }

                var path = file.path.substring(file.path.indexOf('/www/static/') + 12);
                if (path.indexOf('/') === -1) {
                    return true;
                }

                return file.basename.substr(-5) === '.html'
            },
            gulp.dest('./dist/'),
            gulp.dest('./dist/static')
        ))
        .pipe(browserSync.stream())
)

gulp.task('images', () => 
    gulp.src(['./www/static/images/**/*.+(png|jpg|gif|svg|ico)', '!./www/_partials/**/*'])
        .pipe(plumber())
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            imagemin.gifsicle({interlaced: true})
        ]))
        .pipe(gulp.dest('./dist/static/images/'))
)

// Generate css files from sass
gulp.task('sass', () =>
    gulp.src(['./www/**/*.+(scss|sass)', '!./www/_partials/**/*'])
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/static/'))
        .pipe(browserSync.stream({match: '**/*.css'}))
)

// Compile CSS
gulp.task('css', () =>
    gulp.src(['./www/**/*.css', '!./www/_partials/**/*'])
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulpif(
            function (file) {
                return file.path.indexOf('static') > -1
            },
            gulp.dest('./dist/'),
            gulp.dest('./dist/static')
        ))
        .pipe(browserSync.stream({match: '**/*.css'}))
)

// Generate HTML from nunjucks files
gulp.task('nunjucks', () =>
    gulp.src(['./www/**/*.njk', '!./www/_partials/**/*'])
        .pipe(plumber())
        .pipe(gulpnunjucks.compile(loadConfigData(), {env: nunjucksEnv}))
        .pipe(gulpIgnore.exclude('**/_*.njk'))
        .pipe(gulpif(
            function (file) {
                var filename = file.basename.substr(0, file.basename.indexOf('.')).toLowerCase();
                return ['index', '404'].indexOf(filename) > -1;
            },
            rename(function (path) {
                path.extname = ".html";
            }),
            rename(function (path) {
                path.extname = "/index.html";
            })
        ))
        .pipe(gulp.dest('./dist'))
)

gulp.task('js', () =>
    gulp.src(['./www/**/*.js', '!./www/_config.js', '!./www/_partials/**/*'])
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulpif(
            function (file) {
                return file.path.indexOf('static') > -1
            },
            gulp.dest('./dist/'),
            gulp.dest('./dist/static')
        ))
)

// TODO rev?
gulp.task('rev', () => {
    const assetFilter = filter(['./dist/**/*', '!./dist/**/*.html'], { restore: true });

    return gulp.src('./dist/**')
        .pipe(plumber())
        .pipe(assetFilter)
        .pipe(rev())
        .pipe(revCss())
        .pipe(revDel())
        .pipe(assetFilter.restore)
        .pipe(revRewrite())
        .pipe(gulp.dest('./dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/'))
})

// Clean the dist folder before generating a new one
gulp.task('clean', () =>
    del('./dist/*').then(() =>
        fs.mkdir('./dist', () => {})
    )
)

gulp.task('init', function (done) {
    fs.mkdir('./www', () => {})
    fs.mkdir('./www/static', () => {})
    fs.mkdir('./www/css', () => {})
    fs.mkdir('./www/js', () => {})
    fs.mkdir('./www/images', () => {})
    fs.writeFileSync('./www/index.njk', '')
    fs.writeFileSync('./www/css/general.scss', '')
    fs.writeFileSync('./www/static/robots.txt', '')

    fs.mkdir('./dist', () => {})
    fs.mkdir('./dist', () => {})
    done()
})

gulp.task('build', gulp.series('clean', 'sass', 'css', 'nunjucks', 'js', 'static', 'images', 'rev'))

// Serve the current www folder, compilled (dist)
gulp.task('serve', gulp.series('clean', 'sass', 'css', 'nunjucks', 'js', 'static', 'images', function () {
    gulp.watch('./www/_config.js', gulp.series('nunjucks'))
    gulp.watch('./www/**/*.md', gulp.series('nunjucks'))
    gulp.watch('./www/**/*.njk', gulp.series('nunjucks'))
    gulp.watch('./www/**/*.+(scss|sass)', gulp.series('sass'))
    gulp.watch('./www/**/*.js', gulp.series('js'))
    // gulp.watch('./www/static/icons/*.svg', gulp.series('icons'))
    gulp.watch(['./www/**/*.html', './www/static/**/*.!(png|jpg|gif|svg)', './www/**/*.css'], gulp.series('static'))
    gulp.watch('./www/static/images/**/*.+(png|jpg|gif|svg)', gulp.series('images'))

    browserSync.init({
        server: {
            baseDir: './dist'
        },
        open: false,
        port: 8080
        // host: '77.193.92.35'
    });
}));

// default
gulp.task('default', gulp.series('serve'));
