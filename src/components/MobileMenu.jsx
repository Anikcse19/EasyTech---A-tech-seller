import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const MobileMenu = () => {
  const [user, setUser] = useState();
  const router = useNavigate();

  useEffect(() => {
    // Only set the user state on the client side
    const cookieUser = Cookies.get("user") && JSON.parse(Cookies.get("user"));
    setUser(cookieUser);
  }, []);
  return (
    <div className="w-full h-full my-3 p-4 text-black">
      <div className="w-full h-full flex flex-col gap-20 ">
        <div className="flex flex-col gap-3  ">
          <Link className="border-b border-slate-600 pb-2" to="/">
            Home
          </Link>
          <Link className="border-b border-slate-600 pb-2" to="/products">
            All Products
          </Link>
          <Link className="border-b border-slate-600 pb-2" to="/categories">
            Categories
          </Link>
        </div>
        <div className="">
          {user?.email ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <FaUserTie className="text-xl" />
                <p>{user?.name}</p>
              </div>
              <span
                onClick={() => {
                  Cookies.remove("user");
                  router("/login");
                }}
                className="bg-red-600 text-white font-bold px-4 py-1 cursor-pointer rounded-md "
              >
                Log Out
              </span>
            </div>
          ) : (
            <div onClick={() => router("/login")} className="flex">
              <p className="bg-green-600 text-white font-bold px-4 py-1 cursor-pointer rounded-md ">
                Log in
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
