const initApp = require("./server"); 
const https = require("https");
const fs = require("fs");

const port = 443;

initApp().then((app) => {
    const options = {
    	key: fs.readFileSync('./client-key.pem'),
	cert: fs.readFileSync('./client-cert.pem')
    };
    https.createServer(options, app).listen(port, "0.0.0.0", () => {
    console.log(`App listening at https://localhost`);
  });
});
