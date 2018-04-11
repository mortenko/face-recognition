const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
// app.use(express.static(`${process.cwd()}/build`));
// app.use(express.static(`${process.cwd()}/public`));

app.use("/file", require("./routes"));

app.listen("3003", console.log("listening on port 3003"));
