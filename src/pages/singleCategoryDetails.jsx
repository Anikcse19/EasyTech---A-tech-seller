import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { baseUrl } from "../../config";
import ProductBox from "../components/ProductBox";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);

  const router = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/categories`)
      .then((res) => setCategories(res.data));

    axios
      .get(`${baseUrl}/api/categories/${id}`)
      .then((res) => setCategory(res?.data));

    axios
      .get(`${baseUrl}/api/products/category/${id}`)
      .then((res) => setProducts(res?.data));
  }, [id]);

  const cat_name = category.name;

  const handleCategory = (id) => {
    router("/singleCategoryProducts/" + id);
  };

  return (
    <>
      <Layout>
        {/* see all categories name */}

        <div className="px-5 md:px-20 pt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category, i) => (
            <div
              key={i}
              onClick={() => handleCategory(category._id)}
              className={`${
                category._id == id
                  ? "bg-[#7C00FE] text-white font-bold"
                  : "hover:bg-[#7b00fe49]"
              } border border-gray-400 cursor-pointer flex items-center justify-center rounded p-2`}
            >
              <p className="text-xs md:text-sm text-center">
                {" "}
                {category?.name}
              </p>
            </div>
          ))}
        </div>
        {/* <Center> */}
        <div className="flex flex-col md:flex-row gap-10 items-center py-10 px-5 md:px-20">
          {/* Searched options */}
          <div className="hidden  min-w-[10rem] md:flex flex-col  self-start gap-1">
            <div className="border-b-2 text-center py-3">
              <h1 className="text-xl text-left font-bold">Price Range</h1>
            </div>

            <div className="flex justify-between  border-b-2 py-3">
              <div className="border border-black px-3 py-1 text-xs md:text-sm rounded-sm">
                1000
              </div>
              <div className="border border-black py-1 px-3 text-xs md:text-sm rounded-sm">
                120000
              </div>
            </div>

            {/* Availability */}

            <div className="border-b-2 py-3 px-2">
              <h2 className="mb-2 font-bold">Availability</h2>
              <hr></hr>
              <div className="mt-2 flex flex-col gap-4 ">
                <div className="flex items-center gap-2 ">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>In Stock</label>
                </div>
                <div
                  id="availability-option"
                  className="flex items-center gap-2"
                >
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Pre Order</label>
                </div>
                <div
                  id="availability-option"
                  className="flex items-center gap-2"
                >
                  <input className="mb-0" type="checkbox" />{" "}
                  <label>Up Coming</label>
                </div>
              </div>
            </div>

            {/* brand options */}

            <div className="border-b-2 py-3 px-2">
              <h2 className="mb-2 font-bold">Brand</h2>
              <hr></hr>
              <div id="brand-options" className="mt-2 flex flex-col gap-4">
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Apple</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className="mb-0" type="checkbox" />{" "}
                  <label>Huwae</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Oppo</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Xiaomi</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Vivo</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>SamSung</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className="mb-0" type="checkbox" />{" "}
                  <label>Google</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Motorolla</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>Real me</label>
                </div>
                <div id="brand-option" className="flex items-center gap-2">
                  <input className=" mb-0" type="checkbox" />{" "}
                  <label>One Plus</label>
                </div>
              </div>
            </div>
          </div>

          {/* Searhced Result */}

          <div
            id="search-result"
            className="md:flex-grow self-start flex flex-col gap-5"
          >
            <div
              id="cat_name"
              className="px-3 py-2 bg-white border border-black rounded-md "
            >
              <h1 className="font-bold text-[#7C00FE]">{cat_name}</h1>
            </div>
            <div className="grid grid-cols-1  w-[100%] md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 mt-5  md:p-0">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductBox key={product?.id} product={product} />
                ))
              ) : (
                <div className="text-2xl font-bold">No Products Available</div>
              )}
            </div>
          </div>
        </div>
        {/* </Center> */}
      </Layout>
    </>
  );
};

export default CategoryPage;
