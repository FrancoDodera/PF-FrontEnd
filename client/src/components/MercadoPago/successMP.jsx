import NavBar from "../navbar/NavBar";
import React from "react";
import styles from "./successMP.module.css";
import { useEffect,useState } from "react";
import { Link,useLocation } from "react-router-dom";
import axios from "axios";
const SuccessPage = () => {
  const [paymentData,setPaymentData]=useState({
    id:'',
    status:'',
    type:''
  });
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const paymentId = urlParams.get('payment_id');
    const status = urlParams.get('status');
    const paymentType = urlParams.get('payment_type');
    setPaymentData({
      id:paymentId,
      status:status,
      type:paymentType
    })
    const finish=async()=>{
      if(paymentId && status=='approved'){
        const id_user=localStorage.getItem("idAuth");
        const {data}= await axios.put(`/checkout/finish/${id_user}`)
        localStorage.removeItem("cartItems");
      }
    }
    finish();
  }, [location]);
  return (
    <div>
      <NavBar />
      <div className={styles.contenedormp}>
        <h1 className={styles.h1mp}>¡Successful purchase!</h1>
        <div className={styles.dataPayment}>
          <h2><strong>ID Transaction:</strong> {paymentData.id}</h2>
          <h2> <strong>Status:</strong> {paymentData.status}</h2>
          <h2> <strong>Type Transaction:</strong> {paymentData.type}</h2>
        </div>
        <p className={styles.parrafoMP}>
          Thanks for your purchase. The payment has been completed successfully.
          You will soon receive a confirmation by email.
        </p>
        
        
        <Link to={"/home"}>
          <button className={styles.button}>Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
