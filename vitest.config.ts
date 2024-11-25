import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    exclude: [...configDefaults.exclude],
    coverage: {
      exclude: [...configDefaults.exclude, 'docs/**/*', 'src/index.ts'],
    },
  },
});