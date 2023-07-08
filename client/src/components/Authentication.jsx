import GoogleLogin from 'react-google-login';
import {gapi} from 'gapi-script';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const Authentication=()=>{
    const navigate=useNavigate();
    const clientID="193073335991-hclacbarkbgi6vgh4ntd2ig24cnsfvpb.apps.googleusercontent.com"
    const handlerSuccess= async(res)=>{
        //logica aca
        try {
            const body={
                name:res.profileObj.name,
                lastName:res.profileObj.familyName,
                email:res.profileObj.email,
                user:res.profileObj.email,
                password:res.tokenObj.login_hint,
                dni:null
            }
            const {data}=await axios.post('/user/addUser',body)
            if(data.acces==true){
                localStorage.clear();
                localStorage.setItem('user',res.profileObj.email);
                navigate('/home')
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