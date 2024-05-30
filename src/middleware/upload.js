const multer = require("multer");
const strorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const filename =
      new Date().getTime() + "" + Math.round(Math.random() * 100000);
    cb(null);
  },
});
