process.env.NODE_ENV = "development";

const path = require("path");
const EventEmitter = require("events");
const fs = require("fs-extra");
const Watchpack = require("watchpack");
const webpack = require("webpack");
const websockify = require("koa-websocket");

const webpakConfig = require("./webpack.config");

const reloadEmitter = new EventEmitter();
const compiler = webpack(webpakConfig);

const wp = new Watchpack({
  aggregateTimeout: 2000,
  poll: true,
  // ignored: ["**/.git", "**/node_modules"]
  ignored: /node_modules|.git/
});

wp.watch([], [path.resolve(__dirname, "../client")], Date.now() - 10000);

wp.on("change", function(filePath, mtime, explanation) {
  console.log("change");
});

wp.on("aggregated", function(changes, removals) {
  console.log("aggregated");
  build()
    .then(() => {
      reloadEmitter.emit("reload");
    })
    .catch(console.error);
});

build()
  .then(() => startServer())
  .catch(console.error);

async function build() {
  fs.emptyDirSync(path.resolve(__dirname, "../dist"));
  await new Promise((resolve, reject) => {
    compiler.run((err, { stats }) => {
      // console.log(err)
      // stats.map(item => console.log(item))
      if (err) reject(err);
      else resolve(stats);
    });
  });
  console.log("build end");
}

let appfd = "";
function startServer() {
  let app = require("../app");
  if (appfd) {
    // await new Promise((resolve, reject) => {
    //     appfd.close((err) => {
    //         if (err) return reject(err)
    //         else resolve()
    //     })
    // })
    delete require.cache[require.resolve("../ssr")];
    require("../ssr");
    delete require.cache[require.resolve("../route/view")];
    require("../route/view");
  } else {
    app = websockify(app);
    appfd = app.listen(9876, () => {
      console.log("server start");
    });
    app.ws.use(ctx => {
      reloadEmitter.on("reload", () => {
        delete require.cache[require.resolve("../ssr")];
        delete require.cache[require.resolve("../route/view")];
        require("../ssr");
        require("../route/view");
        setTimeout(() => {
            ctx.websocket.send("reload");    
        }, 1000);
      });
      // the websocket is added to the context as `ctx.websocket`.
      ctx.websocket.on("message", function(message) {
        // do something
        console.log({ message });
      });
    });
  }
}
