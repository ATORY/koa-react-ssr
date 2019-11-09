const zlib = require('zlib');
const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const compress = require('koa-compress');

const { name: AppName, version: AppVersion } = require('./package.json');
const viewRouter = require('./route/view');

const app = new Koa();

app.use(compress({
  // eslint-disable-next-line camelcase
  filter: (content_type) => /text|javascript/i.test(content_type),
  threshold: 2048,
  flush: zlib.Z_SYNC_FLUSH,
}));
app.use(mount('/dist', serve(`${__dirname}/dist`)));
app.use(serve(`${__dirname}/public`));
app.use(async (ctx, next) => {
  ctx.AppInitState = { AppName, AppVersion };
  await next();
});

app.use(viewRouter.routes()).use(viewRouter.allowedMethods());

module.exports = app;
