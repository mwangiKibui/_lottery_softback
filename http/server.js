// http/server.js
const http = require("http");
const https = require("https");
const fs = require("fs");
const app = require("../app/app");

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 8080;

// ssl configuration.
const options = {
  key: fs.existsSync('/etc/letsencrypt/live/lotterysoft.net/privkey.pem') ? fs.readFileSync('/etc/letsencrypt/live/lotterysoft.net/privkey.pem') : null,
  cert: fs.existsSync('/etc/letsencrypt/live/lotterysoft.net/fullchain.pem') ? fs.existsSync('/etc/letsencrypt/live/lotterysoft.net/fullchain.pem') : null
};

httpServer.listen(PORT, () => {
  console.log(`HTTP server is running on port ${PORT}.`);
});

https.createServer(options, app).listen(PORT, () => {
  console.log('HTTPS Server running on port '+PORT);
});

module.exports = httpServer;