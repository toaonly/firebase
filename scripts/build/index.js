import { readFileSync, writeFileSync } from 'fs'
import { promiseExec, resolve } from '../utils.js'

const externals = JSON.parse(readFileSync('external-packages.json') + '')
const peerDependencies = {}

const removeKey = (obj, key) => {
  if (!externals.includes(key)) return

  const version = obj[key]

  delete obj[key]

  peerDependencies[key] = version
}

try {
  const packageJson = JSON.parse(readFileSync(resolve('package.json')) + '')
  const { devDependencies, dependencies } = packageJson

  console.log(await promiseExec('yarn lint'))
  console.log(await promiseExec('yarn types'))

  Object.keys(devDependencies).forEach(k => {
    removeKey(devDependencies, k)
  })

  Object.keys(dependencies).forEach(k => {
    removeKey(dependencies, k)
  })

  packageJson.peerDependencies = {
    ...packageJson.peerDependencies,
    ...peerDependencies,
  }

  writeFileSync(resolve('package.json'), JSON.stringify(packageJson, null, 2), {
    encoding: 'utf-8',
  })

  console.log(await promiseExec('vite build'))
} catch (error) {
  console.warn(error)
}
