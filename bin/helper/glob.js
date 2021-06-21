const fastglob = require('fast-glob')

const glob = async (root, patterns) => {
  return await fastglob(patterns.map(p => {
    return (p[0] === '!')
      ? `!${root}/${p.slice(1, p.length)}`
      : `${root}/${p}`
  }))
}

module.exports = glob
