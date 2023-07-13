import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { NavLink ,useNavigate} from "react-router-dom";
import styles from "./Login.module.css";
import Authentication from "../Authentication";
import axios from "axios";
import Swal from 'sweetalert2'

const LOGIN_URL = "/user/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate=useNavigate();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials={
        user:user,
        password:pwd
      }
      const {data} = await axios.post(LOGIN_URL,credentials);
      if(data.acces){
        localStorage.clear();
        if(data.data.type=='User'){
          localStorage.setItem('user',data.data.user);
          localStorage.setItem('profileUrl',data.data.image);
          navigate('/home')
        }else if(data.data.type=='Admin'){
          localStorage.setItem('admin',data.data.user);
          localStorage.setItem('profileUrl',data.data.image);
          navigate('/admin')
        }
      }else{
        Swal.fire({
          icon: 'error',
          title: data.message,
          position: 'top-end',
          showConfirmButton: false,
          timer: 500
        })
      }
    } catch (err) {
      alert(err)
    }
  };
  const SignUp=(event)=>{
    navigate('/register')
  }

  const startingGuest = (event) => {
    localStorage.clear();
    localStorage.setItem("guest", true);
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      {success ? (
        <section className={styles.container2}>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? styles.errmsg : styles.offscreen}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className={styles.containerUsername}>
            <h1>Sign In</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
         <button type="submit" className={styles.button}>Sign In</button>

            </form>
          </div>
          <Authentication />
          <p>
            Need an Account?
            <br />

          </p>
          <div className={styles.arrocito}>
            <button onClick={SignUp} className={styles.botoncito}>
              Sign Up
            </button>
            <button onClick={startingGuest} className={styles.botoncitogest}>
              Starting as Guest
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Login;
