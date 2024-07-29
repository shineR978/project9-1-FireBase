import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course-service";

//有登入當前使用者
const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate();
  const hanldeTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  ////取得使用者搜尋input裡面的值
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //點擊註冊課程
  const handleEnroll = (e) => {
    CourseService.enrollCourses(e.target.id)
      .then(() => {
        window.alert("課程已註冊成功，將重新為您導向課程頁面");
        navigate("/course");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能註冊課程</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={hanldeTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}

      {/* 有當前用戶 且 身分是講師 */}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>只有學生可以註冊課程</h1>
        </div>
      )}

      {/* 有當前用戶 且 身分是學生 */}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={handleChangeInput}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            搜尋課程
          </button>
        </div>
      )}

      {/* 有當前用戶 且 搜尋不是null 且 有輸入搜尋內容 */}
      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <h5>以下是從資料庫取得的所有課程</h5>
          {searchResult.map((course) => {
            return (
              <div
                key={course._id}
                className="card"
                style={{ width: "18rem ", margin: "1rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">課程名稱:{course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數:{course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格:{course.price}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    講師:{course.instructor.username}
                  </p>
                  <a
                    herf="#"
                    //按下"註冊課程" 就會去找課程id
                    id={course._id}
                    className="card-text btn btn-primary"
                    onClick={handleEnroll}
                  >
                    註冊課程
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
