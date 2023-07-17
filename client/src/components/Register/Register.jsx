import { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css";
import Swal from "sweetalert2";
const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const MAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const REGISTER_URL = "/user/addUser";
import emailjs from "@emailjs/browser";

const Register = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    user: "",
    password: "",
    confirmPassword: "",
    dni: "",
  });
  const [error, setError] = useState({
    name: "",
    lastName: "",
    email: "",
    user: "",
    password: "",
    confirmPassword: "",
    dni: "",
  });
  const [success, setSuccess] = useState(false);
  const handlerForm = (event) => {
    //validaciones
    if (event.target.name == "email") {
      if (!MAIL_REGEX.test(event.target.value)) {
        setError({
          ...error,
          [event.target.name]: "email invalid",
        });
        setSuccess(false);
      } else {
        setError({
          ...error,
          [event.target.name]: "",
        });
      }
    } else if (event.target.name == "user") {
      if (!USER_REGEX.test(event.target.value)) {
        setError({
          ...error,
          [event.target.name]: "user invalid",
        });
        setSuccess(false);
      } else {
        setError({
          ...error,
          [event.target.name]: "",
        });
      }
    } else if (event.target.name == "password") {
      if (!PWD_REGEX.test(event.target.value)) {
        setError({
          ...error,
          [event.target.name]: "password invalid",
        });
        setSuccess(false);
      } else {
        setError({
          ...error,
          [event.target.name]: "",
        });
      }
    } else if (event.target.name == "confirmPassword") {
      if (form.password !== event.target.value) {
        setError({
          ...error,
          [event.target.name]: "Passwords do not match",
        });
        setSuccess(false);
      } else {
        setError({
          ...error,
          [event.target.name]: "",
        });
      }
    } else if (event.target.name == "name") {
      if (event.target.value == "") {
        setError({
          ...error,
          [event.target.name]: "Name required",
        });
        setSuccess(false);
      } else {
        setError({
          ...error,
          [event.target.name]: "",
        });
      }
    } else if (event.target.name == "lastName") {
      if (event.target.value == "") {
        setError({
          ...error,
          [event.target.name]: "Last Name required",
        });
        setSuccess(false);
      } else {
        setError({
          ...error,
          [event.target.name]: "",
        });
      }
    }

    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const EmailSubmit = (e) => {
    emailjs
      .sendForm(
        "service_2g3l5fl",
        "template_i86j1e3",
        formRef.current,
        "k9MoXYguA1z_UaXjK"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("Email sent");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const handleSubmit = async (e) => {
    EmailSubmit(e);
    e.preventDefault();

    if (
      form.name == "" ||
      form.lastName == "" ||
      form.email == "" ||
      form.user == "" ||
      form.password == "" ||
      form.confirmPassword == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing Data",
        position: "top-end",
        showConfirmButton: false,
        timer: 400,
      });
    } else if (
      error.name !== "" ||
      error.lastName !== "" ||
      error.email !== "" ||
      error.user !== "" ||
      error.password !== "" ||
      error.confirmPassword !== ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Data",
        position: "top-end",
        showConfirmButton: false,
        timer: 400,
      });
    } else {
      try {
        const body = {
          name: form.name,
          lastName: form.lastName,
          email: form.email,
          user: form.user,
          password: form.password,
          dni: null,
          type: "User",
        };

        const { data } = await axios.post(REGISTER_URL, body);
        if (data.acces) {
          Swal.fire({
            icon: "success",
            title: "User created",
            position: "top-end",
            showConfirmButton: false,
            timer: 500,
          });
          navigate("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            position: "top-end",
            showConfirmButton: false,
            timer: 500,
          });
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.container2}>
        <h1>Register</h1>
        <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
          <div className={styles.formcito3}>
            <div className={styles.formcito}>
              <div className={styles.inputContainerName}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  onChange={handlerForm}
                  value={form.name}
                />
              </div>
              {error.name ? (
                <p className={styles.errorMsg}>{error.name}</p>
              ) : (
                ""
              )}

              <div className={styles.inputContainerName}>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="off"
                  onChange={handlerForm}
                  value={form.lastName}
                />
              </div>
              {error.lastName ? (
                <p className={styles.errorMsg}>{error.lastName}</p>
              ) : (
                ""
              )}
              <div className={styles.inputContainerName}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  onChange={handlerForm}
                  value={form.email}
                />
              </div>
              {error.email ? (
                <p className={styles.errorMsg}>{error.email}</p>
              ) : (
                ""
              )}
            </div>
            <div className={styles.formcito}>
              <div className={styles.inputContainerName}>
                <label htmlFor="user">Username:</label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  autoComplete="off"
                  onChange={handlerForm}
                  value={form.user}
                />
              </div>
              {error.user ? (
                <p className={styles.errorMsg}>{error.user}</p>
              ) : (
                ""
              )}
              <div className={styles.inputContainerName}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handlerForm}
                  value={form.password}
                />
              </div>
              {error.password ? (
                <p className={styles.errorMsg}>{error.password}</p>
              ) : (
                ""
              )}
              <div className={styles.inputContainerName}>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handlerForm}
                  value={form.confirmPassword}
                />
              </div>
              {error.confirmPassword ? (
                <p className={styles.errorMsg}>{error.confirmPassword}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={styles.botonnn}>
            <button>Register</button>
          </div>
        </form>
        <p className={styles.signInLink}>
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </p>
      </section>
    </div>
  );
};

export default Register;
