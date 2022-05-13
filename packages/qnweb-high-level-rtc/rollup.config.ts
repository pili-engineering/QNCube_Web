import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const pkg = require('./package.json');
const buildEnvironment = process.env.NODE_ENV;
console.log('buildEnvironment', buildEnvironment);
const isProd = buildEnvironment === 'prod';
const sourcemap = !isProd;
const outputLibraryName = 'QNHighLevelRTC';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      name: outputLibraryName,
      format: 'umd',
      sourcemap
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap,
      name: outputLibraryName
    }
  ],
  external: [
    '@rongcloud/imlib-v4',
    'qnweb-rtc',
    'qnweb-im'
  ],
  watch: {
    include: 'src/**'
  },
  plugins: [
    replace({
      preventAssignment: true,
      SDK_VERSION: JSON.stringify(pkg.version),
    }),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript'),
      tsconfig: 'tsconfig.json',
      useTsconfigDeclarationDir: true
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    nodeResolve(),
    uglify(),
    // isProd && terser({
    //   compress: {
    //     pure_funcs: ['console.log'] // remove console.log
    //   }
    // })
  ]
};
