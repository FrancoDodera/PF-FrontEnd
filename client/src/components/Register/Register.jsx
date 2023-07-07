import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const MAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const REGISTER_URL = "/user/addUser";

const Register = () => {
  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidLastName(USER_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidEmail(MAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidUser(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [name, lastName, email, user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name: name,
        lastName: lastName,
        email: email,
        user: user,
        password: pwd,
        dni: null,
      };

      const response = await axios.post(REGISTER_URL, body);

      console.log(JSON.stringify(response?.data));

      setSuccess(true);
      setName("");
      setLastName("");
      setEmail("");
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className={styles.container}>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section className={styles.container2}>
          <p
            ref={errRef}
            className={errMsg ? styles.errmsg : styles.offscreen}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            <div className={styles.formcito3}>
              <div className={styles.formcito}>
                <div className={styles.inputContainerName}>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    ref={nameRef}
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className={styles.inputContainerLast}>
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    ref={lastNameRef}
                    autoComplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </div>
                <div className={styles.inputContainerEmail}>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
              <div className={styles.formcito}>
                <div className={styles.inputContainerUser}>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                  />
                </div>
                <div className={styles.inputContainerPassword}>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                  />
                </div>
                <div className={styles.inputContainerConfirm}>
                  <label htmlFor="confirm_pwd">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                  />
                </div>
              </div>
            </div>
            <div className={styles.botonnn}>
              <button
                disabled={
                  !validName ||
                  !validLastName ||
                  !validEmail ||
                  !validUser ||
                  !validPwd ||
                  !validMatch
                }
              >
                Register
              </button>
            </div>
          </form>
          <p className={styles.signInLink}>
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </p>
        </section>
      )}
    </div>
  );
};

export default Register;
