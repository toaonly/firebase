import * as path from 'path'
import analyze from 'rollup-plugin-analyzer'
import { defineConfig, loadEnv } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import { configDefaults } from './vite/config'

const projectRootDir = path.resolve(__dirname)
const resolve = (p: string) => path.resolve(projectRootDir, p)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    resolve: {
      alias: [...configDefaults.resolve.alias],
    },

    plugins: [
      eslintPlugin(),
      analyze({
        showExports: true,
        skipFormatted: true,
        summaryOnly: true,
      }) as any,
      ...configDefaults.plugins,
    ],

    build: {
      outDir: resolve('dist'),
      lib: {
        entry: resolve('src/index.ts'),
        formats: ['es'],
        fileName: 'index',
      },
    },
  }
})
