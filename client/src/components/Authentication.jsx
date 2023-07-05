import GoogleLogin from 'react-google-login'
import {gapi} from 'gapi-script'
import { useEffect } from 'react'
import {NavLink,useNavigate} from 'react-router-dom'


const Authentication=()=>{
    const navigate=useNavigate();
    const clientID="193073335991-hclacbarkbgi6vgh4ntd2ig24cnsfvpb.apps.googleusercontent.com"
    const handlerSuccess=(res)=>{
        //logica aca
        console.log({
            name:res.profileObj.name,
            lastName:res.profileObj.familyName,
            Email:res.profileObj.email,
            user:res.profileObj.email,
            password:res.tokenObj.login_hint,
            dni:null
        })
        navigate('/home')
    }
    const handlerError=(res)=>{
        //logica aca
        console.log(res)
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