import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const Contact = ({ showConfirmationAlert }) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    showConfirmationAlert();
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
    <form ref={form} onSubmit={() => {}} className="w-auto h-auto">
      <label className="mt-4">Name</label>
      <input
        type="text"
        name="user_name"
        className="w-auto h-10 p-2 mt-2 border border-[#016565] rounded focus:border-green-600 focus:outline-none"
      />
      <label className="mt-4">Email</label>
      <input
        type="email"
        name="user_email"
        className="w-auto h-auto p-2 mt-2 border  border-[#016565] rounded focus:border-green-600 focus:outline-none"
      />
      <label className="mt-4">Message</label>
      <textarea
        name="message"
        className="w-[220px] h-[110px] p-2 mt-2 border bg-[#016565] text-white border-gray-300 rounded focus:border-green-600 focus:outline-none"
      />
      <input
        type="submit"
        value="Send"
        onClick={sendEmail}
        className="w-auto h-auto mt-8 py-2 px-4 bg-[#016565] hover:bg-[#e1aca2] text-white border-none cursor-pointer"
      />
    </form>
  );
};

export default Contact;
