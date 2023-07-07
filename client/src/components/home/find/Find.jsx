import React from "react";
import "./find.css";
import { Link } from "react-router-dom";
const Find = () => {
  return (
    <div className="container-find">
      <h1>Find your perfect car</h1>
      <p>"Explore a world of car options. Start your car search with carGo."</p>
      <Link to="/carsforsale">
        <button>Get started</button>
      </Link>
    </div>
  );
};

export default Find;
