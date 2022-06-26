import * as path from 'path';
import * as fs from 'fs';
import type { Configuration } from 'webpack';
import merge from 'webpack-merge';
import baseConfig from '../../webpack.config';
import CopyPlugin from 'copy-webpack-plugin';

const rootDir = path.resolve(__dirname, '../../')
const apiPath  = path.resolve(rootDir, 'src/vercel/api')
const fileNames = fs.readdirSync(apiPath).reduce((acc, v) => ({ ...acc, [path.parse(v).name]: `${apiPath}/${v}` }), {});

const config: Configuration = merge(baseConfig, {
  entry: fileNames,
  output: {
    path: path.resolve(rootDir, 'functions'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: path.resolve(rootDir,  "public") },
        // { from: "config", to: rootDir },
      ],
    }),
  ],
})

export default config;
