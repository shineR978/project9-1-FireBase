//express Node.js 的快速、極簡的 Web 開發框架
const express = require("express");
//express必須執行app()才能使用伺服器端的功能
const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
//文件中的变量加载到 process.env 中
dotenv.config();

const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;

const passport = require("passport");
//使用在passport.js中設定的passport的function執行passport套件
require("./config/passport")(passport);

//CORS（跨域资源共享）是一种Web安全机制，支持跨域请求。
const cors = require("cors");

//------------------------------------------------------------------

//連接到MongoDB
mongoose
  .connect("mongodb://127.0.0.1/mernDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

//Middlewares 表單解析
app.use(express.json());
//解析HTML表單 重新編碼input內的資料 讓後端比較好讀取
app.use(express.urlencoded({ extended: true }));

//使用cors套件
app.use(cors());

//有處理關於與登入和註冊的路由 是取得jwt
app.use("/api/user", authRoute);

//有關於課程相關的路由  需要有驗證客戶端有 jwt 才能使用課程
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

app.listen(8080, () => {
  console.log("Server is running at port 8080");
});
