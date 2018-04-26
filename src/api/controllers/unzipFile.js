const path = require("path");
const fs = require("fs");
const uuidv1 = require("uuid/v1");
const wrapWithPromise = require("../utils");
const extract = require("extract-zip");
const { spawn } = require("child_process");

function processPythonScript(
  imagePath,
  originalFileName,
  extractDir,
  { userName }
) {
  return new Promise((resolve, reject) => {
    let pythonResponse = "";
    let pythonErrResponse = "";
    const pythonPath = path.resolve("face_reco.py");
    console.log("pythonPath", pythonPath);
    const py = spawn("python", [`${pythonPath}`]);
    py.stdin.write(`${imagePath}\n`);
    py.stdin.write(`${userName}\n`);
    // change for linux to py.stdin.write(`${extractDir}`);
    py.stdin.write(`${extractDir}/${originalFileName}`);
    py.stdin.end();

    py.stdout.on("data", data => {
      pythonResponse += data.toString("utf8");
      console.log("pythonResponse", pythonResponse);
    });
    py.on("exit", code => {
      console.log(`child process exited with the code ${code}`);
    });
    py.stderr.on("data", error => {
      pythonErrResponse += error.toString("utf8");
    });
    py.on("close", code => {
      if (code === 0) {
        resolve({ pythonResponse, extractDir });
      } else {
        reject({ pythonErrResponse });
      }
    });
  });
}

async function unzipFile(req, res) {
  let { archivePath, imagePath, originalFileName } = req.body;
  const { rootUniqueDirName } = req.body;

  const rootPath = path.resolve("./public");
  imagePath = path.join(rootPath, imagePath);
  archivePath = path.join(rootPath, archivePath);
  originalFileName = path.basename(originalFileName, ".zip");
  const rootDir = path.join(rootPath, rootUniqueDirName);

  const extractDir = path.join(rootDir, `${uuidv1()}__extracted`);
  try {
    await wrapWithPromise(fs.mkdir)(extractDir);
    extract(archivePath, { dir: extractDir }, extractErr => {
      if (extractErr) {
        res.status(500).json({ UnzipError: extractErr });
      }
    });
  } catch (destinationDirErr) {
    res.status(500).send({ destinationDirErr });
  }
  try {
    const pythonResponse = await processPythonScript(
      imagePath,
      originalFileName,
      extractDir,
      req.body
    );
    res.status(200).send(pythonResponse);
  } catch (pythonError) {
    res.status(500).send(pythonError);
  }
}

module.exports = unzipFile;
