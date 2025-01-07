import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-[#FAFAFA]">
        <div className="flex flex-col flex-1 w-full max-w- mx-auto pb-10 ">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
