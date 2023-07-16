import React from "react";

const Analist = () => {
  return (
    <div className="flex  ">
      <div className="rounded-lg w-96 bg-[#597091] h-52 shadow-mi-sombra  mt-10 mr-20 flex flex-col p-3 justify-evenly items-start">
        <div className=" w-12 h-12 text-white rounded-full bg-[#7678DC]  p-1 text-center ">
          <span class=" text-3xl material-symbols-sharp ">equalizer</span>
        </div>
        <h2 className="text-gray-300 font- ">totalsales</h2>
        <h1 className="text-2xl text-gray-300 font-extrabold">21.000</h1>
      </div>
      <div className="rounded-lg  w-96 bg-[#597091] h-52 shadow-mi-sombra  mt-10 mr-10 flex flex-col p-3 justify-evenly items-start">
        <div className=" w-12 h-12 text-white rounded-full bg-[#F66986]  p-1 text-center ">
          <span class=" material-symbols-sharp  text-3xl">monitoring</span>
        </div>
        <h2 className="text-gray-300 font-medium">totalcars</h2>

        <h1 className="text-2xl text-gray-300 font-extrabold">22.000</h1>
      </div>
    </div>
  );
};

export default Analist;
