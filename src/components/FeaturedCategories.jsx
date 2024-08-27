import axios from "axios";
import { useEffect, useState } from "react";
import Center from "./Layout/Center";
import { baseUrl } from "../../config";
import CategoryBox from "./CategoryBox";

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/categories`)
      .then((res) => setCategories(res.data));
  }, []);

  return (
    <div id="categories" className="py-20" style={{}}>
      <Center>
        <div className=" text-center mb-6">
          <h1 className="font-extrabold text-2xl">Featured Category</h1>
          <h4 className="text-[#7C00FE]">
            Get Your Desired Product from Featured Category!
          </h4>
        </div>
        <div id="all-categories">
          {categories.map((category) => (
            <CategoryBox key={category._id} category={category} />
          ))}
        </div>
      </Center>
    </div>
  );
};

export default FeaturedCategories;
