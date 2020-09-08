import axios from "axios";
import config from "../config";

export const checkAuth = () => {
  return new Promise((resolve, reject) => {
    var token = JSON.parse(localStorage.getItem("token"));
    console.log("token : ", token);
    axios({
      method: "get",
      url: config.API_URL + "/user/auth",
      headers: {
        Authorization: "Bearer " + token,
      },
      //   data: postData,
    })
      .then((response) => {
        if (response.status === 200 || response.status == 204)
          resolve(response.data.payload.user);
      })
      .catch((error) => {
        reject(error);
      });

    // axios.get();
  });
};

export const getAllPosts = () => {
  return new Promise((resolve, reject) => {
    var token = JSON.parse(localStorage.getItem("token"));
    axios({
      method: "get",
      url: config.API_URL + "/post/all",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status == 204)
          resolve(response.data.payload.posts);
      })
      .catch((error) => {
        console.log("error : ", error);
        reject(error);
      });

    // axios.get();
  });
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    let postData = { email, password };
    axios({
      method: "post",
      url: config.API_URL + "/user/login",
      data: postData,
    })
      .then((response) => {
        if (response.status === 200 || response.status == 204) {
          localStorage.setItem("token", JSON.stringify(response.data.payload));
          resolve();
        }
      })
      .catch((error) => {
        console.log("error : ", error);
        reject(error);
      });
    // axios.get();
  });
};

export const signup = (email, password, firstName, lastName) => {
  console.log("firstName, lastName : ", firstName, lastName);
  return new Promise((resolve, reject) => {
    let postData = {
      email,
      password,
      firstName,
      lastName,
      passwordConf: password,
    };
    axios({
      method: "post",
      url: config.API_URL + "/user/signup",
      data: postData,
    })
      .then((response) => {
        if (response.status === 200 || response.status == 204) {
          localStorage.setItem("token", JSON.stringify(response.data.payload));
          resolve();
        }
      })
      .catch((error) => {
        console.log("error : ", error);
        reject(error);
      });
    // axios.get();
  });
};

export const uploadFile = (Title, Text, Category, Location, File) => {
  return new Promise((resolve, reject) => {
    var token = JSON.parse(localStorage.getItem("token"));
    console.log("uploading with data : ", Category, Location);
    var postData = new FormData();

    postData.append("category", Category);
    postData.append("subCategory", "Category");
    postData.append("title", Title);
    postData.append("text", Text);
    postData.append("location", Location);
    postData.append("postImage", File);

    axios({
      method: "post",
      url: config.API_URL + "/post/",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: postData,
      mimeType: "multipart/form-data",
    })
      .then((response) => {
        if (response.status === 200 || response.status == 204) {
          //   localStorage.setItem("token", JSON.stringify(response.data.payload));
          resolve();
        }
      })
      .catch((error) => {
        console.log("error : ", error);
        reject(error);
      });
  });
};

export const allowPost = (postId) => {
  var token = JSON.parse(localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: config.API_URL + "/admin/post/allow/" + postId,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          resolve(true);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
