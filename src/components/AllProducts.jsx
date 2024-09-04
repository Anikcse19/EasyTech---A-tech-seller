/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Center from "./Layout/Center";
import ProductBox from "./ProductBox";
import axios from "axios";
import { baseUrl } from "../../config";

const AllProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSerachValue] = useState("");
  const [selectCat, setSelectCat] = useState(null);
  const [lowBudgetChecked, setLowBudgetChecked] = useState(false);
  const [highBudgetChecked, setHighBudgetChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/categories`)
      .then((res) => setCategories(res?.data));

    axios.get(`${baseUrl}/api/products`).then((res) => {
      setFilteredProducts(res?.data);
      setProducts(res?.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // Filter products based on the search value
    applyFilters();
  }, [searchValue, selectCat, lowBudgetChecked, highBudgetChecked, products]); // Re-run the filter when dependencies change

  const applyFilters = () => {
    let updatedProducts = [...products];

    // Filter by search value
    if (searchValue) {
      updatedProducts = updatedProducts.filter((p) =>
        p.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Filter by category
    if (selectCat && selectCat !== "all") {
      updatedProducts = updatedProducts.filter((p) => p.category === selectCat);
    }

    // Filter by budget
    if (lowBudgetChecked) {
      updatedProducts = updatedProducts.filter((p) => p.price < 50000);
    } else if (highBudgetChecked) {
      updatedProducts = updatedProducts.filter((p) => p.price >= 50000);
    }

    setFilteredProducts(updatedProducts);
  };

  const handleLowBudgetChange = (e) => {
    const isChecked = e.target.checked;
    setLowBudgetChecked(isChecked);
    if (isChecked) {
      setHighBudgetChecked(false); // Uncheck High Budget if Low Budget is checked
    }
  };

  const handleHighBudgetChange = (e) => {
    const isChecked = e.target.checked;
    setHighBudgetChecked(isChecked);
    if (isChecked) {
      setLowBudgetChecked(false); // Uncheck Low Budget if High Budget is checked
    }
  };
  return (
    <Center>
      {/* <h2 className="mt-6 p-2 text-3xl tracking-wider font-extrabold">
        All Products
      </h2> */}
      <div className="mt-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-6">
        <div>
          <input
            onChange={(e) => setSerachValue(e.target.value)}
            placeholder="search..."
            type="text"
            className="hidden lg:block px-8 py-1 rounded outline-none border-2 border-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="category">Category</label>
          <select
            className="px-8 py-1 rounded outline-none border-2 border-primary"
            name=""
            id=""
            onChange={(e) => setSelectCat(e.target.value)}
          >
            <option value="all">All</option>
            {categories?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <p>Budget:</p>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="low-budget"
              id="low-budget"
              checked={lowBudgetChecked}
              onChange={handleLowBudgetChange}
            />
            <label htmlFor="low-budget">Low </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="high-budget"
              id="high-budget"
              checked={highBudgetChecked}
              onChange={handleHighBudgetChange}
            />
            <label htmlFor="high-budget">High </label>
          </div>
        </div>
        <div>
          <input
            onChange={(e) => setSerachValue(e.target.value)}
            placeholder="search..."
            type="text"
            className="block lg:hidden px-8 py-1 rounded outline-none border-2 border-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
        {loading ? (
          <div>Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-base md:text-lg lg:text-xl">No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductBox key={product._id} product={product} />
          ))
        )}
      </div>
    </Center>
  );
};

export default AllProducts;
