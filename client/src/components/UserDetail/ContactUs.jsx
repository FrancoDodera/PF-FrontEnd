import React, { useState } from 'react';
import style from "../UserDetail/ContactUs.module.css";
const ContactUs = () => {
  // Estado para controlar la visibilidad del texto desplegable
  const [contactVisible, setContactVisible] = useState(false);

  // Función para alternar la visibilidad del texto
  const toggleContact = () => {
    setContactVisible(!contactVisible);
  };

  return (
    <div>
      <button  className={style.contact} onClick={toggleContact}>Contact Us</button>
      {contactVisible  && <h1 className={style.contactv}>Call Us: 361348591 </h1>}
      {contactVisible  && <h1 className={style.contactv}>Email:CarGo@gmail.com </h1>}
      {contactVisible  && <h1 className={style.contactv}>Instagram: cargo_official </h1>}
      
    </div>
  );
};

export default ContactUs;
           