import fs from 'fs'
import { resolve } from '../utils.js'

const packageJsonPath = resolve('package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath) + '')
const tag = process.argv[process.argv.length - 1]
const version = tag.replace(/^v|-rc/gi, '')

packageJson.version = version

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), {
  encoding: 'utf-8',
})
