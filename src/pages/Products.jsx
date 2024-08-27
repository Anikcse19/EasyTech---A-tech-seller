import { useEffect, useState } from "react";
import AllProducts from "../components/AllProducts";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/api/products`).then((res) => setProducts(res?.data));
  }, []);
  return (
    <>
      <Layout>
        <AllProducts products={products} />
      </Layout>
    </>
  );
};

export default Products;
