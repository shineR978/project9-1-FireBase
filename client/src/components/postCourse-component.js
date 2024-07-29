import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course-service";

//講師新增課程
const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  //沒有登入，會導向登入頁面
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  //取得講師輸入的input標題
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  //取得講師輸入的textarea標題
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };

  //取得講師輸入的input標題
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  //講師點擊新增課程後，儲存輸入的資料
  const postCourse = () => {
    CourseService.post(title, description, price)
      .then(() => {
        window.alert("新課程已創建成功");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>在發布新課程之前，您必須先登錄。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            帶我進入登錄頁面。
          </button>
        </div>
      )}

      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <p>只有講師可以發布新課程。</p>
        </div>
      )}

      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <label htmlFor="exampleforTitle">課程標題：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeTitle}
          />

          <br />

          <label htmlFor="exampleforContent">內容：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeDesciption}
          />

          <br />

          <label htmlFor="exampleforPrice">價格：</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangePrice}
          />

          <br />

          <button className="btn btn-primary" onClick={postCourse}>
            交出表單
          </button>

          <br />
          <br />

          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;
