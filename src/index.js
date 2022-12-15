import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import route from "./routes";
import db from "./config/db";

const port = process.env.PORT || 3000;
const app = express();
const form_data = multer()

dotenv.config();
db.connect();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(form_data.fields()); 

route(app);

const listener = app.listen(port, () =>
  console.log(`Listening on ${listener.address().port}`)
);
