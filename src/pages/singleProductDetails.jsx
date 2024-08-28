/* eslint-disable react-hooks/exhaustive-deps */
import { Rating } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";
// import "swiper/css";
import { FaRegHeart } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import { CartContext } from "../ContextApi/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../config";
import Layout from "../components/Layout/Layout";
import Center from "../components/Layout/Center";
import ProductBox from "../components/ProductBox";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

// const notify = () => toast.success('Review Added');
const SingleProductDetails = () => {
  const [comment, setComment] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [isFavourite, setIsFavourite] = useState(false);
  const [rating, setRating] = useState(0);

  const { cartProducts, addProduct, addFavourite, removeFavourite } =
    useContext(CartContext);

  const router = useNavigate();
  const user = Cookies.get("user") && JSON.parse(Cookies.get("user"));

  const { id } = useParams();

  const fetchProduct = () => {
    if (id) {
      axios.get(`${baseUrl}/api/products/${id}`).then((res) => {
        setProduct(res?.data);
      });
    } else {
      return;
    }
  };

  let matchedProducts = [];
  products.filter((p) => {
    if (p.category === product.category) {
      matchedProducts.push(p);
    }
  });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }

    axios.get(`${baseUrl}/api/products`).then((res) => setProducts(res?.data));
  }, [id]);

  const discounted_price = product?.price;
  const discount_percentage = parseFloat(product?.discount) / 100;

  const original_price = parseInt(discounted_price / (1 - discount_percentage));

  const updateProductWithReview = async () => {
    const rev = {
      comment: comment,
      rating: rating,
      userName: user?.name,
    };

    if (comment == "") return;
    await axios
      .post("/api/products/", {
        _id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        properties: product.properties,
        url: product.url,
        review: rev,
      })
      .then(async (res) => {
        if (res.status == 200) {
          setComment("");
          setRating(0);
          fetchProduct();
          toast.success("Review Added");
        } else {
          toast.error("Error");
        }
      });
  };

  return (
    <>
      <Layout>
        <Center>
          <ColWrapper>
            <div>
              <div
                // style={{
                //   boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                // }}
                className="hover:scale-110 transition-all duration-500 ease-out cursor-pointer rounded flex items-center justify-center"
              >
                <img
                  src={product?.url}
                  alt="product_image"
                  className="w-[90%] h-[250px]"
                />
              </div>
              <div className="flex items-center gap-2 m-4">
                <p className="animate-pulse">In Stock</p>
                <p>(Only 15 Items left)</p>
              </div>
            </div>
            <div className="p-2">
              {/* title and favrt */}
              <div className="flex items-center justify-between">
                <p className="text-base md:text-lg lg:text-xl text-blue-500 font-bold">
                  {product?.title}
                </p>
                <div className="flex items-center gap-5">
                  {/* share */}
                  <IoMdShare className="text-base md:text-lg lg:text-xl" />
                  {/* favourites icon */}
                  <div>
                    {isFavourite ? (
                      <div
                        onClick={() => {
                          removeFavourite(product._id);
                          setIsFavourite(!isFavourite);
                          toast.success("Remove from favourites");
                        }}
                        className="cursor-pointer flex justify-end"
                      >
                        <IoIosHeart className="text-base md:text-lg lg:text-xl" />
                      </div>
                    ) : (
                      <div>
                        <div
                          onClick={() => {
                            addFavourite(product._id);
                            setIsFavourite(!isFavourite);
                            toast.success("Added to favourites");
                          }}
                          className="cursor-pointer"
                        >
                          <FaRegHeart className="text-base md:text-lg lg:text-xl" />
                        </div>
                        <Toaster position="bottom-right" reverseOrder={false} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* price and discount */}
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-4">
                  <span>Price: </span>
                  <span className="font-bold text-sm md:text-lg">
                    &#2547;{product?.price}
                  </span>
                  <p className="text-sm text-gray-400 line-through">
                    &#2547;{original_price}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Discount: </span>
                  <span className=" text-red-600 text-sm md:text-base ">
                    {product?.discount ? product?.discount : "-15%"}
                  </span>
                </div>
              </div>

              {/* reviews and ratings */}
              <div className="flex items-center gap-4 mt-3">
                <Rating
                  name="half-rating-read"
                  value={product && product?.rating ? product.rating : 3.5}
                  precision={0.5}
                  readOnly
                />
                <a
                  href="#reviews"
                  // onClick={() => {
                  //   router("#reviews");
                  // }}
                  className="hover:underline cursor-pointer"
                >
                  (15 Reviews)
                </a>
              </div>

              {/* buy and add to cart button */}
              <div className="flex items-center gap-5 mt-10">
                <div onClick={() => router("/cart")}>
                  <button
                    onClick={() => {
                      const a = cartProducts?.find((c) => c === product._id);
                      if (a === product?._id) {
                        router("/cart");
                      } else {
                        addProduct(product._id);
                        router("/cart");
                      }
                    }}
                    className="bg-black hover:bg-slate-600 text-white  px-3 py-1 rounded-md "
                  >
                    Buy Now
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      const a = cartProducts?.find((c) => c === product._id);
                      if (a === product?._id) {
                        toast("Already added");
                      } else {
                        addProduct(product._id);
                      }
                    }}
                    className="border-2 border-black hover:bg-black text-black hover:text-white px-3 py-1 transition-all duration-1000 ease-out rounded-md "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </ColWrapper>

          {/* description */}
          <div className="mt-3 mb-5 p-2">
            <h2 className="text-base md:text-lg lg:text-xl font-bold">
              Description:
            </h2>
            <p className="text-sm md:text-base">{product.description}</p>
          </div>

          {/* delivery details */}
          <div className="p-2">
            <p className="text-base md:text-lg lg:text-xl font-bold">
              Delivery Options:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 gap-3">
              <span className="text-base md:text-xl">
                Location:{" "}
                <p className="text-sm md:text-lg">Chittagong, Bangladesh</p>
                <div className="flex p-2">
                  <p className="text-sm bg-red-600 px-4 cursor-pointer rounded-md text-white py-1">
                    Change location
                  </p>
                </div>
              </span>
              <span className="text-base md:text-xl">
                Estimated delivery fee:{" "}
                <p className="text-sm md:text-lg text-red-600 font-bold">
                  &#2547; 60
                </p>
              </span>
              <span className="text-base md:text-xl">
                Payment Process:{" "}
                <p className="text-sm md:text-lg text-blue-800 font-bold">
                  Cash On Delivery
                </p>
              </span>
              <span className="text-base md:text-xl">
                Return Policy:{" "}
                <p className="text-sm md:text-lg">14 days easy return</p>
              </span>
            </div>
          </div>

          {/* Product reviews display */}
          <section id="reviews" className="p-2 pt-28">
            <span className="text-xl font-bold ">Product Review</span>
            <p>{product?.reviews?.length == 0 && "No Review Available"}</p>
            <div>
              {product?.reviews?.map((review, i) => (
                <div key={i} className="py-3 border-b-2 border-gray-500">
                  {/* icon,name,rating and date */}
                  <div className="flex items-center justify-between">
                    {/* icon and name  and rating*/}
                    <div className="flex items-center gap-2 text-lg">
                      <FaUser />
                      <p>
                        {review?.userName ? review?.userName : "Guest User"}
                      </p>
                    </div>
                    {/* date */}
                    <div>
                      <p className="text-gray-600 text-sm">14th july, 2024</p>
                    </div>
                  </div>
                  {/* reviews and ratings*/}
                  <div className="pt-4 pb-2">
                    <Rating
                      readOnly
                      defaultValue={review?.rating ? review?.rating : 4}
                      precision={0.5}
                    />
                  </div>
                  <div className="px-4">{`"${review?.comment}"`}</div>
                </div>
              ))}
            </div>
          </section>
          {/* Product reviews post */}
          <div className="mt-5 p-2">
            <span className="text-xl font-bold block ">Give your Opinions</span>
            <div className="flex items-center gap-5 my-3">
              <span className="text-xs md:text-lg lg:text-xl">Rating</span>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((r) => (
                  <span
                    key={r}
                    onClick={() => setRating(r)}
                    className={`${
                      rating == r
                        ? "bg-red-500 font-bold text-white"
                        : "border-2 border-red-500 hover:bg-red-200"
                    } cursor-pointer px-3 py-1 rounded-md  transition-all duration-1000 ease-out`}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <textarea
              className="mt-2 p-2 block w-[100%] md:w-[50%] resize-none"
              rows={4}
              cols={40}
              placeholder="write your opinion"
              name="review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  document.getElementById("save-button").click();
                }
              }}
            ></textarea>
            <button
              id="save-button"
              className="bg-black text-white rounded px-5 py-2 mt-2 mb-5"
              onClick={() => {
                updateProductWithReview();
                // notify()
              }}
            >
              Save
            </button>
            <Toaster position="top-right" reverseOrder={false} />
          </div>

          {/* Related Products */}
          <div className="p-2">
            <span className="text-xl font-bold ">Related Products</span>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-3">
              {matchedProducts?.map((p, i) => (
                <ProductBox key={i} product={p} />
              ))}
            </div>
          </div>
        </Center>
      </Layout>
    </>
  );
};

export default SingleProductDetails;
