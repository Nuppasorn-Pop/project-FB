const fs = require("fs/promises");

const userService = require("../services/user-service");
const uploadService = require("../services/upload-service");

const userController = {};
userController.updateProfileOrCoverImage = async (req, res, next) => {
  try {
    const promises = [];
    if (req.files.profileImage) {
      const result = uploadService
        .upload(req.files.profileImage[0].path)
        .then((url) => ({ url, key: "profileImage" }));
      promises.push(result);
    }
    if (req.files.coverImage) {
      const result = uploadService
        .upload(req.files.coverImage[0].path)
        .then((url) => ({ url, key: "coverImage" }));
      promises.push(result);
    }

    const result = await Promise.all(promises);
    // promises = [promise1,promise2]
    // allResult ===> [resolvePromise1,resolvepromise2] or [resolvePromise1] or [resolvepromise2]
    console.log(result);
    const data = result.reduce((acc, el) => {
      acc[el.key] = el.url;
      return acc;
    }, {});
    // ต้องการให้ผลลัพธ์เป็น {profileImage: path, coverImage: path} เพื่อจะได้ส่งไป upload ที่ database

    await userService.updateUserById(data, req.user.id);
    res.status(200).json(data);

    // console.log(req.file);
    // console.log("************************");
    // console.log(req.files);
    // console.log("------------------------");
    // console.log(req.body);
    // res.json("usercontroller");
  } catch (err) {
    next(err);
  } finally {
    if (req.files.profileImage) {
      fs.unlink(req.files.profileImage[0].path);
    }
    if (req.files.coverImage) {
      fs.unlink(req.files.coverImage[0].path);
    }
  }
};

module.exports = userController;
