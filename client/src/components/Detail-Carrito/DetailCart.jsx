import { useState } from "react"
import NavBar from "../navbar/NavBar"
import Card from "./CardDetailCart"
import style from "./DetailCart.module.css"
import axios from"axios"

const DetailCart=()=>{
    const[loading,setLoading]= useState(false)
    const Cars= localStorage.getItem('cartItems')
    let cars = JSON.parse(Cars)
        console.log(cars)
    const total='TOTAL'
    let Pay=0
    for (let i = 0; i < cars.length; i++) {
        Pay=Pay + cars[i].totalPrice
        
    }
    const redirect =async()=>{
       setLoading(true)
       const data=await axios.post('https://pf-back.fly.dev/checkout',cars )
       console.log(data.data.response.response.init_point)
        window.location.href=data.data.response.response.init_point
        
    }
    

    if (loading===true) {
            return(
                <div class={style.overlay}>
                <div class={style.loader}></div>
                <h1>redirecting</h1>
             </div>
            )
        }

    return(
        <>
        <NavBar/>
        <div className=''>
            <div className="relative left-96 max-w-3xl z-0 ">
                {cars.map((car)=><Card 
                name={car?.name}
                price={car?.price}
                amount={car.amount}
                totalPrice={car.totalPrice}
                image={car?.image}
                />) }
                {loading && (
                    <div className="overlay">
                        <div className="loader"></div>
                    </div>
                )}
            </div>
            
                <div className=" border-4 absolute top-60 right-40 w-96 h-3/6 rounded-xl">
                    <h1 className="mx-36 mt-10 text-3xl">cars:</h1>
                    <div className="   h-60 w-80 border-2 ml-7 rounded-xl">
                            {cars.map((car)=>{return(
                                <div className={style.calculator}>
                                    <h6 >$ {car.totalPrice}</h6>
                                </div>
                                )})}
                    </div>
                    <h1 className={` inline-block ${style.to}`}>{total}</h1>
                    
                    <h1 className={`text-right ${style.total}`}>$ {Pay}</h1>

                    <button className={style.but} onClick={redirect}>RESERVE</button>
                    
                </div>
                
        </div>
        </>
    )
}

export default DetailCart