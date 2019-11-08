const fs = require('fs')
const path = require('path')
const Router = require('koa-router');

const ssr = require('../ssr');
const router = new Router()

router.get('/', async ctx => {
    const { path, query, url, AppInitState } = ctx;
    const { preloadedState, content: html, styleTags } = ssr({path, url, query}, AppInitState);
    ctx.body = renderFullPage({styleTags, html, preloadedState});
})

module.exports = router;


function renderFullPage({title = 'TheDeployer', styleTags, html, preloadedState}) {
    const files = fs.readdirSync(path.join(__dirname, '../dist')).filter((file) => file.endsWith('js'));
    const scripts = files.map(file => {
        // console.log('load js file')
        return `<script src="/dist/${file}"></script>`
    }).join('<br/>')
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        ${styleTags}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        ${scripts}
      </body>
    </html>
    `
}