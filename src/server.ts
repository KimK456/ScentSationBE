import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import express, { Express } from "express";
import postsRoute from "./routes/posts_route";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import userRoute from "./routes/user_route";
import authRoute from "./routes/authentication_route";
import fileRoute from "./routes/file_route";
import cors from "cors";
import geminiRoute from "./routes/gemini_route";
import path from 'path';

const app = express();
app.use(cors());
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/userPost", postsRoute)
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/file", fileRoute);
app.use("/gemini", geminiRoute);

const rootDir = path.resolve(__dirname, '../..'); // Go from dist/src → project root
app.use("/public", express.static(path.join(rootDir, "public")));

const baseDir = path.resolve(__dirname, '../../');

app.use(express.static(path.join(baseDir, 'front')));

app.get('*', (req, res) => {
  console.log("Serving frontend for:", req.url);
  res.sendFile(path.join(baseDir, 'front', 'index.html'));
});

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Credentials", "true")    
   next();
});

app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web Dev 2025 REST API",
      version: "1.0.0",
      description: "REST server including authentication using JWT",
    },
    servers: [{ url: "http://10.10.246.76", }, { url: "http://localhost", }, {url : "https://10.10.246.76",},],
  },
  apis: ["./src/routes/*.ts"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const initApp = (): Promise<Express> => {
  return new Promise<Express>((resolve, reject) => {
    if (!process.env.DATABASE_URL) {
      reject("DATABASE_URL is not defined in .env file");
    } else {
      mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => {
          resolve(app);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};  

export = initApp;
