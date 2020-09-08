import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Login from "./Login";
import Upload from "./Upload";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { checkAuth, getAllPosts } from "./api";
import PostsDiv from "./Posts";
import Filter from "./Filter";
import "./Home.css";
function Home() {
  const category = [
    "Social",
    "Education",
    "Science And Technology",
    "Society & culture",
    "Civic",
    "Engagement",
    "Sports",
    "Business",
    "Regional news",
    "World news",
  ];

  const location = ["Bangalore", "Mysore", "Mangalore", "Thumkur"];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [User, setUser] = useState({});
  const [OriginalPost, setOriginalPost] = useState([]);
  const [Posts, setPosts] = useState([]);

  const [CategoryFilter, setCategoryFilter] = useState([]);
  const [LocationFilter, setLocationFilter] = useState([]);
  const [Filtering, setFiltering] = useState(false);

  const addCategory = (cat) => {
    setFiltering(true);
    const isAlreadyPresent = CategoryFilter.find((catEle) => catEle === cat);
    if (!isAlreadyPresent) {
      let categories = CategoryFilter;
      categories.push(cat);
      setCategoryFilter(categories);
      console.log("CategoryFilter : ", CategoryFilter);
      filterPosts();
    } else {
      let categories = CategoryFilter.filter((catEle) => catEle !== cat);
      setCategoryFilter(categories);
    }
  };
  const addLocation = (loc) => {
    setFiltering(true);
    const isAlreadyPresent = LocationFilter.find((locEle) => locEle === loc);
    if (!isAlreadyPresent) {
      let locations = LocationFilter;
      locations.push(loc);
      setLocationFilter(locations);
      filterPosts();
    } else {
      let locations = LocationFilter.filter((locEle) => locEle !== loc);
      setLocationFilter(locations);
    }
  };

  useEffect(() => {
    // action on update of movies
    filterPosts();
  }, [LocationFilter, CategoryFilter]);

  const removeCategory = (cat) => {
    setFiltering(true);
    let categories = CategoryFilter;
    categories.forEach((catEle) => catEle !== cat);
    setCategoryFilter(categories);
    filterPosts();
  };
  const removeLocation = (loc) => {};

  const filterPosts = () => {
    console.log("OriginalPost : ", OriginalPost);
    console.log("LocationFilter : ", LocationFilter);
    let newPosts = OriginalPost.filter(
      (postEle) =>
        (CategoryFilter.length > 0
          ? CategoryFilter.find((catEle) => postEle.category === catEle)
          : true) &&
        (LocationFilter.length > 0
          ? LocationFilter.find((locEle) => locEle === postEle.location)
          : true)
    );
    setPosts(newPosts);
    setFiltering(false);
  };

  const [modalLogin, setModalLogin] = useState(false);
  const toggleLogin = () => setModalLogin(!modalLogin);

  const [modalProject, setModalProject] = useState(false);
  const toggleProject = () => setModalProject(!modalProject);

  const filterPost = () => {};

  useEffect(() => {
    let basicCheck = async () => {
      try {
        let user = await checkAuth();
        setUser(user);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
      let posts = await getAllPosts();
      posts.reverse();
      setPosts(posts);
      setOriginalPost(posts);
    };
    basicCheck();
  }, []);
  return (
    <div>
      <Nav isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} User={User} />
      <div className="jumbotron">
        <Login toggleLogin={toggleLogin} modalLogin={modalLogin} />

        <Upload
          toggleProject={toggleProject}
          modalProject={modalProject}
          category={category}
          location={location}
        />
        <Filter
          addCategory={addCategory}
          addLocation={addLocation}
          category={category}
          location={location}
        />
        {!Filtering ? (
          <PostsDiv Posts={Posts} />
        ) : (
          <div>
            <p>Filtering..</p>
          </div>
        )}
        {isLoggedIn ? (
          <div
            className="float"
            onClick={() => {
              toggleProject();
            }}
          >
            <div className="my-float">
              <span style={{ fontSize: "25px" }}>
                <strong> +</strong>
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;

//   <i class="fa fa-plus></i>
