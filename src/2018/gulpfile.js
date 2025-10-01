"use strict"

// import
import gulp from "gulp"
import source from "vinyl-source-stream"
import gulpSass from "gulp-sass"
import * as dartSass from "sass"
import sassGlob from "gulp-sass-glob"
import postcss from "gulp-postcss"
import postcssPresetEnv from "postcss-preset-env"
import browserify from "browserify"
import babelify from "babelify"
import pug from "gulp-pug"
import yaml from "js-yaml"
import browserSync from "browser-sync"
import fs from "fs"
import path from "path"
import { createRequire } from "module"
const requireC = createRequire(import.meta.url)
import watch from "gulp-watch"

// const
const SRC = "./src"
const CONFIG = "./src/config"
const HTDOCS = "../../docs/2018"
const BASE_PATH = ""
const DEST = `${HTDOCS}${BASE_PATH}`

// css
gulp.task("copy-bower-css", () => {
  return Promise.resolve()
})

gulp.task("copy-reset-css", () => {
  return gulp
    .src(["reset.css/reset.css"], { cwd: "node_modules", allowEmpty: true })
    .pipe(gulp.dest(`${DEST}/css/node_modules/reset.css`))
})

const sassCompiler = gulpSass(dartSass)

gulp.task("sass", () => {
  let config = {}
  // use postcss-preset-env with default config (it reads browserslist from package.json)
  const processors = [postcssPresetEnv()]

  return gulp
    .src(`${SRC}/scss/style.scss`)
    .pipe(sassGlob())
    .pipe(
      sassCompiler({
        quietDeps: true,
      }).on("error", sassCompiler.logError)
    )
    .pipe(postcss(processors))
    .pipe(gulp.dest(`${DEST}/css`))
})

// css task: build sass and copy dependent css files
gulp.task(
  "css",
  gulp.series("sass", gulp.parallel("copy-bower-css", "copy-reset-css"))
)

// js
gulp.task("copy-bower-js", () => {
  return gulp
    .src(
      [
        "jquery/dist/jquery.min.js",
        "jquery/dist/jquery.min.map",
        "lodash/lodash.min.js",
      ],
      {
        cwd: "node_modules",
      }
    )
    .pipe(gulp.dest(`${DEST}/js/lib`))
})
// also copy our local vendor scripts (ga, fb-sdk, gplus loader)
gulp.task("copy-local-vendor-js", () => {
  return gulp
    .src([`${SRC}/js/vendor/**/*.js`])
    .pipe(gulp.dest(`${DEST}/js/vendor`))
})

gulp.task("browserify", () => {
  return browserify(`${SRC}/js/script.js`, { debug: true })
    .transform(babelify, {
      presets: [requireC.resolve("@babel/preset-env")],
      plugins: [requireC.resolve("@babel/plugin-transform-modules-commonjs")],
      sourceMaps: true,
      global: true,
    })
    .bundle()
    .pipe(source("script.js"))
    .pipe(gulp.dest(`${DEST}/js`))
})

// gulp.task("minify", () => {
//   return gulp
//     .src(`${DEST}/js/script.js`)
//     .pipe(
//       uglify({
//         preserveComments: "license",
//       })
//     )
//     .pipe(rename("script.min.js"))
//     .pipe(gulp.dest(`${DEST}/js`))
// })

// gulp.task("deco", () => {
//   return gulp
//     .src(`${DEST}/js/script.js`)
//     .pipe(
//       decodecode({
//         preserveComments: "license",
//         decoArr: ["恵", "大", "毘", "弁", "布", "福", "寿"],
//       })
//     )
//     .pipe(rename("script.deco.js"))
//     .pipe(gulp.dest(`${DEST}/js`))
// })

// gulp.task 'js', gulp.parallel('browserify', 'copy-bower-js')
gulp.task(
  "js",
  gulp.series(
    gulp.parallel("browserify", "copy-bower-js", "copy-local-vendor-js")
    // gulp.parallel("minify", "deco")
  )
)

// html
gulp.task("pug", () => {
  let meta = {}
  try {
    const metaPath = path.join(CONFIG, "meta.yml")
    if (fs.existsSync(metaPath)) {
      const raw = fs.readFileSync(metaPath, "utf8")
      const parsed = yaml.load(raw)
      meta = parsed && typeof parsed === "object" ? parsed : {}
    }
  } catch (e) {
    console.warn("Could not read meta.yml, using empty meta", e)
    meta = {}
  }

  const locals = {
    meta: meta,
    versions: {},
  }

  // match all pug files but exclude partials/underscored files. Using two patterns
  // avoids issues with character classes being interpreted differently by shells
  return gulp
    .src([`${SRC}/pug/**/*.pug`, `!${SRC}/pug/**/_*.pug`])
    .pipe(
      pug({
        locals: locals,
        pretty: true,
        basedir: `${SRC}/pug`,
      })
    )
    .pipe(gulp.dest(`${DEST}`))
})

gulp.task("html", gulp.series("pug"))

gulp.task("browser-sync", () => {
  browserSync({
    server: {
      baseDir: HTDOCS,
    },
    startPath: BASE_PATH,
    ghostMode: false,
  })

  watch([`${SRC}/scss/**/*.scss`], gulp.series("sass", browserSync.reload))
  watch([`${SRC}/js/**/*.js`], gulp.series("js", browserSync.reload))
  watch(
    [`${SRC}/pug/**/*.pug`, `${SRC}/config/meta.yml`],
    gulp.series("pug", browserSync.reload)
  )

  // always watch built assets and trigger pug rebuild + reload
  gulp.watch(
    [`${DEST}/css/**`, `${DEST}/js/**`],
    gulp.series("pug", bs => {
      browserSync.reload()
      return Promise.resolve()
    })
  )
})

gulp.task("serve", gulp.series("browser-sync"))

gulp.task("build", gulp.parallel("css", "js", "html"))
gulp.task("default", gulp.series("build", "serve"))
