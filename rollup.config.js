// import babel from '@rollup/plugin-babel';
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import copy from 'rollup-plugin-copy';
// import { terser } from 'rollup-plugin-terser';

// const config = {
//   input: 'src/index.js',
//   output: {
//     file: 'lib/index.js',
//     format: 'cjs',
//     exports: 'named',
//   },
//   external: ['react', 'react-dom'],
//   plugins: [
//     resolve(),
//     babel({
//       exclude: /node_modules/,
//       presets: ["@babel/preset-env", "@babel/preset-react"],
//     }),
//     commonjs({
//       exclude: 'src/**',
//     }),
//     copy({
//       targets: [{ src: 'src/DatePicker.css', dest: 'lib' }],
//     }),
//     terser(),
//   ],
// };

// export default config;

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// const isProd = process.env.NODE_ENV === 'production';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

export default {
  input: './src/index.js',
  external: ['react', 'react-dom'],
  output: [
    {
      file: 'lib/index.js',
      format: 'cjs',
      name: 'workingConfig',
      globals,
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({ extensions }),
    babel({
      extensions,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
    }),
    commonjs({
      include: '**/node_modules/**',
    }),
  ],
};
