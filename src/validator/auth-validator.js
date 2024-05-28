const Joi = require("joi");
const registerSchema = Joi.object({
  firstName: Joi.string().required().trim().min(8),
  lastName: Joi.string().required().trim().min(8),
  emailOrMobile: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/),
  ]),
  password: Joi.string().required().pattern(new RegExp("^[0-9a-zA-Z]{5,}$")),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
});

const test = {
  firstName: "df4sd5f4ds5f",
  lastName: "5esf45dfddf",
  emailOrMobile: "0912598756",
  password: "123456",
  confirmPassword: "123456",
};
const { value, error } = registerSchema.validate(test);
console.log(value);
console.log(error);
