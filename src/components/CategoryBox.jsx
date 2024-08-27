import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const CategoryBox = ({ category }) => {
  const router = useNavigate();

  const handleCategory = (category, id) => {
    router("/singleCategoryProducts/" + id);
  };

  return (
    <div
      title="Click to show all products"
      onClick={() => handleCategory(category, category._id)}
      // style={{
      //   boxShadow:
      //     "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
      // }}
      className="group rounded-md cursor-pointer  col-span-1 text-center px-3  flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        {category.name == "Mobiles" ? (
          <img
            className="w-[60px] h-[60px]  rounded-full bg-cover group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:rotate-[360deg] "
            src="/mobile.jpeg"
            alt="mobile-image"
          />
        ) : category.name == "Laptops" ? (
          <img
            className="w-[60px] h-[60px]  rounded-full bg-cover group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:rotate-[360deg]"
            src="/laptop.jpeg"
            alt="laptop-image"
          />
        ) : category.name == "Headphone" ? (
          <img
            className="w-[60px] h-[60px]  rounded-full bg-cover group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:rotate-[360deg]"
            src="/headphone.jpg"
            alt="headphone-image"
          />
        ) : category.name == "TV" ? (
          <img
            className="w-[60px] h-[60px]  rounded-full bg-cover group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:rotate-[360deg]"
            src="/tv.jpg"
            alt="tv-image"
          />
        ) : category.name == "Smart Watch" ? (
          <img
            className="w-[60px] h-[60px]  rounded-full bg-cover group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:rotate-[360deg]"
            src="/smart-watch.jpg"
            alt="smart-watch-image"
          />
        ) : category.name == "Gamming Console" ? (
          <img
            className="w-[60px] h-[60px]  rounded-full bg-cover group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:rotate-[360deg]"
            src="/gaming-console.jpg"
            alt="gaming-console-image"
          />
        ) : category.name == "Drone" ? (
          <img
            className="w-[60px] h-[60px]  rounded-full bg-cover group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:rotate-[360deg]"
            src="/drone.jpeg"
            alt="drone-image"
          />
        ) : category.name == "Printer" ? (
          <img
            className="w-[60px] h-[60px]  rounded-full bg-cover group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:rotate-[360deg]"
            src="/printer.jpg"
            alt="printer-image"
          />
        ) : category.name == "CC Camera" ? (
          <img
            className="w-[60px] h-[60px]  rounded-full bg-cover group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:rotate-[360deg]"
            src="/cc-camera.jpg"
            alt="cc-camera-image"
          />
        ) : category.name == "Battery For Laptop" ? (
          <img
            className="w-[60px] h-[60px]  rounded-full bg-cover group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:rotate-[360deg]"
            src="/batter-laptop.jpg"
            alt="battery-laptop-image"
          />
        ) : (
          ""
        )}

        <p className="py-1 text-xs ">{category.name}</p>
      </div>
    </div>
  );
};

export default CategoryBox;
