import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from '@rspack/cli';

// Create equivalents for __dirname and __filename in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  entry: {
    index: './src/index.ts',
    // Add direct exports for tree shaking
    base: './src/utils/base.ts',
    check: './src/utils/check.ts',
    date: './src/utils/date.ts',
    file: './src/utils/file.ts',
    image: './src/utils/image.ts',
    net: './src/utils/net.ts',
    number: './src/utils/number.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'module',
    },
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
  target: ['web', 'es2020'],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
              target: 'es2020',
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: [],
});
