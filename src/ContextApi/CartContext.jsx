/* eslint-disable react/prop-types */

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [modalOpenCount, setModalOpenCount] = useState(0);
  const [searchedWord, setSearchedWord] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (cartProducts?.length >= 0) {
        localStorage?.setItem("cart", JSON.stringify(cartProducts));
      }
      if (favouriteProducts?.length >= 0) {
        localStorage?.setItem("favourite", JSON.stringify(favouriteProducts));
      }
    }, 300);
  }, [cartProducts, favouriteProducts]);

  useEffect(() => {
    if (localStorage && localStorage.getItem("cart")) {
      setCartProducts(JSON.parse(localStorage.getItem("cart")));
    }
    if (localStorage && localStorage.getItem("favourite")) {
      setFavouriteProducts(JSON.parse(localStorage.getItem("favourite")));
    }
  }, []);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function addFavourite(productId) {
    const isAvailable = favouriteProducts.find((item) => item == productId);

    if (isAvailable == "" || isAvailable == undefined) {
      setFavouriteProducts((prev) => [...prev, productId]);
    }
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);

      if (pos != -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }

  function removeFavourite(productId) {
    setFavouriteProducts((prev) => {
      const pos = prev.indexOf(productId);

      if (pos != -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        favouriteProducts,
        addProduct,
        addFavourite,
        removeFavourite,
        removeProduct,
        clearCart,
        showInitialModal,
        setShowInitialModal,
        modalOpenCount,
        setModalOpenCount,
        searchedWord,
        setSearchedWord,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
