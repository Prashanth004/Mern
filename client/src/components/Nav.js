import React from "react";

import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../bootstrap.min.css";

function Nav({ isLoggedIn, toggleLogin, User }) {
  const logout = () => {
    localStorage.setItem("token", JSON.stringify(""));
    window.location.reload();
  };
  return (
    <div>
      <nav
        style={{ height: "70px" }}
        className="navbar navbar-expand-md navbar-dark bg-primary"
      >
        <Link className="navbar-brand" to="/">
          Citizen Journalism
        </Link>
       

        <ul className="navbar-nav mr-auto"></ul>
        <div className="form-inline my-2 my-lg-0">
          {isLoggedIn ? (
            <div className="nav-item">
              <span style={{ color: "white" }} className="nav-link">
                {User.firstName + " " + User.lastName}
              </span>
            </div>
          ) : null}
          <div to="/login" className="nav-item">
            <span
              style={{ color: "white" }}
              className="nav-link"
              onClick={() => {
                isLoggedIn ? logout() : toggleLogin();
              }}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
