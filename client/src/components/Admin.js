import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { checkAuth, getAllPosts } from "./api";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";
import config from "../config";
import { allowPost } from "./api";

const SinglePost = ({ post }) => {
  const [StartAllow, setStartAllow] = useState(false);
  const [Errors, setErrors] = useState(false);
  const [PostAllowed, setPostAllowed] = useState(false);
  const allowPostLoc = async (postId) => {
    try {
      setStartAllow(true);
      await allowPost(postId);
      setStartAllow(false);
      setPostAllowed(true);
    } catch (error) {
      setStartAllow(true);
      setErrors(true);
    }
  };
  return (
    <div>
      <div className="card mb-3">
        <div
          className="card-header"
          style={{
            textAlign: "left",
            display: "grid",
            gridTemplateColumns: "50% 50%",
          }}
        >
          <p>
            {" "}
            <b>Title </b>: {post.title}
          </p>
          <div style={{ textAlign: "right" }}>
            {moment(post.created).format("MMMM Do YYYY, h:mm:ss a")}
          </div>
        </div>

        <div
          className="card-body"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            textAlign: "left",
          }}
        >
          <b>Text </b>:
          <p style={{ textOverflow: "ellipsis" }} className="card-text">
            {post.text}
          </p>
          <br />
          <span>
            <b>Category : </b>
            {post.category}
          </span>
          <br />
          <span>
            <b>Location : </b>
            {post.location}
          </span>
        </div>

        <div className="card-footer text-muted" style={{ textAlign: "right" }}>
          {!post.allowed && !PostAllowed ? (
            <button
              onClick={() => {
                allowPostLoc(post._id);
              }}
              className="btn btn-primary"
              disabled={StartAllow}
            >
              {" "}
              {!StartAllow ? "Allow" : "Processing"}
            </button>
          ) : (
            <p>Post allowed</p>
          )}
        </div>
      </div>
    </div>
  );
};

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Posts, setPosts] = useState([]);
  const [User, setUser] = useState({});
  const [authChecked, setauthChecked] = useState(false);
  useEffect(() => {
    if (window.location.pathname.split("/")[2] !== config.ADMIN_PASSWORD) {
      setauthChecked(true);
      return setIsLoggedIn(false);
    }

    let basicCheck = async () => {
      try {
        let user = await checkAuth();
        setUser(user);
        setIsLoggedIn(true);
      } catch (error) {
        return setIsLoggedIn(false);
      }
      setauthChecked(true);
      let posts = await getAllPosts();
      posts.reverse();
      setPosts(posts);
    };
    basicCheck();
    console.log(
      "window.location.pathname : ",
      window.location.pathname.split("/"),
      config.ADMIN_PASSWORD
    );
  }, []);
  return authChecked ? (
    isLoggedIn ? (
      <div style={{ textAlign: "center" }}>
        <Nav isLoggedIn={true} toggleLogin={() => {}} User={User} />
        <div className="jumbotron" style={{ textAlign: "center" }}>
          <br />
          <br />
          <h2>Admin Console : </h2>
          <br />
          <div style={{ width: "80%", margin: "auto" }}>
            {" "}
            {Posts.map((pos) => (
              <SinglePost post={pos} />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div style={{ height: "99vh", paddingTop: "30vh", textAlign: "center" }}>
        {" "}
        <h2>Admin authentication failed!</h2>
      </div>
    )
  ) : (
    <div style={{ height: "99vh", paddingTop: "30vh", textAlign: "center" }}>
      {" "}
      <h2>Logging in as Admin!</h2>
    </div>
  );
}

export default Admin;
// className="btn btn-light"
