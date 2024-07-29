import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course-service";

const PatchCourseComponent = ({ currentUser }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id"); // 檢查課程ID ?id=668d72640a2278c2f8c6cf8d"
  // console.log(id);

  // const [courseData, setCourseData] = useState([]); //陣列
  const [courseData, setCourseData] = useState({}); //json

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CourseService.get(_id)
          .then((data) => {
            setCourseData(data.data);
            var _filterData = data.data.filter((course) => course._id === id); //[{篩選到的資料}] //filter=*
            setTitle(_filterData[0].title);
            setDescription(_filterData[0].description);
            setPrice(_filterData[0].price);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CourseService.getEnrolledCourse(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

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
  const updateCourse = () => {
    // console.clear();
    // foundData(...courseData);

    // course-server內 設定的function
    CourseService.patchCourse(
      // courseData._id,
      // courseData.title,
      // courseData.description,
      // courseData.price
      // course-server內的API需要參數
      id,
      title,
      description,
      price
    )
      .then(() => {
        console.log("更新成功");
        window.alert("課程已更新成功");
        navigate("/course");
      })
      .catch((error) => {
        console.log("更新失敗" + error.response);
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

      {currentUser && courseData && courseData.length != 0 && (
        <div className="form-group">
          <label htmlFor="exampleforTitle">修改課程標題：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            value={title}
            onChange={handleChangeTitle}
          />

          <br />

          <label htmlFor="exampleforContent">修改課程內容：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            value={description}
            name="content"
            onChange={handleChangeDesciption}
          />

          <br />

          <label htmlFor="exampleforPrice">修改課程價格：</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            value={price}
            onChange={handleChangePrice}
          />

          <br />

          <button className="btn btn-outline-info" onClick={updateCourse}>
            修改表單
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

export default PatchCourseComponent;
