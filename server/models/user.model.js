const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },

  password: { type: String, required: true },

  //角色
  role: { type: String, enum: ["student", "instructor"], required: true },

  date: {
    type: Date,
    default: Date.now,
  },
});

//this 是指向當前的用戶
userSchema.methods.isStudent = function () {
  return this.role == "student";
};

//this 是指向當前的用戶
userSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};

//比較密碼 與數據庫中的密碼是否一致
userSchema.methods.comparePassword = async function (password, cb) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e) {
    return cb(e, result);
  }
};

//使用 userSchema 模組儲存密碼
userSchema.pre("save", async function (next) {
  //
  // 如果是新用戶或是修改了密碼的用戶
  if (this.isNew || this.isModified("password")) {
    //
    // 在数据中进行密码加密处理
    const hashValue = await bcrypt.hash(this.password, 10);

    //將加密處理後的值儲存到使用者的密碼欄位中
    this.password = hashValue;
  }
  next();
});

//編譯為一個名為 "User" 的模型，並將其匯出
module.exports = mongoose.model("User", userSchema);
