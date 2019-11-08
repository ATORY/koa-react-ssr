const colors = require('colors');
const app = require('./app');
const { name: AppName, version: AppVersion } = require('./package.json');

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
  });

const PORT = 5432;
app.listen(PORT, () => {
    console.log(
        colors.bold(`NODE_ENV: ${process.env.NODE_ENV}`.info),
        colors.bold(`${AppName}-${AppVersion}`.verbose),
        `server start at: ${PORT}`
    )
})