import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2g3l5fl",
        "template_a6kbak6",
        form.current,
        "k9MoXYguA1z_UaXjK"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="w-auto h-auto">
      <label className="mt-4">Name</label>
      <input
        type="text"
        name="user_name"
        className="w-auto h-10 p-2 mt-2 border border-gray-300 rounded focus:border-green-500 focus:outline-none"
      />
      <label className="mt-4">Email</label>
      <input
        type="email"
        name="user_email"
        className="w-auto h-auto p-2 mt-2 border border-gray-300 rounded focus:border-green-500 focus:outline-none"
      />
      <label className="mt-4">Message</label>
      <textarea
        name="message"
        className="w-[220px] h-[110px] p-2 mt-2 border border-gray-300 rounded focus:border-green-500 focus:outline-none"
      />
      <input
        type="submit"
        value="Send"
        className="w-auto h-auto mt-8 py-2 px-4 bg-orange-500 hover:bg-orange-800 text-white border-none cursor-pointer"
      />
    </form>
  );
};

export default Contact;
