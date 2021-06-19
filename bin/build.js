const root = require('./config').env.projectroot
const outputRoot = `${root}/public`
const config = require('./config').build

const fs = require('fs')
const glob = require('fast-glob')
const ejs = require('ejs')
const sass = require('sass')
const esbuild = require('esbuild')


const buildEjs = async (patterns, data={}) => {
  patterns.push('!**/_*.ejs')
  const ejsFiles = await glob(patterns.map(p => {
      return (p[0] === '!')
        ? `!${config.ejs.root}/${p.slice(1, p.length)}`
        : `${config.ejs.root}/${p}`
    }))
    .catch((e) => { throw new Error(e) })

  data.ejsroot =
    `${root}/${config.ejs.root}/`

  ejsFiles.forEach((f) => {
    ejs.renderFile(f, data, (err, renderedStr) => {
      if (err) throw new Error(err)
      const dest = f.replace(config.ejs.root, outputRoot).split('/')
      const destDir = dest.slice(0, -1).join('/')
      const destF = dest[dest.length - 1].replace('ejs', 'html')

      console.log(`[ejs]: ${f}\t> ${destDir}/${destF}`)
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })
      fs.writeFile(`${destDir}/${destF}`, renderedStr,
        (error) => {if (error) throw new Error(error)})
    })
  })
}

const buildSass = async (patterns) => {
  patterns.push('!**/_*.scss')
  const sassFiles = await glob(patterns.map(p => {
      return (p[0] === '!')
        ? `!${config.sass.root}/${p.slice(1, p.length)}`
        : `${config.sass.root}/${p}`
    }))
    .catch((e) => { throw new Error(e) })

  sassFiles.forEach((f) => {
    const result = sass.renderSync({file: f})

    const dest = f.replace(config.sass.root, `${outputRoot}/assets/css`).split('/')
    const destDir = dest.slice(0, -1).join('/')
    const destF = dest[dest.length - 1].replace('scss', 'css')

    console.log(`[sass]: ${f}\t> ${destDir}/${destF}`)
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })
    fs.writeFile(`${destDir}/${destF}`, result.css,
      (error) => {if (error) throw new Error(error)})
  })
}

const buildJs = async (patterns) => {
  patterns.push('!**/_*.js')
  const jsFiles = await glob(patterns.map(p => {
      return (p[0] === '!')
        ? `!${config.js.root}/${p.slice(1, p.length)}`
        : `${config.js.root}/${p}`
    }))
    .catch((e) => { throw new Error(e) })

  let result = esbuild.buildSync({
    entryPoints: jsFiles,
    logLevel: 'info',
    write: true,
    bundle: true,
    minify: config.js.minify,
    outdir: `${outputRoot}/assets/js`,
  })

  if (result.errors.length > 0) {
    console.error(result)
  }
}

fs.rmdirSync(outputRoot, { recursive: true })
buildEjs(['**/*.ejs'])
buildSass(['**/*.scss'])
buildJs(['**/*.js'])
