const path = require("path");
const fs = require("fs");
const uuidv1 = require("uuid/v1");
const extract = require("extract-zip");
const { spawn } = require("child_process");

function unzipFile(req, res) {
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
  const extractDir = path.join(rootDir, `${uuidv1()}__extracted`);
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
    //  console.log("data", convertBufferData);
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
};

module.exports = unzipFile;