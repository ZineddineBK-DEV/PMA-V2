const https = require("https");
const app = require("./app");
const fs = require("fs");

const options={
    key: fs.readFileSync('./src/cert/prologic2023.key'),
    cert:fs.readFileSync('./src/cert/.prologic.com.tn.pem')
}

const port = process.env.PORT || 3002;
app.set("port", port);
const server = https.createServer(options,app);
server.listen(port, () => console.log("listening on port ", port));