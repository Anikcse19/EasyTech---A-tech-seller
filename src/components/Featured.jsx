/* eslint-disable react/prop-types */
import { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import toast from "react-hot-toast";
import { CartContext } from "../ContextApi/CartContext";
import Center from "./Layout/Center";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Featured = ({ products }) => {
  const { addProduct, cartProducts } = useContext(CartContext);

  const addFeaturedToCart = (product) => {
    const a = cartProducts?.find((c) => c === product._id);
    if (a === product?._id) {
      toast("Already added");
    } else {
      addProduct(product._id);
    }
  };

  return (
    <div style={{ paddingTop: "30px" }}>
      <Center>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {products.map((product, i) => (
            <div key={i} id="featured">
              <div id="featured-left" className="order-2 lg:order-1">
                <h1 className="text-black">{product.title}</h1>
                <p className="text-blue-900 hidden lg:block">{`${product?.description.slice(
                  0,
                  400
                )}...`}</p>
                <p className="text-blue-900 block lg:hidden">{`${product?.description.slice(
                  0,
                  200
                )}...`}</p>
                <div id="button-wrapper">
                  <div
                    className="border border-[#7C00FE] text-center px-8 py-2 rounded-md font-bold text-[#7C00FE] cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                    href={"/product/" + product._id}
                  >
                    Read More
                  </div>
                  <div
                    onClick={() => {
                      addFeaturedToCart(product);
                    }}
                  >
                    <div className="bg-[#7C00FE] hover:bg-[#8f2cf9]  px-8 py-2 rounded-md flex items-center justify-center gap-3 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
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
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                      Add to cart
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="featured-right"
                className="flex items-center justify-center order-1 lg:order-2"
              >
                <img
                  className="w-[250px] h-[200px] lg:w-[400px] lg:h-[300px]"
                  src={product.url}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </Center>
    </div>
  );
};

export default Featured;
