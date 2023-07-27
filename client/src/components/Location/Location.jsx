  import React, { useEffect, useRef  } from "react";
  import NavBar from "../../components/navbar/NavBar";
  import img from "../../img/googlemaps.png";
  import Contact from "../../components/Contact/Contact";
  import Footer from "../Footer/Footer";
  import Swal from "sweetalert2";

  const Location = () => {
    const formRef = useRef();

    useEffect(() => {
      "-31.41081263931056, -64.19012408279818"
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -31.41081263931056, lng: -64.19012408279818 },
        zoom: 12,
      });

      // Marcador de sucursal 1
      "-31.355022518304686, -64.22472279491272"
      const marker1 = new window.google.maps.Marker({
        position: { lat: -31.355022518304686, lng: -64.22472279491272 }, // Coordenadas de la sucursal 1
        map: map,
        title: "Sucursal 1",
      });

      // Marcador de sucursal 2
      "-31.416892128589666, -64.18519183863613"
      const marker2 = new window.google.maps.Marker({
        position: { lat: -31.416892128589666, lng: -64.18519183863613 }, // Coordenadas de la sucursal 2
        map: map,
        title: "Sucursal 2",
      });
    }, []);

    
    const handleRedirect = (sucursal) => {
      // Realizar la redirección según la sucursal seleccionada
      if (sucursal === "sucursal1") {
        window.location.href =
          "https://www.google.com/maps/place/37%C2%B046'29.6%22N+122%C2%B025'09.8%22W/@37.7823368,-122.4685381,12z/data=!4m4!3m3!8m2!3d37.7749!4d-122.4194?hl=es&entry=ttu";
        } else if (sucursal === "sucursal2") {
          window.location.href =
          "https://www.google.com/maps/place/37%C2%B046'29.6%22N+122%C2%B025'09.8%22W/@37.7823368,-122.4685381,12z/data=!4m4!3m3!8m2!3d37.7749!4d-122.4194?hl=es&entry=ttu";
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
      <>
        <NavBar />
        <div
          className="w-auto h-[800px]  flex justify-center items-center  backdrop-filter backdrop-blur-20 shadow-lg"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-[500px] h-[500px] flex flex-col justify-evenly bg-gray-200 p-4 rounded-2xl">
            <h2 className="flex justify-center items-center text-2xl font-bold mb-3 mt-3 ">
              Branch Offices
            </h2>
            <div className="flex justify-center mb-1">
              <div className="">
                <a
                  className="bg-orange-500 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded mb-2 mx-2"
                  target="_blank"
                  href="https://goo.gl/maps/kuWGiNVayaWprVtV7"
                  // onClick={() => handleRedirect("sucursal1")}
                >
                  Office 1
                </a>
                <a
                  className="bg-orange-500 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded"
                  target="_blank"
                  href="https://goo.gl/maps/zMwaMfLQ9HUsEeYn8"
                  // onClick={() => handleRedirect("sucursal2")}
                >
                  Office 2
                </a>
              </div>
            </div>
            <Contact formRef={formRef} showConfirmationAlert={showConfirmationAlert} />
          </div>
          <div className="flex w-[500px] h-[500px]">
            <div id="map" style={{ height: "500px", width: "500px" }}></div>
          </div>
        </div>
        <Footer />
      </>
    );
  };

  export default Location;
