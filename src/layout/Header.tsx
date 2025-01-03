import { onAuthStateChanged, User } from "@firebase/auth";
import { useEffect, useRef, useState } from "react";
import { auth } from "src/config/firebaseConfig";
import Navbar from "./_components/Navbar";
import { layout_data } from "src/data/layout";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "src/hooks/useAuth";
import { toastInstance } from "src/utils/Toast";
import {
  ArrowDown01Icon,
  Logout01Icon,
  Logout02Icon,
  Logout03Icon,
  PencilEdit02Icon,
  UserCircle02Icon,
  UserCircleIcon,
  UserIcon,
} from "hugeicons-react";
import Dropdown from "src/components/Dropdown";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const dropdownRef = useRef<HTMLDetailsElement | null>(null);

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
            <div className="loading loading-bars" />
          ) : user ? (
            <div className="flex gap-4 items-center">
              <Link to="/write" className="flex items-center gap-2 me-10 ">
                {layout_data.header.write}
                <PencilEdit02Icon size={20} />
              </Link>

              <Dropdown
                dropdownRef={dropdownRef}
                summary={auth?.currentUser?.email!}
              >
                {layout_data.header.profile_list.map((item) => (
                  <li>
                    <Link
                      to={item === "Profile" ? `${user.uid}` : "/login"}
                      onClick={() => {
                        dropdownRef.current?.removeAttribute("open");
                        item === "Logout" && handleLogOut;
                      }}
                      className="flex justify-between items-center gap-1 "
                    >
                      {item}
                      {item === "Profile" ? (
                        <UserCircleIcon size={18} />
                      ) : (
                        <Logout02Icon size={18} />
                      )}
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
  );
};

export default Header;
