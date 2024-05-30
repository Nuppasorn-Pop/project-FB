// upload รูปโปรไฟล์ ที่หน้า browser ==> Edit Profile
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

const upload = multer({ strorage }); // บอก multer ว่าจะเก็บ file ที่ strorage นี้

module.exports = upload;
