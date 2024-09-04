/* eslint-disable react/prop-types */

import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        background: "#F6F5F2",
      }}
      className="w-full flex flex-col gap-10 justify-between relative"
    >
      <div className="relative w-full">
        <Header />
      </div>
      <div className="py-10 min-h-[100vh]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
