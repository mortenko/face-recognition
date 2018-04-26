const path = require("path");
const fs = require("fs");
const wrapWithPromise = require("../utils");
const uuidv1 = require("uuid/v1");
const archiver = require("archiver");

function createArchiveZip(destinationDir) {
  return new Promise((resolve, reject) => {
    const archiveDir = `${destinationDir}.zip`;
    const zipOutput = fs.createWriteStream(archiveDir);
    const archive = archiver("zip", { zlib: { level: 9 } });
    zipOutput.on("error", writeStreamError => {
      console.log("writeStreamError", writeStreamError);
    });
    zipOutput.on("close", () => {
      console.log(`${archive.pointer()}total bytes   writeStream finish`);
      resolve(archiveDir);
    });
    archive.on("warning", archiveWarnings => {
      console.log("archiveWarnings", archiveWarnings);
    });
    archive.on("error", archiveErr => {
      reject(archiveErr);
    });
    archive.pipe(zipOutput);
    archive.directory(destinationDir, false);
    archive.finalize();
  })
}

async function downloadZip(req, res) {
  const { extractedDir } = req.query;
  let { photos } = req.query;
  photos = JSON.parse(photos);
  try {
    //  create dir into parent folder of extractedDi;
    const getParentDirName = path.dirname(extractedDir);
    const destinationDir = path.join(getParentDirName, `${uuidv1()}_download`);
    console.log("destinationDir", destinationDir);
    // create dir with choosen photos you want to download in parent folder
    await wrapWithPromise(fs.mkdir)(destinationDir);
    // recursively loop through dir's and find final dir
    // let finalDir = null;
    const recursiveDir = async extractedDirectory => {
      async function asyncRecursiveDir(finalDir) {
        try {
          // read dir and return its content
          const dirContent = await wrapWithPromise(fs.readdir)(finalDir);
          //   console.log("dirContenttttttt", dirContent);
          // loop through content of dir
          for (let file = 0; file < dirContent.length; file += 1) {
            // filter hidden or junk files f.e. .DS_Store
            if (!/(^|\/)\.[^/.]/g.test(dirContent[file])) {
              // console.log("dirContent", dirContent[file]);
              // get path to the file and his name
              const resolveFile = path.resolve(finalDir, dirContent[file]);
              // console.log("resolveFile", resolveFile);
              const nameOfResolvedFile = path.parse(resolveFile).name;
              //  save type (dir or file)
              const stats = await wrapWithPromise(fs.stat)(resolveFile);
              // console.log("stats", stats);
              // // check if current dir contains dirs, if yes call asyncRecursiveDir recursively excluding dir results
              if (stats.isDirectory() && nameOfResolvedFile !== "results") {
                // save last possible Dir into finalDir variable
                await asyncRecursiveDir(resolveFile);
              } else {
                // otherwise there is no more dir's, loop through names of files and if matched copy to destination directory
                photos.forEach(photoPath => {
                  // parse name of the file
                  const parsePhotoPath = path.parse(photoPath).base;
                  if (parsePhotoPath === dirContent[file]) {
                    fs.copyFile(
                      path.join(finalDir, dirContent[file]),
                      path.join(destinationDir, dirContent[file]),
                      copyFileErr => {
                        if (copyFileErr) {
                          res.status(500).send(copyFileErr);
                        }
                      }
                    );
                  }
                });
              }
            }
          }
        } catch (error) {
          res.status(500).send(error);
        }
      }
      await asyncRecursiveDir(extractedDirectory);
      return createArchiveZip(destinationDir);
    };
    const archiveDirZipPath = await recursiveDir(extractedDir);
    res.download(archiveDirZipPath, errDownload => {
      if (errDownload) {
        res.status(500).send(errDownload);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = downloadZip;
