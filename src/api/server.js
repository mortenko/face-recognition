const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.static(`${process.cwd()}/public`));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use("/file", require("./routes"));
app.use(express.static(`${process.cwd()}/build`));

app.listen("3003", console.log("listening on port 3003"));
