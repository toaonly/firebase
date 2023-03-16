import { exec } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

export const resolve = (...args) =>
  path.resolve(process?.cwd() || __dirname, ...args)

export const promiseExec = (command, options) =>
  new Promise((resolve, reject) => {
    exec(command, options, (err, stdout) => {
      if (err) reject(err)
      else resolve(stdout)
    })
  })

export function getFilename(metaUrl) {
  const __filename = fileURLToPath(metaUrl)

  return __filename
}

export function getDirname(metaUrl) {
  const __dirname = path.dirname(getFilename(metaUrl))

  return __dirname
}
