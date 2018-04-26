const router  = require("express").Router();
const removeFile = require("../controllers/removeFile");
const unzipFile = require("../controllers/unzipFile");
const uploadFile = require("../controllers/uploadFile");
const downloadZip = require("../controllers/downloadZip");

router.post("/remove", removeFile);
router.post("/unzip", unzipFile);
router.post("/upload", uploadFile);
router.get("/download", downloadZip);

module.exports = router;