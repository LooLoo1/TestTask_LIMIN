import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Logo from "./Logo";
import Basket from "./Basket";
import Avatar from "./Avatar";
const Layout = () => {
  const { user } = useSelector((state) => state.authReducer);
  return (
    <div className="layout">
      <header>
        <Logo />
        {!user && (
          <div className="right-button">
            <Link to="/login">Log In</Link>
            <Link to="/create">Create Account</Link>
          </div>
        )}
        {user && (
          <div className="right-button">
            <Link to="/basket">
              <Basket />
            </Link>
            <Link to="/office">
              <Avatar />
            </Link>
          </div>
        )}
      </header>
      <div className="conteiner">
        <Outlet />
      </div>
      <footer>
        <span>Privacy Policy · ©2023 LUMIN </span>
      </footer>
    </div>
  );
};

export default Layout;
