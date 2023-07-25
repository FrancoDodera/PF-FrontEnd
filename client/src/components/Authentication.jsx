import GoogleLogin from 'react-google-login'
import {gapi} from 'gapi-script'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Authentication=()=>{
    const navigate=useNavigate();
    const clientID="193073335991-e2gqv4d7rj0uo6tmb8icli57mlfaqk14.apps.googleusercontent.com"
    const handlerSuccess= async(res)=>{
        try {
            const body={
                name:res.profileObj.name,
                lastName:res.profileObj.familyName,
                email:res.profileObj.email,
                user:res.profileObj.email,
                token:res.tokenObj.login_hint,
                password:null,
                dni:null,
                type:'User',
                image:res.profileObj.imageUrl
            }
            console.log(body)
            const {data}=await axios.post('/user/authentication',body)
            if(data.acces==true){
                if(data.data.type=='User'){
                    localStorage.clear();
                    localStorage.setItem('idAuth',data.data._id);
                    localStorage.setItem('user',data.data.user);
                    localStorage.setItem('profileUrl',data.data.image);
                    navigate('/home')
                }else if(data.data.type=='Admin'){
                    localStorage.clear();
                    localStorage.setItem('idAuth',data.data._id);
                    localStorage.setItem('admin',data.data.user);
                    localStorage.setItem('profileUrl',data.data.image);
                    navigate('/admin')
                }
                const getCartItems=await axios.get(`/sale/${data.data._id}`)
                if(getCartItems.data.length>0){
                    localStorage.setItem("cartItems", JSON.stringify(getCartItems.data));
                }
            }else{
                alert(data)
            }
        } catch (error) {
            alert(error)
        }
    }
    const handlerError=(res)=>{
        //logica aca
        alert('no se pudo iniciar')
    }
    const start=()=>{
        gapi.auth2.init({
            clientId:clientID,
        })
    }
    useEffect(()=>{
        gapi.load("client:auth2",start)
    },[])
    return(
             <GoogleLogin
             clientId={clientID}
             onSuccess={handlerSuccess}
             onFailure={handlerError}
             cookiePolicy={'single_host_origin'}
             />
        )
}
export default Authentication;