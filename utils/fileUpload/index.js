const multer = require('multer');
const storeg = multer.memoryStorage();
const uploadFile = multer({
  storage: storeg,
});

exports.uploadFile = uploadFile.array('uploadedFile', 10);
