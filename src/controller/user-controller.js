const userService = require("../services/user-service");
const uploadService = require("../services/upload-service");

const userController = {};
userController.updateProfileOrCoverImage = async (req, res, next) => {
  try {
    const data = {}; // ต้องการให้ผลลัพธ์เป็น {profileImage: path, coverImage: path} เพื่อจะได้ส่งไป upload ที่ database
    if (req.files.profileImage) {
      data.profileImage = req.files.profileImage[0].path;
      const result = await uploadService.upload(req.files.profileImage[0].path);
      console.log(result);
    }
    if (req.files.coverImage) {
      data.coverImage = req.files.coverImage[0].path;
    }

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
  }
};

module.exports = userController;
