import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./routes";
import db from "./config/db";

const port = process.env.PORT || 3000;
const app = express();

dotenv.config();
db.connect();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

const listener = app.listen(port, () =>
  console.log(`Listening on ${listener.address().port}`)
);
