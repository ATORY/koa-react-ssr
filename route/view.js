/* eslint-disable global-require */

const Router = require('koa-router');
const renderFullPage = require('../utils/renderFullPage');
let ssr = require('../ssr');

const router = new Router();

router.get('/', async (ctx) => {
  ssr = require('../ssr');
  const {
    path, query, url, AppInitState,
  } = ctx;
  // load other state
  const { preloadedState, content: html, styleTags } = ssr({ path, url, query }, AppInitState);
  ctx.body = renderFullPage({ styleTags, html, preloadedState });
});

module.exports = router;
