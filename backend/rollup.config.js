import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/server.ts', // Path to the entry point of your app
  output: {
    file: 'dist/bundle.js', // The output bundle
    format: 'cjs', // output format
  },
  plugins: [
    typescript(), // So Rollup can convert TypeScript to JavaScript
    resolve(), // So Rollup can find `node_modules` packages
    commonjs(), // So Rollup can convert CommonJS modules to ES modules
    json(), // So Rollup can import JSON files
    terser(), // Minify the output
  ],
};
