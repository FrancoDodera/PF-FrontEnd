import style from'../Detail-Carrito/DetailCart.module.css?inline'


const CardDetail=(props)=>{
    const {name,totalPrice,price,image,amount}=props
return(
    <div className='border-2 my-1 rounded-xl flex h-40'>
  <div>
    <img src={image} className=" ml-1 relative w-40 my-4" />
  </div>
  <div className="flex flex-col ml-4">
    <h3 className='my-auto'>{name}</h3>
    <h4 className='my-auto'>Precio por unidad: $ {price}</h4>
  </div>
  <div className="flex flex-col ml-auto">
    <h2 className='my-auto'>cantidad: {amount}</h2>
    <h4 className='my-auto mr-8' >total: ${totalPrice}</h4>
  </div>
</div>
  

)
}

export default CardDetail