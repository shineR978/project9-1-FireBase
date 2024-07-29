const mongoose = require("mongoose");
const fs = require("fs");

// 連接到你的數據庫
mongoose.connect("mongodb://127.0.0.1/mernDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 假設你的數據導出為JSON格式，並且你已經將其保存在同一目錄下名為accounts.json的文件中
const accountsData = JSON.parse(
  fs.readFileSync("../server/scripts/accounts.json", "utf8")
);

const courseAccountsData = JSON.parse(
  fs.readFileSync("../server/scripts/courseAccounts.json", "utf8")
);

console.log(accountsData);
// 假設你有一個User模型
const { user: User } = require("../models/index");
const { course: Course } = require("../models/index");

// 導入帳號數據
const importAccounts = async () => {
  try {
    await User.insertMany(accountsData);
    await Course.insertMany(courseAccountsData);
    console.log("帳號數據導入成功！");
    mongoose.disconnect();
  } catch (error) {
    console.error("導入帳號數據時發生錯誤：", error);
    mongoose.disconnect();
  }
};

importAccounts();
