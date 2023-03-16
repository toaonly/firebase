import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { promiseExec, resolve } from '../utils.js'

existsSync(resolve('types')) && rmSync(resolve('types'), { recursive: true })

try {
  await promiseExec('npx tsc -p tsconfig.types.json')
  await promiseExec('npx tsc-alias -p tsconfig.types.json')

  const shims = `${readFileSync(resolve('types/shims.d.ts'))}`.replace(
    `export {};`,
    ''
  )
  const index = `${readFileSync(resolve('types/index.d.ts'))}`

  writeFileSync(resolve('types/index.d.ts'), `${index}\n${shims}`)

  rmSync(resolve('types/shims.d.ts'))
} catch (error) {
  console.warn(error)
}
