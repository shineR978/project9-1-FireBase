//導向由路 /建立一個呼叫router由路器 使用導向由路
const router = require("express").Router();

//使用Joi設定的Validation.js文件規定 導向atuh的路由
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;

//使用User模組 註冊使用者
const User = require("../models").user;

const jwt = require("jsonwebtoken");

//只是要知道像在要接受auth的請求
router.use((req, res, next) => {
  console.log("正在接受一個有關auth的請求");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("成功連接到textAPI");
});

//註冊
router.post("/register", async (req, res) => {
  //確認輸入資料是否有符合規定
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //確認email是否已經註冊過
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email已註冊過");

  //新用戶
  let { username, email, password, role } = req.body;
  let newUser = new User({ username, email, password, role });

  try {
    let savedUser = await newUser.save();

    return res.send({ msg: "註冊成功", savedUser });
  } catch (e) {
    return res.status(500).send("無法儲存使用者");
  }
});

//登入
router.post("/login", async (req, res) => {
  //確認輸入資料是否有符合規定
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //確認email是否已經註冊過
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) return res.status(401).send("無法找到使用者");

  //確認密碼是否正確
  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);
    if (isMatch) {
      //製作 json web token
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        msg: "登入成功",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  });
});

module.exports = router;
