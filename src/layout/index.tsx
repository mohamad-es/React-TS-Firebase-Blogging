import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="bg-gray-100 h-screen overflow-auto">
      <div className="max-w-6xl mx-auto">
        <Header />
        <div className="p-10">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
