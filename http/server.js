// http/server.js
const http = require("http");
const app = require("../app/app");

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`HTTP server is running on port ${PORT}.`);
});

module.exports = httpServer;


// const spdy = require('spdy');
// const app = require("../app/app");
// const fs = require('fs');
// const CERT_DIR = `${__dirname}/cert`;

// const httpServer = spdy.createServer(
//   {
//     key: fs.readFileSync(`${CERT_DIR}/server.key`),
//     cert: fs.readFileSync(`${CERT_DIR}/server.cert`),
//   },
//   app
// )

// const PORT = process.env.PORT || 8080;
// httpServer.listen(PORT, () => {
//   console.log(`HTTP server is running on port ${PORT}.`);
// });

// module.exports = httpServer;

