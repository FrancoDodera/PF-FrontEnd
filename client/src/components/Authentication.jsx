import GoogleLogin from 'react-google-login'
import {gapi} from 'gapi-script'
import { useEffect } from 'react'

const Authentication=()=>{
    const clientID="193073335991-hclacbarkbgi6vgh4ntd2ig24cnsfvpb.apps.googleusercontent.com"
    const handlerSuccess=(res)=>{
        //logica aca
        console.log({
            Name:res.profileObj.name,
            LastName:res.profileObj.familyName,
            Email:res.profileObj.email
        })
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