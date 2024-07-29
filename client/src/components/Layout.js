import { Outlet } from "react-router-dom";
import Nav from "./nav-component";

//有登入當前使用者
const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </>
  );
};

export default Layout;
