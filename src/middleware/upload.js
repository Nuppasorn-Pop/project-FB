// upload รูปโปรไฟล์ ที่หน้า browser ==> Edit Profile
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    const filename = `${new Date().getTime()}${Math.round(
      Math.random() * 100000
    )}.${file.mimetype.split("/")[1]}`;
    cb(null, filename);
  },
});

const upload = multer({ storage }); // บอก multer ว่าจะเก็บ file ที่ storage นี้

module.exports = upload;
