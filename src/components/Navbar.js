import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutStart } from "../redux/userRedux";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOutStart());
    navigate("/auth/login");
  };

  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="h-16 bg-teal-600 text-white w-full">
      <div className="flex flex-row h-16 justify-between items-center">
        <div className="flex w-full md:flex lg:flex lg:flex-row xl:flex xl: flex-row items-center justify-between">
          <Link className="font-semibold text-2xl ml-2" to={"/"}>
            Proyecto Criptografia
          </Link>

          {currentUser && (
            <div className="flex">
              <Link to={"/profile"}>
                <div className="mr-2 ml-2 mt-1 cursor-pointer p-2 bg-lime-300 rounded-md transition ease-in-out duration-300  hover:bg-lime-200 text-black font-medium">Mi Perfil</div>
              </Link>
              <div
                className="mr-2 ml-2 mt-1 cursor-pointer p-2 bg-rose-400 rounded-md transition ease-in-out duration-300 hover:bg-rose-300 text-black font-medium"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
