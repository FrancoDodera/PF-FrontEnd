import React from "react";
import "./Filters.css";
const Filters = () => {
  return (
    <div>
      <div className="container_filters">
        <div className="input-container--dropdown">
          <label>New/used</label>
          <select className="sds-text-field">
            <option>New &amp; used</option>
            <option>New &amp; certified</option>
            <option>Used</option>
            <option>Certified</option>
          </select>
        </div>
        <div className="input-container--dropdown">
          <label>Make</label>
          <select>
            <option>All makes</option>
            <optgroup label="Popular makes"></optgroup>
            <optgroup label="All makes"></optgroup>
          </select>
        </div>
        <div className="input-container--dropdown">
          <label>Model</label>
          <div className="select-container">
            <select>
              <option>All models</option>
            </select>
          </div>
        </div>
      </div>
      <div className="secondlayer">
        {" "}
        <div className="input-container--dropdown">
          {" "}
          <label>Location</label>
          <select>
            <option>Location</option>
          </select>
        </div>
        <div className="pricerselector">
          <label htmlFor="maxPrice">
            Price Range <br />
            $.0 - $3,000,000.00
          </label>
          <input type="range" min="0" max="100" step="1" />

          <div className="home-search__submit">
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
