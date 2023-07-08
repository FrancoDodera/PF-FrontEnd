import React, { useEffect } from "react";
import "./Filters.css";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { carFilters, getAllBrands, getAllCategories } from "../../redux/actions";
const Filters = () => {
  const dispatch=useDispatch();
  const allBrands=useSelector(state=>state.allBrands)
  const allCategories=useSelector(state=>state.allCategories)
  const [filters,setFilters]=useState({
    carStatus:'all',
    carPriceMin:0,
    carPriceMax:1000000,
    carYearMin:0,
    carYearMax:2024,
    brand:'all',
    category:'all'
  })
  const handlerFilters=(event)=>{
    const name=event.target.name
    let value=event.target.value
    if(name=="carPriceMin"){
      if(value=="" || value < 0){
        value=0
      }
    }
    if(name=="carPriceMax"){
      if(value=="" || value < 0){
        value=1000000
      }
    }
    if(name=="carYearMin"){
      if(value=="" || value < 0){
        value=0
      }
    }
    if(name=="carYearMax"){
      if(value=="" || value < 0){
        value=2024
      }
    }
      setFilters({
        ...filters,
        [name]:value
      })
  }
  const submitFilters=(event)=>{
    dispatch(carFilters(filters))
  }
  useEffect(()=>{
    if(allBrands.length==0){
      dispatch(getAllBrands())
    }
    if(allCategories.length==0){
      dispatch(getAllCategories())
    }
  },[])
  return (
    <div>
      <div className="container_filters">
        <div className="input-container--dropdown">
          <label>Status</label>
          <select name="carStatus" onChange={handlerFilters} className="sds-text-field">
            <option value='all'>New &amp; used</option>
            <option value='new'>New</option>
            <option value='used'>Used</option>
          </select>
        </div>
        <div className="input-container--dropdown">
          <label>Make</label>
          <select name="brand" onChange={handlerFilters}>
            <option value='all'>All makes</option>
            {allBrands?.map((elem)=>{
              return(
                <option key={elem._id} value={elem._id}>{elem.name}</option>
              )
            })}
          </select>
        </div>
        <div className="input-container--dropdown">
          <label>Category</label>
          <div className="select-container">
            <select name="category" onChange={handlerFilters}>
              <option value='all'>All models</option>
              {allCategories?.map((elem)=>{
              return(
                <option key={elem._id} value={elem._id}>{elem.name}</option>
              )
            })}
            </select>
          </div>
        </div>
      </div>
      <div className="secondlayer">
        {" "}

        <div className="pricerselector">
          <label htmlFor="maxPrice">
            Price Range <br />
            $.{filters.carPriceMin} - $.{filters.carPriceMax}
          </label>
          <input name="carPriceMin" onChange={handlerFilters} type="Number" placeholder="minimal price" />
          <input name="carPriceMax" onChange={handlerFilters} type="Number" placeholder="Maximum price" />
        </div>
        <div className="pricerselector">
          <label htmlFor="maxPrice">
            Year Range <br />
            {filters.carYearMin} -{filters.carYearMax}
          </label>
          <input name="carYearMin" onChange={handlerFilters} type="Number" placeholder="minimum year" />
          <input name="carYearMax" onChange={handlerFilters} type="Number" placeholder="maximum year" />
        </div>
      </div>
      <div>
          <button onClick={submitFilters}>Filter</button>
        </div>
    </div>
  );
};

export default Filters;
