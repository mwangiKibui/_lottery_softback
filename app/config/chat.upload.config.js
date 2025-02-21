const multer = require('multer');
const {extname,join} = require('path');
const {existsSync,mkdirSync} = require("fs");

let filesPath = join(__dirname,'..','..','public','chat');


if(!existsSync(filesPath)){
    mkdirSync(filesPath,{recursive:true});
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filesPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname)); // Append file extension
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'audio/mpeg', 'audio/wav','audio/wave', 'application/pdf','audio/x-m4a','audio/m4a','audio/mp4'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 }});

module.exports = upload;