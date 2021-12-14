import path from 'path'
import { defineConfig } from 'vite'
import tsconfig from './tsconfig.json'
export default defineConfig({
  esbuild: {
    jsxInject: "import LiveDom from 'livedom'"
  },
  resolve: {
    alias: {
      ...Object.keys(tsconfig.compilerOptions.paths).reduce((acc, key) => {
        const p = tsconfig.compilerOptions.paths[key][0]
        acc[key] =  path.resolve(__dirname,tsconfig.compilerOptions.baseUrl, p)
        return acc
      },{})
    }
    
  }
})