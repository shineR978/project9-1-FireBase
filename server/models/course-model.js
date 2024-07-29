const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },

  //課程描述
  description: {
    type: String,
    required: true,
  },

  //價格
  price: {
    type: Number,
    required: true,
  },

  //講師
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  //這個講師的學生
  students: {
    type: [String],
    default: [],
  },
});

//編譯為一個名為 "Course" 的模型，並將其匯出
module.exports = mongoose.model("Course", courseSchema);
