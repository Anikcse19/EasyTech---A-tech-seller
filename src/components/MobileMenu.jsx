import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../ContextApi/CartContext";
import FavouriteModal from "./Modal/FavouriteModal";
import axios from "axios";
import { baseUrl } from "../../config";

const MobileMenu = () => {
  const [showModal, setShowModal] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const [user, setUser] = useState({});

  const { favouriteProducts } = useContext(CartContext);

  const router = useNavigate();

  useEffect(() => {
    // Only set the user state on the client side
    const cookieUser = Cookies.get("user") && JSON.parse(Cookies.get("user"));
    setUser(cookieUser);
  }, []);

  useEffect(() => {
    axios
      .post(
        `${baseUrl}/api/cart`,
        { ids: favouriteProducts },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: "https://easy-tech-ten.vercel.app/",
          },
        }
      )
      .then((res) => setFavourites(res.data));
  }, [favouriteProducts]);
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
          <Link
            to=""
            className="flex relative hover:scale-110 transition-all duration-300 ease-in-out"
            onClick={() => setShowModal(true)}
          >
            <div className=" text-black rounded-[50%] p-1 ">
              <p>Favourites ({favouriteProducts?.length})</p>
            </div>
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
      <FavouriteModal
        isVisible={showModal}
        favourites={favourites}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default MobileMenu;
