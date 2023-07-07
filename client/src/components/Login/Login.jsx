import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { NavLink ,useNavigate} from "react-router-dom";
import styles from "./Login.module.css";
import Authentication from "../Authentication";
import axios from "axios";
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
        localStorage.setItem('user',data.data.user);
        navigate('/home')
      }else{
        alert(data.message)
      }
    } catch (err) {
      alert(err)
    }
  };
  const SignUp=(event)=>{
    navigate('/')
  }
  const startingGuest=(event)=>{
    localStorage.setItem('guest',true)
    navigate('/home')
  }

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
            className={errMsg ? "errmsg" : "offscreen"}
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
          <p>
            Need an Account?
            <br />
              <button onClick={SignUp}>Sign Up</button>
              <Authentication />
              <button onClick={startingGuest}>starting as guest</button>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
