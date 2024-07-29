const Joi = require("joi");

//註冊規範
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required().valid("student", "instructor"),
  });

  //.validate 是Joi定義的方法，用來驗證資料是否符合規則
  return schema.validate(data);
};

//已有帳號規範
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  //.validate 是Joi定義的方法，用來驗證資料是否符合規則
  return schema.validate(data);
};

//講師規範
const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(255).required(),
    description: Joi.string().min(6).max(500).required(),
    price: Joi.number().min(10).max(9999).required(),
  });
  //.validate 是Joi定義的方法，用來驗證資料是否符合規則
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidation = courseValidation;
