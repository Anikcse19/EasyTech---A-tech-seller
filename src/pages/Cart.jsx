/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../ContextApi/CartContext";
import { baseUrl } from "../../config";
import Layout from "../components/Layout/Layout";
import Center from "../components/Layout/Center";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
          <div className="flex items-center justify-center min-h-[100vh]">
            <div className="h-full">
              <h2 className="text-lg md:text-xl lg:text-2xl text-primary font-bold">
                Successfully placed orders
              </h2>
              <p className="text-base md:text-lg lg:text-xl py-3">
                We will confirm your delivery date via mail
              </p>
              <button
                onClick={() => navigate("/products")}
                className="bg-primary px-5 py-1 rounded-md text-white hover:scale-110 transition-all duration-300 ease-in cursor-pointer"
              >
                Order more .....
              </button>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout>
        <Center>
          <div
            id="cart-wrapper"
            className="flex flex-col lg:flex-row items-center justify-between gap-10 my-16 "
          >
            <div id="cart-left" className=" w-full  self-start">
              <h2 className="text-2xl font-extrabold">Cart</h2>
              <br />

              {products.length > 0 ? (
                <table className="w-[100%]">
                  <thead>
                    <tr className="text-left py-2">
                      <th className="py-2">Product Name</th>
                      <th className="py-2">Quantity</th>
                      <th className="py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody className="p-2 border-2 border-black mt-2">
                    {products.map((product, i) => (
                      <tr key={i} className=" p-4 px-2">
                        <td className="px-2">
                          <img className="max-w-[80px]" src={product.url} />
                          {product.title}
                        </td>
                        <td className="flex items-center gap-3 mt-8">
                          <div
                            onClick={() => removeProduct(product._id)}
                            id="decrease-button"
                            className="px-2 py-1 shadow-lg border border-black rounded-md  font-bold cursor-pointer"
                          >
                            -
                          </div>
                          <span className="font-bold">
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </span>
                          <div
                            onClick={() => addProduct(product._id)}
                            id="increase-button"
                            className="px-2 py-1 shadow-lg border border-black rounded-md  font-bold cursor-pointer"
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
              <div id="cart-right" className="w-full self-start ">
                <h1 className="mb-5">Delivery Address</h1>
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center gap-3 w-full">
                    <input
                      onChange={(ev) => setNamee(ev.target.value)}
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={namee}
                      className="w-full px-3 py-1 rounded outline-none border border-black"
                    />
                    <input
                      onChange={(ev) => setEmail(ev.target.value)}
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      className="w-full px-3 py-1 rounded outline-none border border-black"
                    />
                  </div>
                  <div className="flex gap-3">
                    <input
                      onChange={(ev) => setCity(ev.target.value)}
                      type="text"
                      placeholder="City"
                      name="city"
                      value={city}
                      className="w-full px-3 py-1 rounded outline-none border border-black"
                    />
                    <input
                      onChange={(ev) => setPostalCode(ev.target.value)}
                      type="text"
                      placeholder="Postal Code"
                      name="postalCode"
                      value={postalCode}
                      className="w-full px-3 py-1 rounded outline-none border border-black"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      onChange={(ev) => setStreetAddress(ev.target.value)}
                      type="text"
                      placeholder="Street Address"
                      name="streetAddress"
                      value={streetAddress}
                      className="w-full px-3 py-1 rounded outline-none border border-black"
                    />
                    <input
                      onChange={(ev) => setCountry(ev.target.value)}
                      type="text"
                      placeholder="Country"
                      name="country"
                      value={country}
                      className="w-full px-3 py-1 rounded outline-none border border-black"
                    />
                  </div>
                </div>
                <div onClick={goToPayment} className="my-5">
                  <button className="text-center w-full bg-gray-100 py-2 font-bold hover:bg-white transition-all duration-300 ease-out">
                    Continue to payment
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="text-lg md:text-xl lg:text-3xl text-primary font-bold">
              Our Policy
            </p>
            <div className="my-6">
              {policies?.map((p, i) => (
                <div key={p.type}>
                  <p className="font-bold">
                    {`  ${i + 1}. 
                    ${p.type}`}
                  </p>
                  {p.desc && <p className="p-3">{p.desc}</p>}
                  {p.details &&
                    p.details.map((d, i) => (
                      <div className="p-3" key={i}>
                        <li className="font-semibold">{d.title}</li>
                        <p className="px-5 py-2">{d.desc}</p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </Center>
      </Layout>
    </>
  );
};

export default CartPage;

const policies = [
  {
    type: "Delivery Timeframe",
    details: [
      {
        title: "Standard Delivery",
        desc: "Products are usually delivered within 5-7 business days from the order date.",
      },
      {
        title: "Express Delivery",
        desc: "Available for select locations, with delivery within 1-3 business days for an additional fee.",
      },
    ],
  },
  {
    type: " Shipping Charges",
    details: [
      {
        title: "Standard Delivery",
        desc: "Free for orders above [specific amount], otherwise a flat rate of [amount] will be charged.",
      },
      {
        title: "Express Delivery",
        desc: "Charged at [amount] per order.",
      },
    ],
  },
  {
    type: "Order Tracking",
    desc: "Once your order is dispatched, you will receive a tracking link via email/SMS, allowing you to track your delivery in real-time.",
  },
  {
    type: "Delivery Locations",
    desc: "We deliver to most locations within [country/region]. Some remote or high-risk areas might have limited delivery options.",
  },
  {
    type: "Handling Delays",
    desc: "In case of delays due to weather, strikes, or other unforeseen circumstances, we will notify you via email/SMS with an updated delivery estimate.",
  },
  {
    type: "Delivery Attempt",
    desc: "If you are unavailable during the delivery attempt, the carrier will leave a notice with instructions for rescheduling or picking up the order.",
  },
  {
    type: "Damaged or Missing Items",
    desc: "If you receive a package that is damaged or missing items, please contact our customer service within 48 hours of delivery with photos of the damage and your order number.",
  },
];
