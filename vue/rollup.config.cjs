const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const css = require('rollup-plugin-css-only');
const esbuild = require('rollup-plugin-esbuild').default;
const vue = require('rollup-plugin-vue');
const pkg = require('./package.json');

const external = [...Object.keys(pkg.peerDependencies || {})];

module.exports = {
  input: 'src/index.ts',
  external,
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    vue({
      target: 'browser',
      preprocessStyles: false,
      css: true,
    }),
    css({
      output: 'style.css',
    }),
    esbuild({
      target: 'es2018',
      sourceMap: true,
      tsconfig: 'tsconfig.json',
      include: /\.[jt]s$|\.vue\?vue&type=script.*lang\.ts$/,
    }),
    resolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.vue'],
    }),
    commonjs(),
  ],
};
