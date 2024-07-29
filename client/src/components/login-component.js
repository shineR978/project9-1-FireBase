import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth-service";

//有登入當前使用者
const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  //取得使用者輸入的值
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  //取得使用者輸入的值
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //送出註冊資料，進行驗證
  const handlelogin = async () => {
    try {
      let response = await AuthService.login(email, password);

      //提供在瀏覽器上進行本地儲存的 API，將 response.data 轉換為 JSON 字符串
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("登入成功，您將被從新導向個人資料頁面");
      setCurrentUser(AuthService.getCurrentUser());
      navigate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      {/* ------------------------------------------------------------------ */}
      {/* JavaScript 的條件判斷式，如果message不是為空，則執行後面的程式碼*/}
      {message && <div className="alert alert-danger">{message}</div>}
      {/* ------------------------------------------------------------------ */}

      <div>
        <div className="form-group">
          <label htmlFor="username">電子信箱：</label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <button onClick={handlelogin} className="btn btn-primary btn-block">
            <span>登入系統</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
