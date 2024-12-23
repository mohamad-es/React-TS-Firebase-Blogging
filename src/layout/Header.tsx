import { onAuthStateChanged, User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "src/config/firebaseConfig";
import Navbar from "./_components/Navbar";
import { layout_data } from "src/data/layout";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "src/hooks/useAuth";
import { toastInstance } from "src/utils/Toast";
import {
  Logout01Icon,
  PencilEdit02Icon,
  UserCircle02Icon,
} from "hugeicons-react";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    toastInstance({
      text: "User Successfully Loged out",
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
    <div className=" sticky top-0 z-10 bg-white py-3 border-b">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="font-bold text-xl">{layout_data.header.title}</div>
          <Navbar list={layout_data.header.navbar} />
        </div>
        <div className="flex gap-2">
          {loading ? (
            <div className="loading loading-infinity" />
          ) : user ? (
            <div className="flex gap-4 items-center">
              <Link
                to="/write"
                className="flex items-center gap-2 border btn btn-outline"
              >
                {layout_data.header.write}
                <PencilEdit02Icon size={20} />
              </Link>

              <div className="dropdown dropdown-hover">
                <div
                  tabIndex={0}
                  className="btn font-light tracking-wide bg-white hover:bg-gray-200 border-none shadow-none h-9 min-h-5 m-1"
                >
                  {auth.currentUser?.email}
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-100 rounded-box z-40 w-52 p-2 shadow"
                >
                  {layout_data.header.profile_list.map((item) => (
                    <li>
                      <Link
                        to={item === "Profile" ? `${user.uid}` : "/login"}
                        onClick={() => item === "Logout" && handleLogOut}
                        className="flex justify-between items-center gap-1"
                      >
                        {item}
                        {item === "Profile" ? (
                          <UserCircle02Icon />
                        ) : (
                          <Logout01Icon />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <Navbar list={layout_data.header.auth} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
