// Startup file for Plesk (Node.js extension / Phusion Passenger).
// Serves the production build in .next — run `npm install` and `npm run build` first.
// Passenger takes over whatever port we listen on; PORT is only used when run directly (`npm start`).

const { createServer } = require("node:http");
const next = require("next");

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, () => {
      console.log(`> APSHOP ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start APSHOP. Did you run `npm run build`?", err);
    process.exit(1);
  });
