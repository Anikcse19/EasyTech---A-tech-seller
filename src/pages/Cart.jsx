/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../ContextApi/CartContext";
import { baseUrl } from "../../config";
import Layout from "../components/Layout/Layout";
import Center from "../components/Layout/Center";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [namee, setNamee] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post(`${baseUrl}/api/cart`, { ids: cartProducts })
        .then((res) => setProducts(res.data));
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  async function goToPayment() {
    const buyerData = {
      namee,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    };

    const response = await axios.post(
      `${baseUrl}/api/orders/checkout`,
      buyerData
    );
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (typeof window === "undefined") {
        return;
      }
      if (window?.location.href.includes("success")) {
        setIsSuccess(true);

        clearCart();
      }
    }, 300);
  }, []);

  if (isSuccess) {
    return (
      <>
        <Layout>
          <div id="success-msg">
            <h2>Successfully placed orders</h2>
            <p>We will confirm your delivery date via mail</p>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout>
        <Center>
          <div id="cart-wrapper">
            <div id="cart-left">
              <h2 className="text-2xl font-extrabold">Cart</h2>
              <br />

              {products.length > 0 ? (
                <table className="w-[100%]">
                  <thead>
                    <tr className="text-left ">
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {products.map((product, i) => (
                      <tr key={i} className="border p-4">
                        <td>
                          <img className="max-w-[80px]" src={product.url} />
                          {product.title}
                        </td>
                        <td className="flex items-center gap-2 mt-8">
                          <div
                            onClick={() => removeProduct(product._id)}
                            id="decrease-button"
                          >
                            -
                          </div>
                          <span>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </span>
                          <div
                            onClick={() => addProduct(product._id)}
                            id="increase-button"
                          >
                            +
                          </div>
                        </td>
                        <td>
                          $
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Total: {total} </td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <div className="flex flex-col justify-center">
                  <h2 className="text-center text-3xl font-extrabold">
                    Your Cart is Empty
                  </h2>
                  <Link
                    to="/"
                    className=" bg-black w-[100px] mx-auto mt-3 px-3 py-1 text-white text-center font-bold rounded-sm"
                  >
                    Go Back
                  </Link>
                </div>
              )}
            </div>
            {cartProducts.length > 0 && (
              <div id="cart-right">
                <h1 className="mb-5">Your Order Summary</h1>
                <Input
                  onChange={(ev) => setNamee(ev.target.value)}
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={namee}
                />
                <Input
                  onChange={(ev) => setEmail(ev.target.value)}
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                />
                <div className="flex gap-3">
                  <Input
                    onChange={(ev) => setCity(ev.target.value)}
                    type="text"
                    placeholder="City"
                    name="city"
                    value={city}
                  />
                  <Input
                    onChange={(ev) => setPostalCode(ev.target.value)}
                    type="text"
                    placeholder="Postal Code"
                    name="postalCode"
                    value={postalCode}
                  />
                </div>
                <Input
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={streetAddress}
                />
                <Input
                  onChange={(ev) => setCountry(ev.target.value)}
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={country}
                />
                <div onClick={goToPayment}>
                  <Button black fontWhite>
                    Continue to payment
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Center>
      </Layout>
    </>
  );
};

export default CartPage;
