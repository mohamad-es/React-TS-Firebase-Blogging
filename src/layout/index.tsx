import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <Header />
      <div className="bg-[#FAFAFA] flex-1 pb-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
};

export default Layout;
