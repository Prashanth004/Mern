import React, { useState } from "react";

const FilterButton = ({ value, addFunc }) => {
  const [Clicked, setClicked] = useState(false);
  const toggleSelect = () => {
    setClicked(!Clicked);
  };
  return (
    <button
      style={{ margin: "5px" }}
      onClick={() => {
        toggleSelect();
        addFunc(value);
      }}
      className={!Clicked ? "btn btn-light" : "btn btn-danger"}
    >
      {value}
    </button>
  );
};
const LocationFilters = ({ location, addLocation, removeLocation }) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {location.map((loc) => (
          <FilterButton value={loc} addFunc={addLocation} />
          // <span>{loc}</span>
        ))}
      </div>
    </div>
  );
};
const CategoryFilter = ({ category, addCategory, removeCategory }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {category.map((cat) => (
        <FilterButton value={cat} addFunc={addCategory} />
        // <span>{cat}</span>
      ))}
    </div>
  );
};

function Filter({ category, location, addCategory, addLocation }) {
  return (
    <div
      className="card mb-3"
      style={{
        minHeight: "150px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <LocationFilters location={location} addLocation={addLocation} />
      <br />
      <CategoryFilter category={category} addCategory={addCategory} />
    </div>
  );
}

export default Filter;
