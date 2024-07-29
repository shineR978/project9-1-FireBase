import React, { useState } from "react";

//幫助使用者重新導向
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth-service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");

  //取得input裡面的值
  const handleUsername = (e) => {
    setUserName(e.target.value);
  };

  //取得input裡面的值
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  //取得input裡面的值
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //取得input裡面的值
  const handleRole = (e) => {
    setRole(e.target.value);
  };

  //將input裡面的值，進行驗證並導向登入頁面
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("您已經成功註冊，將會導向登入頁面");

        //跳出alert後執行導向
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {/* JavaScript 的條件判斷式，如果message不是為空，則執行後面的程式碼*/}
        {message && <div className="alert alert-danger">{message}</div>}
        {/* ------------------------------------------------------------------ */}

        <div>
          <label htmlFor="username">用戶名稱:</label>
          <input
            onChange={handleUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>

        <br />
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
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
            placeholder="長度至少超過6個英文或數字"
          />
        </div>

        <br />
        <div className="form-group">
          <label htmlFor="role">身份：</label>
          <select
            onChange={handleRole}
            className="form-control"
            name="role"
            id="role"
          >
            <option value="">請選擇身份</option>
            <option value="student">student</option>
            <option value="instructor">instructor</option>
          </select>
        </div>

        <br />

        <button onClick={handleRegister} className="btn btn-primary">
          <span>註冊會員</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
