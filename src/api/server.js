const express = require("express");
const multiparty = require("multiparty");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const extract = require("extract-zip");
const { spawn } = require("child_process");
const uuidv1 = require("uuid/v1");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use("/", express.static(`${__dirname}/build`));
app.use("/", express.static(`${__dirname}/public`));

const wrapWithPromise = wrappedFunction => (...args) =>
  new Promise((resolve, reject) => {
    wrappedFunction(...args, (error, stats) => {
      return error ? reject(error) : resolve(stats);
    });
  });

app.route("/file/upload").post((req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    let rootUniqueDirName = fields.rootUniqueDirName[0];
    const originalFileName = files.file[0].originalFilename;
    const rootPath = path.resolve("./public");
    const tempPath = files.file[0].path;

    if (rootUniqueDirName === "") {
      rootUniqueDirName = uuidv1();
    }
    const rootDirectoryPath = path.join(rootPath, rootUniqueDirName);

    // maybe should be asynchronous
    if (!fs.existsSync(rootDirectoryPath)) {
      fs.mkdirSync(rootDirectoryPath);
    }
    const fileUniqueName = `${uuidv1()}__${originalFileName}`;
    const targetPath = path.join(rootDirectoryPath, fileUniqueName);
    const relativeFilePath = `${rootUniqueDirName}/${fileUniqueName}`;
    try {
      const readFilePromise = await wrapWithPromise(fs.readFile)(tempPath);
      await wrapWithPromise(fs.writeFile)(targetPath, readFilePromise);
      res.send({
        filePath: relativeFilePath,
        originalFileName,
        rootUniqueDirName
      });
    } catch (error) {
      console.log(error);
    }
  });
});

app.route("/file/unzip").post((req, res) => {
  console.log("req.body", req.body);
  let {
    archivePath,
    imagePath,
    originalFileName,
    rootUniqueDirName,
    userName
  } = req.body;

  const rootPath = path.resolve("./public");
  imagePath = path.join(rootPath, imagePath);
  archivePath = path.join(rootPath, archivePath);
  originalFileName = path.basename(originalFileName, ".zip");
  const rootDir = path.join(rootPath, rootUniqueDirName);
  const extractDir = path.join(rootDir,`${uuidv1()}__extracted`);
  fs.mkdir(extractDir, errDir => {
    if (errDir) {
      res.status(500).send({ extractDestinationDirError: errDir });
    } else {
      extract(archivePath, { dir: extractDir }, extractErr => {
        if (extractErr) {
          res.status(500).json({ UnzipError: extractErr });
        }
      });
    }
  });

  const pythonPath = path.resolve("face_reco.py");
  const py = spawn("python", [`${pythonPath}`]);

  py.stdin.write(`${imagePath}\n`);
  py.stdin.write(`${userName}\n`);
  // change for linux to py.stdin.write(`${extractDir}`);
  py.stdin.write(`${extractDir}/${originalFileName}`);
  py.stdin.end();

  py.stdout.on("data", data => {
    const convertBufferData = data.toString("utf8");
    console.log("data", convertBufferData);
    res.status(200).send(convertBufferData);
  });
  py.on("exit", code => {
    console.log(`child process exited with the code ${code}`);
  });
  py.stderr.on("data", error => {
    console.log(error.toString("utf8"));
    res.status(500).json({ pythonError: error });
  });
  py.stdout.on("end", () => {
    console.log("python script finish");
  });
});
app.listen("3003", console.log("listening on port 3003"));
