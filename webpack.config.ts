import * as path from 'path';
import * as fs from 'fs';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';

const apiPath  = path.resolve(__dirname, 'src/netlify/lambda')
const fileNames = fs.readdirSync(apiPath).reduce((acc, v) => ({ ...acc, [path.parse(v).name]: `${apiPath}/${v}` }), {});

const config: Configuration = {
  mode: "production",
  target: 'node',
  resolve: {
    plugins: [new TsConfigPathsPlugin({ configFile: './tsconfig.json' })],
    extensions: ['.ts', '.js'],
  },
  entry: fileNames,
  output: {
    path: path.resolve(__dirname, 'api'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
};

export default config;
