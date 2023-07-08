import React from "react";
import { useDispatch } from "react-redux";
import { getAllCars } from "../../redux/actions";
import styles from './Landing.module.css';
import { Link } from "react-router-dom";

const LandingPage = () => {
    
    const dispatch = useDispatch();
    dispatch(getAllCars())

    return(
        <>
        <div className={styles.containerlandin}>
        <h1 className={styles.h1landing} >Welcome To CarGo! </h1>
        <div className={styles.wrap} >
        <Link to={"/home"} >
        <button className={styles.buttonlanding} >Start the ride</button>
        </Link>
        </div>
        </div>
        </>
    )
}

export default LandingPage;