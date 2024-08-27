import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { FaUserTie } from "react-icons/fa";

import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../ContextApi/CartContext";
import { baseUrl } from "../../../config";
import FavouriteModal from "../Modal/FavouriteModal";
import MobileMenu from "../MobileMenu";
import Center from "./Center";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [user, setUser] = useState({});

  const { cartProducts, favouriteProducts, setSearchedWord } =
    useContext(CartContext);

  const router = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cookieUser = Cookies.get("user") && JSON.parse(Cookies?.get("user"));
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
          },
        }
      )
      .then((res) => setFavourites(res.data));
  }, [favouriteProducts]);

  return (
    <div className="w-full fixed z-[1000]">
      <div
        style={{
          backgroundColor: "#F6F5F2",
          color: "black",
          width: "100%",
        }}
      >
        <Center>
          <div className="wrapper flex flex-col  lg:block relative py-4 px-2 lg:px-0">
            <div className="flex items-center justify-between w-[100%]">
              {/* logo */}
              <div
                className="cursor-pointer hidden lg:block "
                onClick={() => router("/")}
                id="logo"
              >
                <img src="/logo.png" alt="" className="w-44 h-12" />
              </div>

              {/* searchbox */}
              <div className="flex items-center relative lg:hidden">
                <input
                  className="rounded-md bg-gray-300 px-1 md:px-5 py-1 outline-none text-black"
                  type="text"
                  name=""
                  id=""
                  placeholder="search products"
                  onChange={(e) => {
                    setSearchedWord(e.target.value);
                  }}
                  onFocus={() => {
                    router("#products");
                  }}
                />
                <a
                  href="#products"
                  // onClick={() => {
                  //   router("/#products");
                  // }}
                  className="bg-[#7C00FE] text-white px-2 lg:px-4 py-1 rounded-tr-md rounded-br-md absolute right-0 bottom-0 cursor-pointer"
                >
                  Search
                </a>
              </div>

              <div className=" items-center gap-2  hidden lg:block">
                <nav className="text-black flex items-center gap-4">
                  <Link
                    className={`${
                      location.pathname === "/" && "font-bold text-[#7C00FE]"
                    } `}
                    to={"/"}
                  >
                    Home
                  </Link>
                  <Link
                    className={`${
                      location.pathname.includes("/product") &&
                      "font-bold text-[#7C00FE]"
                    } `}
                    to="/products"
                  >
                    Products
                  </Link>
                  <a
                    className={`${
                      location.pathname.includes("/categories") ||
                      (location.pathname.includes("singleCategoryProducts") &&
                        "font-bold text-[#7C00FE]")
                    } `}
                    href="#categories"
                  >
                    Categories
                  </a>
                  <Link
                    className={`${
                      location.pathname.includes("/cart") &&
                      "font-bold text-[#7C00FE]"
                    } `}
                    to="/cart"
                  >
                    <div className="  rounded-[50%] p-1 ">
                      <p>Cart ({cartProducts?.length})</p>
                    </div>
                  </Link>
                  <Link
                    to=""
                    className="flex relative"
                    onClick={() => setShowModal(true)}
                  >
                    <div className=" text-black rounded-[50%] p-1 ">
                      <p>Favourites ({favouriteProducts?.length})</p>
                    </div>
                  </Link>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <div
                  onClick={() => router("/cart")}
                  className="block lg:hidden p-1 relative"
                >
                  <p>Cart ({cartProducts?.length})</p>
                </div>
                <div
                  onClick={() => setIsMobileMenu(!isMobileMenu)}
                  className="block lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                  </svg>
                </div>
                <div className="hidden lg:block">
                  {user?.email ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3">
                        <FaUserTie className="text-xl" />
                        <p>{user?.name}</p>
                      </div>
                      <span
                        onClick={() => {
                          Cookies.remove("user");
                          setUser({});
                          window.location.reload();
                        }}
                        className="bg-[#7C00FE] text-white font-bold px-4 py-1 cursor-pointer rounded-md "
                      >
                        Log Out
                      </span>
                    </div>
                  ) : (
                    <div
                      onClick={() => router("/login")}
                      className="bg-[#7C00FE] text-white font-bold px-4 py-1 cursor-pointer rounded-md "
                    >
                      Log in
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* mobile menu */}
            <div
              className={`${
                isMobileMenu ? "left-0 top-20" : "-left-full top-20"
              } absolute w-[90%] h-screen  bg-white transition-all duration-300 ease-in-out lg:hidden`}
            >
              <MobileMenu />
            </div>
          </div>
        </Center>
      </div>
      <FavouriteModal
        isVisible={showModal}
        favourites={favourites}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default Header;
