import React, { useEffect, useRef } from "react";
import NavBar from "../../components/navbar/NavBar";

import Contact from "../../components/Contact/Contact";
import Footer from "../Footer/Footer";
import Swal from "sweetalert2";

const Location = () => {
  const formRef = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 12,
    });

    // Marcador de sucursal 1
    const marker1 = new window.google.maps.Marker({
      position: { lat: 37.7749, lng: -122.4194 }, // Coordenadas de la sucursal 1
      map: map,
      title: "Sucursal 1",
    });

    // Marcador de sucursal 2
    const marker2 = new window.google.maps.Marker({
      position: { lat: 37.7865, lng: -122.4111 }, // Coordenadas de la sucursal 2
      map: map,
      title: "Sucursal 2",
    });
  }, []);

  const handleRedirect = (sucursal) => {
    // Realizar la redirección según la sucursal seleccionada
    if (sucursal === "sucursal1") {
      window.open(
        "https://www.google.com/maps/place/37%C2%B046'29.6%22N+122%C2%B025'09.8%22W/@37.7823368,-122.4685381,12z/data=!4m4!3m3!8m2!3d37.7749!4d-122.4194?hl=es&entry=ttu",
        "_blank"
      );
    } else if (sucursal === "sucursal2") {
      window.open(
        "https://www.google.com/maps/place/37%C2%B046'29.6%22N+122%C2%B025'09.8%22W/@37.7823368,-122.4685381,12z/data=!4m4!3m3!8m2!3d37.7749!4d-122.4194?hl=es&entry=ttu",
        "_blank"
      );
    }
  };
  const showConfirmationAlert = () => {
    Swal.fire({
      text: "Message sent!",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
      icon: "success",
    });
  };

  return (
    <div>
      <NavBar />
      <div
        className="w-auto h-[800px]  flex justify-center items-center  backdrop-filter backdrop-blur-20 shadow-lg"
        style={{
          backgroundColor: "rgba(246, 251, 251, 0.966)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[550px] h-[600px] flex flex-col justify-evenly bg-[rgba(246, 251, 251, 0.966)] p-4 rounded-2xl shadow-sm">
          <h2 className="flex justify-center items-center text-lg font-bold ">
            Sucursales
          </h2>
          <div className="flex justify-center mb-1">
            <div className="">
              <button
                className="bg-[#016565] hover:bg-[#e1aca2] text-white font-bold py-2 px-4 rounded mb-2 mx-2"
                onClick={() => handleRedirect("sucursal1")}
              >
                Sucursal 1
              </button>
              <button
                className="bg-[#016565] hover:bg-[#e1aca2] text-white font-bold py-2 px-4 rounded"
                onClick={() => handleRedirect("sucursal2")}
              >
                Sucursal 2
              </button>
            </div>
          </div>
          <Contact
            formRef={formRef}
            showConfirmationAlert={showConfirmationAlert}
          />
        </div>
        <div className="flex w-[500px] h-[600px]">
          <div id="map" style={{ height: "600px", width: "500px" }}></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Location;
