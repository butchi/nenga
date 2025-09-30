import { src, dest, watch, series, parallel } from "gulp"
import gulpSass from "gulp-sass"
import * as sass from "sass"
import sassGlob from "gulp-sass-glob"
import pug from "gulp-pug"
import rename from "gulp-rename"
import browserSync from "browser-sync"
import readConfig from "read-config"
import source from "vinyl-source-stream"
import browserify from "browserify"
import babelify from "babelify"
import { finished } from "stream/promises"
import fs from "fs"
import path from "path"

// Initialize gulp-sass with Dart Sass
const sassCompiler = gulpSass(sass)

// Constants
const SRC = "./src"
const CONFIG = "./src/config"
const HTDOCS = "../../docs/2017"
const BASE_PATH = ""
const DEST = `${HTDOCS}${BASE_PATH}`

// CSS Tasks
export const compileSass = () => {
  return (
    src(`${SRC}/scss/style.scss`)
      .pipe(sassGlob())
      // Minimal, backwards-compatible warning suppression. We do not change
      // compilation semantics — only mute deprecation warnings for now.
      .pipe(
        sassCompiler({
          quietDeps: true,
          logger: { warn: () => {} },
        }).on("error", sassCompiler.logError)
      )
      .pipe(dest(`${DEST}/css`))
  )
}

export const css = series(compileSass)

// JavaScript Tasks
// NOTE: bower/npm-managed assets, static files, images and standalone JS
// are handled by the consolidated `copyAssets` task below. This keeps the
// gulpfile small and makes it easy to centralize binary-safe copies.

export const browserifyTask = () => {
  return browserify(`${SRC}/js/script.js`)
    .transform(babelify, {
      presets: ["@babel/preset-env"],
      plugins: ["@babel/plugin-transform-modules-commonjs"],
    })
    .bundle()
    .pipe(source("script.js"))
    .pipe(dest(`${DEST}/js`))
}

export const js = series(browserifyTask)

// HTML Tasks
export const compilePug = () => {
  let locals = {}
  try {
    locals = readConfig(`${CONFIG}/meta.yml`) || {}
  } catch (e) {
    console.warn("Could not read meta.yml config, using empty locals")
  }

  return src([
    `${SRC}/pug/**/*.pug`, // include all pug files
    `!${SRC}/pug/**/_*.pug`, // exclude files starting with _
    `!${SRC}/pug/**/_*/**`, // exclude any files inside folders starting with _
  ])
    .pipe(
      pug({
        // For gulp-pug v5+, use `data` instead of deprecated `locals`.
        // Revert to locals to ensure variables are available regardless of plugin version.
        locals: locals,
        // Ensure `extends`/`include` paths resolve relative to the pug root.
        basedir: `${SRC}/pug`,
        pretty: true,
      })
    )
    .pipe(dest(`${DEST}`))
}

export const html = series(compilePug)

// Image Tasks
export const copyImages = () => {
  // Copy images only (kept for watch). Favicon is handled in copyAssets.
  return src([`${SRC}/image/**/*`, `${SRC}/the-large-follower.svg`], {
    allowEmpty: true,
  }).pipe(dest(`${DEST}/img`))
}

// Consolidated asset copying: copies bower assets, static files, images,
// favicon and standalone JS into the docs folder. Uses stream/promises.finished
// to await each copy so we avoid stream merge issues.
export const copyAssets = async () => {
  // Use node fs for binary-safe copies of images and single files.
  // Copy image directory recursively using fs.cp (Node >=16.7/18+).
  try {
    const srcImageDir = path.join(SRC, "image")
    const destImageDir = path.join(DEST, "img")
    // Ensure dest dir exists
    await fs.promises.mkdir(destImageDir, { recursive: true })
    // Recursively copy images
    if (fs.existsSync(srcImageDir)) {
      // fs.cp is available in Node 16.7+; use it if present
      if (fs.promises.cp) {
        await fs.promises.cp(srcImageDir, destImageDir, {
          recursive: true,
          force: true,
        })
      } else {
        // Fallback: copy files by walking the tree
        const walk = async (srcDir, dstDir) => {
          const entries = await fs.promises.readdir(srcDir, {
            withFileTypes: true,
          })
          for (const entry of entries) {
            const s = path.join(srcDir, entry.name)
            const d = path.join(dstDir, entry.name)
            if (entry.isDirectory()) {
              await fs.promises.mkdir(d, { recursive: true })
              await walk(s, d)
            } else if (entry.isFile()) {
              await fs.promises.copyFile(s, d)
            }
          }
        }
        await walk(srcImageDir, destImageDir)
      }
    }

    // Copy some standalone binaries
    const copyIfExists = async (srcPath, destPath) => {
      if (fs.existsSync(srcPath)) {
        await fs.promises.mkdir(path.dirname(destPath), { recursive: true })
        await fs.promises.copyFile(srcPath, destPath)
      }
    }

    await copyIfExists(
      path.join(SRC, "the-large-follower.svg"),
      path.join(DEST, "img", "the-large-follower.svg")
    )
    await copyIfExists(
      path.join(SRC, "favicon.ico"),
      path.join(DEST, "favicon.ico")
    )
    await copyIfExists(
      path.join(SRC, "js", "ua-switch.js"),
      path.join(DEST, "js", "ua-switch.js")
    )
  } catch (err) {
    console.error("copyAssets (fs) failed:", err)
    throw err
  }

  // Still copy bower assets and generic static via vinyl streams (safe for text/css/js)
  await Promise.all([
    finished(
      src(["reset-css/reset.css"], {
        cwd: "bower_components",
        allowEmpty: true,
      }).pipe(dest(`${DEST}/css/lib`))
    ),
    finished(
      src(
        [
          "jquery/dist/jquery.min.js",
          "jquery/dist/jquery.min.map",
          "lodash/dist/lodash.min.js",
        ],
        { cwd: "bower_components", allowEmpty: true }
      ).pipe(dest(`${DEST}/js/lib`))
    ),
    finished(
      src([`${SRC}/static/**`], { allowEmpty: true }).pipe(dest(`${DEST}`))
    ),
  ])
}

// Generic static copy: if you place files under src/static/, they'll be copied
// to docs/2017 preserving relative paths. This lets you centralize miscellaneous
// assets (favicon, svg, small libs) to avoid multiple specialized copy tasks.
// copyStatic kept as an alias for backwards-compatibility
export const copyStatic = copyAssets

// Development server
export const serve = () => {
  const bs = browserSync.create()

  bs.init({
    server: {
      baseDir: HTDOCS,
    },
    startPath: BASE_PATH,
    ghostMode: false,
  })

  // Watch tasks
  watch([`${SRC}/scss/**/*.scss`], series(compileSass, bs.reload))
  watch([`${SRC}/js/**/*.js`], series(js, bs.reload))
  watch(
    [`${SRC}/pug/**/*.pug`, `${SRC}/config/meta.yml`],
    series(compilePug, bs.reload)
  )
  watch(
    [`${SRC}/image/**/*`, `${SRC}/the-large-follower.svg`],
    series(copyAssets, bs.reload)
  )
  watch(
    [`${SRC}/static/**/*`, `${SRC}/favicon.ico`],
    series(copyAssets, bs.reload)
  )
}

// Combined tasks
export const build = parallel(css, js, html, copyAssets)
export const dev = series(build, serve)

// Default task
export default dev
