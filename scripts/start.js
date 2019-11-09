/* eslint-disable no-use-before-define */
/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const EventEmitter = require('events');
const fs = require('fs-extra');
const Watchpack = require('watchpack');
const webpack = require('webpack');
const websockify = require('koa-websocket');

const webpakConfig = require('./webpack.config');

const reloadEmitter = new EventEmitter();
const compiler = webpack(webpakConfig);

const wp = new Watchpack({
  aggregateTimeout: 2000,
  poll: true,
  // ignored: ["**/.git", "**/node_modules"]
  ignored: /node_modules|.git/,
});

wp.watch([], [path.resolve(__dirname, '../client')], Date.now() - 10000);

// wp.on('change', (filePath, mtime, explanation) => {
//   console.log("change");
// });

// eslint-disable-next-line no-unused-vars
wp.on('aggregated', (changes, removals) => {
  // console.log("aggregated");
  build()
    .then(() => {
      reloadEmitter.emit('reload');
    })
    .catch(console.error);
});

build()
  .then(() => startServer())
  .catch(console.error);

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
  console.log('build end');
}

function startServer() {
  let app = require('../app');
  app = websockify(app);
  app.listen(9876, () => {
    console.log('server start');
  });
  app.ws.use((ctx) => {
    reloadEmitter.on('reload', () => {
      delete require.cache[require.resolve('../ssr')];
      require('../ssr');
      // delete require.cache[require.resolve('../utils/renderFullPage')];
      // require('../utils/renderFullPage');
      // app.use(viewRouter.routes()).use(viewRouter.allowedMethods());
      ctx.websocket.send('reload');
      console.log('reload');
    });
  });
}
