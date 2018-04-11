const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const wrapWithPromise = require("../utils");

async function removeFile (req, res) {
  const { filePath } = req.body;
  const rootPath = path.resolve("./public");
  const absolutePathToFile = path.join(rootPath, filePath);
  try {
    await wrapWithPromise(fs.unlink)(absolutePathToFile);
    res.status(200).send("File was successfuly removed");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = removeFile;