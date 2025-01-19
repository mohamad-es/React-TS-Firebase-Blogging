import { onAuthStateChanged, User } from "@firebase/auth";
import { Fragment, useEffect, useRef, useState } from "react";
import { auth } from "src/config/firebaseConfig";
import Navbar from "./_components/Navbar";
import { layout_data } from "src/data/layout";
import { Link, useNavigate } from "react-router-dom";
import { toastInstance } from "src/utils/Toast";
import { Logout02Icon, PencilEdit02Icon, UserCircleIcon } from "hugeicons-react";
import Dropdown from "src/components/Form/Dropdown";
import { logOut } from "src/services/authService";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const dropdownRef = useRef<HTMLDetailsElement | null>(null);

  const navigate = useNavigate();

  const handleLogOut = () => {
    console.log("Logging out...");
    logOut();
    toastInstance({
      text: "User Successfully Logged out",
      type: "success",
    });
    navigate("/login");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  return (
    <Fragment>
      <div className="sticky hidden lg:block top-0 z-20 bg-white py-3">
        <div className="flex justify-between items-center max-w-[1440px] mx-auto">
          <div className="flex items-center">
            <div className="font-bold text-xl">{layout_data.header.title}</div>
            <Navbar list={layout_data.header.navbar} />
          </div>
          <div className="flex gap-2">
            {loading ? (
              <div className="loading loading-bars" />
            ) : user ? (
              <div className="flex gap-4 items-center">
                <Link to="/write" className="flex items-center gap-2 me-5">
                  {layout_data.header.write}
                  <PencilEdit02Icon size={20} />
                </Link>

                <Dropdown
                  dropdownRef={dropdownRef}
                  summary={
                    <span className="text-white">{auth?.currentUser?.email?.substring(0, 1).toUpperCase()}</span>
                  }
                  className="dropdown-end"
                >
                  {layout_data.header.profile_list.map((item) => (
                    <li key={item}>
                      <Link
                        to={item === "Profile" ? `${user.uid}/profile` : "/login"}
                        onClick={() => {
                          dropdownRef.current?.removeAttribute("open");
                          if (item === "Logout") {
                            handleLogOut(); // Correctly invoke the function
                          }
                        }}
                        className="flex justify-between items-center gap-1 "
                      >
                        {item}
                        {item === "Profile" ? <UserCircleIcon size={18} /> : <Logout02Icon size={18} />}
                      </Link>
                    </li>
                  ))}
                </Dropdown>
              </div>
            ) : (
              <Navbar list={layout_data.header.auth} />
            )}
          </div>
        </div>
      </div>

      <div className="navbar-start lg:hidden">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
