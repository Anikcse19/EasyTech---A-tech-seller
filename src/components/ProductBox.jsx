/* eslint-disable react/prop-types */

import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

const ProductBox = ({ product, from }) => {
  const discounted_price = product?.price;
  const discount_percentage = parseFloat(product?.discount) / 100;

  const original_price = parseInt(discounted_price / (1 - discount_percentage));

  return (
    <div className="relative z-[1] w-[100%]  border border-gray-400 rounded-md  group">
      <Link to={`/product/${product?._id}`} className="cursor-pointer">
        {/* product image */}
        <div className="group-hover:scale-110  transition-all duration-300 rounded-t-lg flex justify-center items-center overflow-hidden p-1 md:p-2 lg:p-3  w-[100%] bg-cover ">
          <img
            className="w-90% h-[100px] md:h-[150px] lg:h-[220px]"
            src={product?.url}
          />
        </div>
      </Link>

      <div className="flex flex-col gap-2 py-2 px-2 md:px-3 lg:px-5">
        <div className="flex items-center gap-4">
          <h5 className="text-[10px] sm:text-sm font-bold group-hover:text-[#7C00FE] group-hover:scale-105 transition-all duration-300 ease-out">
            {product?.title}
          </h5>
        </div>
        <p className="text-gray-500 text-xs hidden lg:block">{`${product?.description.slice(
          0,
          80
        )}...`}</p>
        <p className="text-gray-500 text-[8px] sm:text-xs block lg:hidden">{`${product?.description.slice(
          0,
          30
        )}...`}</p>
        <div className="flex items-center gap-3">
          <span className="group-hover:text-[#7C00FE] font-bold text-xs md:text-sm lg:text-base">
            &#2547; {product?.price}
          </span>
          <span>
            <del className="text-xs">&#2547; {original_price}</del>
          </span>
          <span className="text-red-600 font-bold animate-pulse text-xs md:text-sm lg:text-base">
            {product?.discount ? ` - ${product?.discount}` : "- 60%"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Rating
            className="text-xs md:text-sm "
            size="small"
            name="half-rating-read"
            value={product?.rating ? product?.rating : 3.5}
            precision={0.5}
            readOnly
          />
          {from == "top-sell" && (
            <p className="bg-red-600 font-bold p-1 md:p-2 text-center text-white rounded-full text-[8px] md:text-xs animate-bounce">
              Top Sell
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
