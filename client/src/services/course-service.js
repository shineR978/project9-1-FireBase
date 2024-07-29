import axios from "axios";
const API_URL = "http://localhost:8080/api/courses";

class CourseService {
  //已登入為講師 在本到找token 要新增課程
  post(title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      {
        title,
        description,
        price,
      },
      { headers: { Authorization: token } }
    );
  }

  //找到學生註冊的課程
  getEnrolledCourse(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/student/" + _id, {
      headers: { Authorization: token },
    });
  }

  //請求是尋找講師id時;
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: { Authorization: token },
    });
  }

  //請求是講師刪除課程;
  deleteCourse(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/" + _id, {
      headers: { Authorization: token },
    });
  }

  //請求是講師修改課程
  //postman API 要修改內容的參數
  patchCourse(_id, title, description, price) {
    let token;
    // 從localStorage中獲取用戶token
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    // 發送PATCH請求到API
    return axios.patch(
      API_URL + "/" + _id,
      {
        title,
        description,
        price,
      },
      { headers: { Authorization: token } }
    );
  }

  //請求是尋找課程名稱
  getCourseByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/findByName/" + name, {
      headers: { Authorization: token },
    });
  }

  //請求註冊課程id
  enrollCourses(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/enroll/" + _id,
      {},
      {
        headers: { Authorization: token },
      }
    );
  }
}

export default new CourseService();
