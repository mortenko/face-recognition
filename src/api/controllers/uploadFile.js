const path = require("path");
const fs = require("fs");
const multiparty = require("multiparty");
const uuidv1 = require("uuid/v1");
const wrapWithPromise = require("../utils");

function fileUpload(req, res) {
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

    if (!fs.existsSync(rootDirectoryPath)) {
      try {
        await wrapWithPromise(fs.mkdir)(rootDirectoryPath);
      } catch (createRootDirErr) {
        res.status(500).send(createRootDirErr);
      }
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
}

module.exports = fileUpload;
