/* eslint-disable react/prop-types */

import { useContext } from "react";
import { CartContext } from "../../ContextApi/CartContext";

const FavouriteModal = ({ isVisible, setShowModal, favourites }) => {
  const { removeFavourite } = useContext(CartContext);

  if (!isVisible) return null;

  const handelClose = (e) => {
    if (e.target.id == "wrapper" || e.target.id == "wrapper1")
      setShowModal(false);
  };

  //   console.log(favourites);
  return (
    <div
      onClick={handelClose}
      id="wrapper"
      className="z-[2] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center text-center"
    >
      <div
        onClick={handelClose}
        id="wrapper1"
        className="w-[400px] py-2 px-4 flex flex-col justify-center -z-10"
      >
        <div
          onClick={() => setShowModal(false)}
          className="cursor-pointer flex self-end text-base font-bold text-white"
        >
          X
        </div>
        <div className="bg-white p-2 rounded">
          <h1 className="text-left font-bold text-xl">Favourites List</h1>
          <div className="my-3 flex flex-col gap-2">
            {favourites.length > 0 ? (
              favourites.map((favourite) => (
                <div
                  key={favourite._id}
                  className="flex justify-between items-center p-3 border border-black"
                >
                  <div className="flex items-center">
                    <img
                      className="w-[50px] flex justify-center items-center"
                      src={favourite?.url}
                    />
                    <h1>{favourite?.title}</h1>
                  </div>
                  <span
                    onClick={() => removeFavourite(favourite._id)}
                    className="border border-red-700 p-1 rounded cursor-pointer"
                  >
                    Remove
                  </span>
                </div>
              ))
            ) : (
              <div>No Favourite Added</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavouriteModal;
