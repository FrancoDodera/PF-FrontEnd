import axios from "axios";
import Swal from "sweetalert2";

const handleChangePassword = async (userData, newPassword, oldPassword) => {
  try {
    if (newPassword === userData.confirmPassword) {
      const postData = {
        id: userData._id,
        newPassword: newPassword,
        password: oldPassword,
      };
      const { data } = await axios.put("/user/changePassword", postData);
      if (data.message) {
        Swal.fire({
          icon: "error",
          title: data.message,
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Updated User",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "password does not match",
        position: "top-end",
        showConfirmButton: false,
        timer: 500,
      });
    }
  } catch (error) {
    alert(error);
  }
};

export default handleChangePassword;
