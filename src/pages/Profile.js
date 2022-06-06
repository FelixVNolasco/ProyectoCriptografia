import React from "react";

import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";

export const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <Navbar />
      <div className="flex justify-items-center items-center w-full h-screen">
        <div className="flex flex-col text-2xl bg-green-200 w-1/2 m-auto p-4 rounded-md">
          <div className="flex">
            <label className="font-semibold">Nombre de usuario:</label>
            <span className="ml-2">{currentUser.username}</span>
          </div>
          <div className="flex">
            <label className="font-semibold">Coreo Electronico:</label>

            <span className="ml-2">{currentUser.email}</span>
          </div>
          <div className="flex">
            <label className="font-semibold">Fecha de Creación:</label>
            <span className="ml-2">{currentUser.createdAt}</span>
          </div>
          <div className="flex">
            <label className="font-semibold">Ultima Actualización:</label>
            <span className="ml-2">{currentUser.updatedAt}</span>
          </div>
        </div>
      </div>
    </>
  );
};
