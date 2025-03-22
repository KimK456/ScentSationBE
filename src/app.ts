import initApp from "./server";
import https from 'https';
import fs from 'fs';

const port = 44;

initApp().then((app) => {
  const options = {
    key: fs.readFileSync('./client-key.pem'),
    cert: fs.readFileSync('./client-cert.pem')
  };
  https.createServer(options, app).listen(port, "0.0.0.0", () => {
    console.log(`App listening at http://localhost`);
  });
});