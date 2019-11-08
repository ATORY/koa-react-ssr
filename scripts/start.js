const path = require('path');
const fs = require('fs-extra');
const Watchpack = require("watchpack");
const webpack = require('webpack');
const webpakConfig = require('./webpack.config');


const compiler = webpack(webpakConfig);

const wp = new Watchpack({
	aggregateTimeout: 2000,
	poll: true,
    // ignored: ["**/.git", "**/node_modules"]
    ignored: /node_modules|.git/,
});

wp.watch([], [path.resolve(__dirname, '../client')], Date.now() - 10000)

wp.on("change", function(filePath, mtime, explanation) {
    console.log('change')
});


wp.on("aggregated", function(changes, removals) {
    console.log('aggregated')
    build().catch(console.error)
});

let appfd = ''
build().catch(console.error)
async function build() {

    fs.emptyDirSync(path.resolve(__dirname, '../dist'));
    await new Promise((resolve, reject) => {
        compiler.run((err, {stats}) => {
            // console.log(err)
            // stats.map(item => console.log(item))
            if (err) reject(err)
            else resolve(stats)
        });
    });
    console.log('build end')
    
    if (appfd) {
        await new Promise((resolve, reject) => {
            appfd.close((err) => {
                if (err) return reject(err)
                else resolve()
            })
        }) 
        delete require.cache[require.resolve('../app')]
    }
    const app = require('../app');
    appfd = app.listen(9876, () => {
        console.log('server start')
    })
    
}
