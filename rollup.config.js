import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

const config = {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    exports: 'named',
  },
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    babel({
      exclude: /node_modules/,
    }),
    commonjs(),
    copy({
      targets: [{ src: 'src/DatePicker.css', dest: 'lib' }],
    }),
    terser(),
  ],
};

export default config;
