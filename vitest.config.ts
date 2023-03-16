import { configDefaults, defineConfig } from 'vitest/config'
import { configDefaults as viteConfigDefaults } from './vite/config'

export default defineConfig({
  resolve: {
    alias: [...viteConfigDefaults.resolve.alias],
  },
  plugins: [...(viteConfigDefaults.plugins as any)],
  test: {
    exclude: [...configDefaults.exclude],
    globals: true,
  },
})
