import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import CategoriesPage from "../pages/Categories";
import CartPage from "../pages/Cart";
import SingleProductDetails from "../pages/singleProductDetails";
import CategoryPage from "../pages/singleCategoryDetails";
import ScrollToTop from "../components/ScrollTop";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Home />,
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <ScrollToTop />
        <Products />,
      </>
    ),
  },
  {
    path: "/categories",
    element: (
      <>
        <ScrollToTop />
        <CategoriesPage />,
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <ScrollToTop />
        <PrivateRoute>
          <CartPage />
        </PrivateRoute>
        ,
      </>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <>
        <ScrollToTop />
        <SingleProductDetails />,
      </>
    ),
  },
  {
    path: "/singleCategoryProducts/:id",
    element: (
      <>
        <ScrollToTop />
        <CategoryPage />,
      </>
    ),
  },
  {
    path: "/registration",
    element: (
      <>
        <ScrollToTop />
        <RegistrationPage />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <ScrollToTop />
        <LoginPage />
      </>
    ),
  },
]);

export default routes;
