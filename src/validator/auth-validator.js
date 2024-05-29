const Joi = require("joi");

exports.registerSchema = Joi.object({
  firstName: Joi.string().required().trim().min(8),
  lastName: Joi.string().required().trim().min(8),
  emailOrMobile: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/),
  ]).strip(),
  password: Joi.string().required().pattern(new RegExp("^[0-9a-zA-Z]{5,}$")),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .required()
    .strip(),
  // ถ้า confirm password ตรงกับ password มันจะ strip() confirmPassword ให้  เพราะ backend ไม่ได้นำไปใช้ต่อ ใช้แต่ password

  // Validate and sanitize data
  email: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().email({ tlds: false }),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
  mobile: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().pattern(/^[0-9]{10}$/),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
});

exports.loginSchema = Joi.object({
  emailOrMobile: Joi.string().required(),
  password: Joi.string().required(),
});

// -------------------------------------- test joi -------------------------------------------
// const test = {
//   firstName: "df4sd5f4ds5f",
//   lastName: "5esf45dfddf",
//   emailOrMobile: "aa@mail.com",
//   password: "123456",
//   confirmPassword: "123456",
//   //   email: "sdasds@mail.com", ==> "email" is not allowed' เพราะว่าใส่ .forbidden() มันจะไปดักไม่ให้มีการรับ email key เพราะ email จะไปรับค่า value จาก "emailOrMobile"
// };
// const { value, error } = registerSchema.validate(test);
// console.log(value);
// console.log(error);
