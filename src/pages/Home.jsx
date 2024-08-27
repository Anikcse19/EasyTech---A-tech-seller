/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../ContextApi/CartContext";
import Layout from "../components/Layout/Layout";
import FeaturedCategories from "../components/FeaturedCategories";
import Featured from "../components/Featured";
import Center from "../components/Layout/Center";
import NewProducts from "../components/NewProducts";
import ProductCarousel from "../components/Carousel/ProductCarousel";
import InitialModal from "../components/Modal/InitialModal";
import axios from "axios";
import { baseUrl } from "../../config";

const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const router = useNavigate();
  const {
    showInitialModal,
    setShowInitialModal,
    modalOpenCount,
    setModalOpenCount,
    searchedWord,
  } = useContext(CartContext);

  // controll initial modal
  useEffect(() => {
    setTimeout(() => {
      if (modalOpenCount == 0) {
        setShowInitialModal(true);
      }
      setModalOpenCount(modalOpenCount + 1);
    }, 3000);

    axios
      .get(`${baseUrl}/api/products`)
      .then((res) => setAllProducts(res?.data));
  }, []);

  const newProducts = allProducts?.slice(0, 10);

  // make a new array with all laptops
  const laptopProducts = [];
  allProducts.filter((product) => {
    if (product.category == "651b8cea5eeccc404e0be01a") {
      laptopProducts.push(product);
    }
  });

  // make a new array with all mobiles
  const mobilePorducts = [];
  allProducts.filter((product) => {
    if (product.category == "651b0c565cbaf886f380c848") {
      mobilePorducts.push(product);
    }
  });

  // make a new array with all headphones
  const headPhonesProducts = [];
  allProducts.filter((product) => {
    if (product.category == "651b8cf25eeccc404e0be01e") {
      headPhonesProducts.push(product);
    }
  });

  //  make top selling products array
  const topSellingProducts = [
    laptopProducts[2],
    mobilePorducts[0],
    headPhonesProducts[1],
    laptopProducts[1],
    headPhonesProducts[0],
  ];

  // make array with searched letter
  const searchedProducts = [];
  allProducts.filter((p) => {
    if (p?.title.toLowerCase().includes(searchedWord.toLowerCase())) {
      searchedProducts.push(p);
    }
  });

  return (
    <Layout>
      <div className="min-h-[100vh]">
        <Featured products={newProducts} />
        <FeaturedCategories />
      </div>
      {/* advertisement */}
      <div
        className="w-[90%]  mx-auto my-16
       grid grid-cols-1 lg:grid-cols-2 items-center gap-6 "
      >
        <div className="w-full">
          <img
            src="/offerAd1.jpg"
            className="w-full h-[400px] bg-cover"
            alt=""
          />
        </div>
        <div className=" w-full grid grid-cols-2 lg:grid-cols-2 place-items-center">
          <img
            onClick={() => {
              router(`/product/${laptopProducts[2]?._id}`);
            }}
            className="h-[200px] w-[60%] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer"
            src={laptopProducts[2]?.url}
            alt=""
          />
          <img
            onClick={() => {
              router(`/product/${headPhonesProducts[2]?._id}`);
            }}
            className="h-[200px]  w-[60%] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer"
            src={headPhonesProducts[2]?.url}
            alt=""
          />
          <img
            onClick={() => {
              router(`/product/${mobilePorducts[2]?._id}`);
            }}
            className="h-[200px] w-[60%] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer"
            src={mobilePorducts[2]?.url}
            alt=""
          />
          <img
            onClick={() => {
              router(`/product/${laptopProducts[3]?._id}`);
            }}
            className="h-[200px]  w-[60%] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer"
            src={laptopProducts[3]?.url}
            alt=""
          />
        </div>
      </div>
      <div>
        <NewProducts
          newProducts={searchedWord == "" ? newProducts : searchedProducts}
        />
      </div>

      <Center>
        {/* Show top sell */}
        <div className="mt-10">
          <p className="text-base md:text-lg lg:text-xl tracking-widest text-[#7C00FE] font-bold">
            TOP SELLING PRODCUTS
          </p>
          {/* all laptops slider */}
          <div className="mt-5">
            <ProductCarousel from="top-sell" products={topSellingProducts} />
          </div>
        </div>

        {/* Show all Laptops */}
        <div className="mt-10">
          <p className="text-base md:text-lg lg:text-xl tracking-widest text-[#7C00FE] font-bold">
            LAPTOPS
          </p>
          {/* all laptops slider */}
          <div className="mt-5">
            <ProductCarousel from="all-laptop" products={laptopProducts} />
          </div>
        </div>

        {/* Show all Mobiles */}
        <div className="mt-10">
          <p className="text-base md:text-lg lg:text-xl tracking-widest text-[#7C00FE] font-bold">
            SMART PHONES
          </p>
          {/* all laptops slider */}
          <div className="mt-5">
            <ProductCarousel form="all-mobiles" products={mobilePorducts} />
          </div>
        </div>

        {/* Show all Headphone */}
        <div className="mt-10">
          <p className="text-base md:text-lg lg:text-xl tracking-widest text-[#7C00FE] font-bold">
            HEADPHONES
          </p>
          {/* all laptops slider */}
          <div className="mt-5">
            <ProductCarousel
              from="all-headphones"
              products={headPhonesProducts}
            />
          </div>
        </div>
      </Center>

      {showInitialModal && (
        <div className="w-full h-full z-[1000]  flex justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <InitialModal />
        </div>
      )}
    </Layout>
  );
};
export default HomePage;
