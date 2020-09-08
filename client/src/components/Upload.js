import React, { useState } from "react";
import Nav from "./Nav";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { uploadFile } from "./api";

function Upload({ category, toggleProject, modalProject, location }) {
  const [Tittle, setTittle] = useState("");
  const [Category, setCategory] = useState("");
  const [Text, setText] = useState("");
  const [File, setFile] = useState("");
  const [Location, setLocation] = useState("");
  const [StartUpload, setStartUpload] = useState(false);
  const [Errors, setErrors] = useState({ status: false, error: "" });
  const [UploadedCompleted, setUploadedCompleted] = useState(false);
  const turnNoError = () => {
    setErrors({ status: false, error: "" });
  };

  const uploadFileLoc = async () => {
    setStartUpload(true);
    if (
      Tittle.length === 0 ||
      Category.length === 0 ||
      Text.length === 0 ||
      Location.length === 0
    ) {
      setErrors({ status: true, error: "Fields can not be empty " });
      setTimeout(() => {
        turnNoError();
      }, 2000);
      setStartUpload(false);
      return;
    }
    try {
      await uploadFile(Tittle, Text, Category, Location, File);
      setStartUpload(false);
      setUploadedCompleted(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log("error.message : ", error.message);
      setErrors({ status: true, error: "Something went wrong" });
      setTimeout(() => {
        turnNoError();
      }, 2000);
      setStartUpload(false);
    }
  };
  return (
    <div>
      <Modal isOpen={modalProject} toggle={toggleProject}>
        <ModalHeader toggle={toggleProject}>Upload News</ModalHeader>
        <ModalBody>
          <div style={{ width: "80%", margin: "auto" }}>
            <div className="form-group">
              <label for="exampleInputEmail1">Title</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Title"
                value={Tittle}
                onChange={(e) => {
                  setTittle(e.target.value);
                  turnNoError();
                }}
              />
            </div>

            <div className="form-group">
              <label for="exampleTextarea">Text Content</label>
              <textarea
                className="form-control"
                id="exampleTextarea"
                rows="6"
                value={Text}
                onChange={(e) => {
                  setText(e.target.value);
                  turnNoError();
                }}
              ></textarea>
            </div>

            <div className="form-group">
              <label for="exampleInputPassword1">Category</label>
              <select
                className="custom-select"
                value={Category}
                onChange={(e) => {
                  turnNoError();
                  setCategory(e.target.value);
                }}
              >
                <option selected="">Select from the list</option>
                {category.map((cate) => (
                  <option value={cate}>{cate}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label for="exampleInputPassword1">location</label>
              <select
                className="custom-select"
                value={Location}
                onChange={(e) => {
                  turnNoError();
                  setLocation(e.target.value);
                }}
              >
                <option selected="">Open this select menu</option>
                {location.map((cate) => (
                  <option value={cate}>{cate}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label for="exampleInputFile">Image</label>
              <input
                type="file"
                className="form-control-file"
                id="exampleInputFile"
                aria-describedby="fileHelp"
                onChange={(e) => {
                  turnNoError();
                  setFile(e.target.files[0]);
                }}
              />
              <small id="fileHelp" className="form-text text-muted">
                Please do upload only images
              </small>
            </div>

            <div style={{ textAlign: "center" }}>
              {!UploadedCompleted ? (
                <button
                  class={"btn btn-primary"}
                  onClick={() => {
                    uploadFileLoc();
                  }}
                  disabled={StartUpload}
                >
                  {!StartUpload ? "Upload" : "Uploading.."}
                </button>
              ) : (
                <p>Successfully uploaded! Posted once reviewed by admin.</p>
              )}

              <br />
              <br />
              {Errors.status ? (
                <div className="alert alert-dismissible alert-danger">
                  <button type="button" className="close" data-dismiss="alert">
                    &times;
                  </button>
                  {Errors.error}
                </div>
              ) : null}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Upload;

//   <div className="form-group">
//               <label for="exampleInputPassword1">Sun Category</label>
//               <select className="custom-select">
//                 <option selected="">Open this select menu</option>
//                 <option value="1">One</option>
//                 <option value="2">Two</option>
//                 <option value="3">Three</option>
//               </select>
//             </div>
