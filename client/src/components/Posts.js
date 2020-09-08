import React from "react";
import moment from "moment";

const SinglePost = ({ post }) => {
  console.log("post : ", post);
  return (
    <div>
      <div className="card mb-3" style={{ height: "650px" }}>
        <p className="card-header">{post.title}</p>

        {post.image.includes("mkv") ||
        post.image.includes("mp4") ||
        post.image.includes("webm") ? (
          <video
            style={{ height: "250px", width: "100%", display: "block" }}
            controls
            autoplay
            src={"http://localhost:4000/uploads/" + post.image}
          />
        ) : (
          <img
            style={{ height: "250px", display: "block" }}
            src={"http://localhost:4000/uploads/" + post.image}
            //   src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
            alt="News image"
          />
        )}
        <div
          className="card-body"
          style={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          <p style={{ textOverflow: "ellipsis" }} className="card-text">
            {post.text}
          </p>
        </div>
        <div className="card-footer text-muted">
          {moment(post.created).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
      </div>
    </div>
  );
};

const Posts = ({ Posts }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Recent News</h3>
      <br />
      <div
        style={{
          minHeight: "100vh",
          width: "95%",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "start",
        }}
      >
        {Posts.map((post) =>
          post.allowed ? (
            <div style={{ padding: "10px", width: "400px" }}>
              <SinglePost post={post} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Posts;
