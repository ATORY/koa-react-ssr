const fs = require('fs');
const path = require('path');

function renderFullPage({
  title = 'TheDeployer', styleTags, html, preloadedState,
}) {
  const files = fs.readdirSync(path.join(__dirname, '../dist')).filter((file) => file.endsWith('js'));
  const scripts = files.map((file) => `<script src="/dist/${file}"></script>`).join('<br/>');
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
    '\\u003c',
  )}
        </script>
        ${scripts}
      </body>
    </html>
    `;
}

module.exports = renderFullPage;
