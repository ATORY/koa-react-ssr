const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');

const { name: AppName, version: AppVersion } = require('./package.json');
const viewRouter = require('./route/view')

const app = new Koa();

app.use(mount('/dist', serve(__dirname + '/dist')));
app.use(serve(__dirname + '/public'));
app.use(async (ctx, next) => {
    ctx.AppInitState = { AppName, AppVersion }
    await next()
})

app.use(viewRouter.routes()).use(viewRouter.allowedMethods());

module.exports = app;