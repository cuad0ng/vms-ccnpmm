const express = require("express");

const route = require("./routes");
const db = require("./config/db");

db.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route(app);

app.listen(port, () => console.log(`Listening on ${port}`));
