const router  = require("express").Router();
const removeFile = require("./removeFile");
const unzipFile = require("./unzipFile");
const uploadFile = require("./uploadFile");

router.post("/remove", removeFile);
router.post("/unzip", unzipFile);
router.post("/upload", uploadFile);


module.exports = router;