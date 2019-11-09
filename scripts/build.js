/* eslint-disable import/no-extraneous-dependencies */
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const webpakConfig = require('./webpack.config');

const compiler = webpack(webpakConfig);

async function build() {
  fs.emptyDirSync(path.resolve(__dirname, '../dist'));
  await new Promise((resolve, reject) => {
    compiler.run((err, { stats }) => {
      // console.log(err)
      // stats.map(item => console.log(item))
      if (err) reject(err);
      else resolve(stats);
    });
  });
  console.info('build end');
}

build().then(() => console.info('done')).catch(console.error);
