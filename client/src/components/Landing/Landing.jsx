import React from "react";
import styles from './Landing.module.css';
import { Link } from "react-router-dom";

const LandingPage = () => {
    const currentUser=localStorage.getItem('user')
    const currentUser2=localStorage.getItem('guest')
    return(
        <>
        <div className={styles.containerlandin}>
        <h1 className={styles.h1landing} >Welcome To CarGo! </h1>
        <h3  className={styles.h3}>Were the dream cars are just one click away</h3>
        <div className={styles.wrap} >
            {
                currentUser || currentUser2 ? 
                <Link to={"/home"} >
                    <button className={styles.buttonlanding} >Start the ride</button>
                </Link>:
                <Link to={"/login"} >
                    <button className={styles.buttonlanding} >Start the ride</button>
                </Link>
            }
        
        </div>
        </div>
        </>
    )
}

export default LandingPage;