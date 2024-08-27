/* eslint-disable react/prop-types */

import Center from "./Layout/Center";
import ProductBox from "./ProductBox";

const AllProducts = ({ products }) => {
  return (
    <Center>
      <h2 className="mt-6 p-2 text-3xl tracking-wider font-extrabold">
        All Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 &&
          products.map((product) => (
            <ProductBox key={product._id} product={product} />
          ))}
      </div>
    </Center>
  );
};

export default AllProducts;
