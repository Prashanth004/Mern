import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { login, signup } from "./api";

const LoginForm = ({ setIsLogin }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Errors, setErrors] = useState({ status: false, error: "" });

  const [LoginStarted, setLoginStarted] = useState(false);

  const loginLoc = async () => {
    setLoginStarted(true);
    console.log("Password.length : ", Password.length);
    if (Password.length === 0 || Email.length === 0) {
      setLoginStarted(false);
      setErrors({
        status: true,
        error: "Email and password fields should not be empty",
      });

      setTimeout(() => {
        setErrors({
          status: false,
          error: "",
        });
      }, 3000);
    } else {
      try {
        await login(Email, Password);

        window.location.reload();
      } catch (error) {
        console.log(error);
        setLoginStarted(false);

        setErrors({
          status: true,
          error: "Email or password did not match",
        });

        setTimeout(() => {
          setErrors({
            status: false,
            error: "",
          });
        }, 3000);
      }
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          placeholder="Email"
          value={Email}
          onChange={(e) => {
            setErrors({
              status: false,
              error: "",
            });
            setEmail(e.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={Password}
          onChange={(e) => {
            setErrors({
              status: false,
              error: "",
            });
            setPassword(e.target.value);
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => {
            loginLoc();
          }}
          class={!LoginStarted ? "btn btn-primary" : "btn btn-default"}
          disabled={LoginStarted}
        >
          {!LoginStarted ? "Login" : "Logging in.."}
        </button>
        <br />
        <br />

        <span
          onClick={() => {
            setIsLogin(false);
          }}
        >
          {" "}
          Sign up
        </span>
        {Errors.status ? (
          <div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            {Errors.error}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const SignUpForm = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Errors, setErrors] = useState({ status: false, error: "" });
  const [PasswordConf, setPasswordConf] = useState("");

  const [SignupStarted, setSignupStarted] = useState(false);

  const setErrorFalse = () => {
    setErrors({
      status: false,
      error: "",
    });
  };

  const signupLoc = async () => {
    setSignupStarted(true);
    console.log("Password.length : ", Password.length);
    if (
      Password.length === 0 ||
      Email.length === 0 ||
      FirstName.length === 0 ||
      LastName.length === 0
    ) {
      setSignupStarted(false);
      setErrors({
        status: true,
        error: "None fields can be empty",
      });
      setTimeout(() => {
        setErrorFalse();
      }, 3000);
    } else if (Password !== PasswordConf) {
      setSignupStarted(false);
      setErrors({
        status: true,
        error: "Passwords do not match",
      });
      setTimeout(() => {
        setErrorFalse();
      }, 3000);
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
      try {
        await signup(Email, Password, FirstName, LastName);

        window.location.reload();
      } catch (error) {
        console.log(error);
        setSignupStarted(false);

        setErrors({
          status: true,
          error: "Email already exists",
        });

        setTimeout(() => {
          setErrorFalse();
        }, 3000);
      }
    } else {
      setSignupStarted(false);
      setErrors({
        status: true,
        error: "Invalid Email",
      });
      setTimeout(() => {
        setErrorFalse();
      }, 3000);
    }
  };
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <div class="form-group">
        <label for="exampleInputEmail1">First Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          placeholder="First Name"
          value={FirstName}
          onChange={(e) => {
            setErrorFalse();
            setFirstName(e.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          placeholder="Last Name"
          value={LastName}
          onChange={(e) => {
            setErrorFalse();
            setLastName(e.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          placeholder="Email"
          value={Email}
          onChange={(e) => {
            setErrorFalse();
            setEmail(e.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={Password}
          onChange={(e) => {
            setErrorFalse();
            setPassword(e.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password again</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={PasswordConf}
          onChange={(e) => {
            setErrorFalse();
            setPasswordConf(e.target.value);
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => {
            signupLoc();
          }}
          className="btn btn-primary"
        >
          Signup
        </button>
        <br />
        {Errors.status ? (
          <div
            style={{ marginTop: "15px" }}
            class="alert alert-dismissible alert-danger"
          >
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            {Errors.error}
          </div>
        ) : null}
      </div>
    </div>
  );
};

function LoginMain({ toggleLogin, modalLogin }) {
  const [IsLogin, setIsLogin] = useState(true);

  useEffect(() => {
    setIsLogin(true);
  }, [modalLogin]);

  return (
    <div>
      <Modal isOpen={modalLogin} toggle={toggleLogin}>
        <ModalHeader toggle={toggleLogin}>
          {IsLogin ? "Login" : "Signup"}
        </ModalHeader>
        <ModalBody>
          {IsLogin ? <LoginForm setIsLogin={setIsLogin} /> : <SignUpForm />}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LoginMain;

//  <div class="form-group">
//               <label for="exampleInputFile">File input</label>
//               <input type="file" id="exampleInputFile" />
//               <p class="help-block">Example block-level help text here.</p>
//             </div>
