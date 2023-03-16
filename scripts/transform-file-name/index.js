import { lstatSync, readdirSync, renameSync } from 'fs'
import { kebabCase, last } from 'lodash-es'
import { resolve } from '../utils.js'

/**
 * @returns {string[]}
 */
const getFilesInDir = (dir, parentDir = '') => {
  const dirPath = `${parentDir}/${dir}`.replace(/^\//, '')
  const entries = readdirSync(resolve(dirPath))
  const list = []

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const stat = lstatSync(resolve(dirPath, entry))

    if (!stat.isDirectory()) {
      list.push(`${dirPath}/${entry}`)
    } else {
      list.push(...getFilesInDir(entry, dirPath))
    }
  }

  return list
}

getFilesInDir('src')
  .filter(path => !path.match(/use/))
  .forEach(path => {
    const [file, ...dirPathToken] = path.split('/').reverse()
    const [name, ...extToken] = file.split('.')
    const ext = last(extToken)
    const dirPath = dirPathToken.reverse().join('/')
    const newFileName = `${kebabCase(name)}.${ext}`
    const newPath = `${dirPath}/${newFileName}`

    renameSync(path, newPath)
  })
