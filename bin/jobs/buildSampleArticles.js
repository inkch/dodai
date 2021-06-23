const { data, pagesDir, outputRoot } = require('../config').ejs

const fs = require('fs')
const write = require('../helper/write')
const log = require('../helper/log')
const ejs = require('ejs')

const buildSampleArticles = async () => {

  const template = pagesDir + '/articles/_article.ejs'
  const articlesData = JSON.parse(
    fs.readFileSync(pagesDir + '/articles/articles.json'))

  articlesData.forEach(articleData => {
    Object.keys(articleData).forEach((key) => {
      data[key] = articleData[key]
    })

    ejs.renderFile(template, data, (err, html) => {
      if (err) {
        log.err('Error: bin/jobs/buildSampleArticles.js')
        log.raw(err)
        throw new Error(err)
      }

      const dest = outputRoot + '/articles/' + articleData.title + '.html'
      log.pp(dest)
      write(dest, html)
    })
  })

  log.newline() // 実行時のログを見やすくするために改行したい
}

module.exports = buildSampleArticles
