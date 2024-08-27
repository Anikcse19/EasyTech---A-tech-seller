/* eslint-disable react/prop-types */

import Center from "./Layout/Center";
import ProductBox from "./ProductBox";

const NewProducts = ({ newProducts }) => {
  return (
    <div id="products" style={{}}>
      <Center>
        <div className=" text-center mb-6">
          <h1 className="font-extrabold text-2xl">Featured Products</h1>
          <h4 className="text-[#7C00FE]">Check & Get Your Desired Product!</h4>
        </div>
        <div id="">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center text  gap-3 p-2">
            {newProducts?.length > 0 &&
              newProducts.map((product) => (
                <ProductBox key={product._id} from="" product={product} />
              ))}
          </div>
        </div>
      </Center>
    </div>
  );
};

export default NewProducts;
