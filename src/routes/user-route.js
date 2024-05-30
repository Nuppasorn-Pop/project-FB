const express = require("express");
const upload = require("../middleware/upload");
const userController = require("../controller/user-controller");
const {
  validateUpdateProfileOrCoverImage,
} = require("../middleware/validator");
const userRouter = express.Router();

userRouter.patch(
  "/",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  validateUpdateProfileOrCoverImage,
  userController.updateProfileOrCoverImage
);

module.exports = userRouter;

// upload มี 3 mehtod โดย method มีการกำหนด key ใน req.body ว่าจะรับเฉพาะ file ที่เป็น value ของ key ที่กำหนด
// 1. upload.single ==> (กำหนดรับได้ 1 key) ใน 1 key รับได้ 1 file
//    ผลลัพธ์หลังผ่าน multer upload ==> req.file ==> {}
// 2. upload.array ==> many file [] (กำหนดรับได้ 1 key) แต่ใน 1 key รับได้หลายรูป
//    ผลลัพธ์หลังผ่าน multer upload ==> req.files ==> {[{},{},{}]}
// 3. upload.fields([{}]) ==> (กำหนดรับได้หลาย key)
//    ผลลัพธ์หลังผ่าน multer upload ==> req.files ==> {[{},{}],[{},{}]}
