import React, { useEffect } from "react";
import { GoogleMap, Marker } from "google-maps-react";
import NavBar from "../../components/navbar/NavBar";
import img from "../../img/googlemaps.png";

const Location = () => {
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
      window.location.href =
        "https://www.google.com/maps/place/37%C2%B046'29.6%22N+122%C2%B025'09.8%22W/@37.7823368,-122.4685381,12z/data=!4m4!3m3!8m2!3d37.7749!4d-122.4194?hl=es&entry=ttu";
    } else if (sucursal === "sucursal2") {
      window.location.href =
        "https://www.google.com/maps/place/37%C2%B046'29.6%22N+122%C2%B025'09.8%22W/@37.7823368,-122.4685381,12z/data=!4m4!3m3!8m2!3d37.7749!4d-122.4194?hl=es&entry=ttu";
    }
  };

  return (
    <>
      <NavBar />
      <div
        className="w-auto h-[800px]  flex justify-center items-center border-2 border-white/50 backdrop-filter backdrop-blur-20 shadow-lg"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[500px] h-[500px] flex flex-col justify-evenly bg-gray-200 p-4 rounded-2xl">
          <h2 className="flex justify-center items-center text-lg font-bold ">
            Sucursales
          </h2>
          <div className="flex justify-center mb-1">
            <div className="">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2"
                onClick={() => handleRedirect("sucursal1")}
              >
                Sucursal 1
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleRedirect("sucursal2")}
              >
                Sucursal 2
              </button>
            </div>
          </div>
          <div
            name="contact"
            className="flex flex-col justify-center items-center p-4"
          >
            <form
              method="POST"
              action="https://getform.io/f/9d5ac40f-ec9b-41f1-b16a-e7c54dd6f178"
              className="flex flex-col h-auto w-auto"
            >
              <div className="pb-8">
                <p className="text-4xl font-bold inline border-b-4 border-pink-600 text-gray-800">
                  Contact
                </p>
                <p className="text-gray-800 py-4">
                  || Envia el siguiente formulario
                </p>
              </div>
              <input
                className="bg-[#ccd6f6] p-2"
                type="text"
                placeholder="Nombre.."
                name="name"
              />
              <input
                className="my-4 p-2 bg-[#ccd6f6]"
                type="email"
                placeholder="Email.."
                name="email"
              />
              <textarea
                className="bg-[#ccd6f6] p-2"
                name="mensaje"
                rows="3"
                placeholder="Mensaje.."
              ></textarea>
              <button className="text-gray-800 border-2 hover:bg-pink-600 px-4 py-3 my-8 mx-auto flex items-center">
                Envia!
              </button>
            </form>
          </div>
        </div>
        <div className="flex w-[500px] h-[500px]">
          <div id="map" style={{ height: "500px", width: "500px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Location;
