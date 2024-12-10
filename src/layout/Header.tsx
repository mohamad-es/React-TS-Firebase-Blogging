import { onAuthStateChanged, User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "src/config/firebaseConfig";
import banner from "src/assets/banner.png";
import GithubIcon from "src/components/icons/GithubIcon";
import UserProfileIcon from "src/components/icons/UserProfileIcon";
import { logOut } from "src/hooks/useAuth";
import { toast } from "react-toastify";
import ExitIcon from "src/components/icons/ExitIcon";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  return (
    <div className="px-10 flex flex-col items-center justify-between">
      <div className="flex flex-col justify-between pt-4 h-60 shadow-lg w-full rounded-b-2xl relative bg-white">
        <div className="relative">
          <div className="flex flex-col gap-5 px-8">
            <h1 className="text-4xl font-sans font-extrabold pt-5">
              Blogging React + Typescript + Firebase
            </h1>
            <div className="flex gap-2 ">
              <GithubIcon size={20} />{" "}
              <Link
                target="_blank"
                className="text-blue-500"
                to={
                  "https://github.com/mohammad-esmaeilpour/React-TS-Firebase-Blogging"
                }
              >
                {" "}
                github repository
              </Link>
            </div>
          </div>
          <img
            src={banner}
            alt=""
            className="h-[260px] end-0 -top-8 absolute object-cover"
          />
        </div>

        <div className="flex justify-between items-center px-5 py-2 z-20">
          <div className="flex gap-2">
            <Link
              to={"/"}
              className="hover:bg-gray-200 transition-all px-4 py-2 rounded-lg"
            >
              Home
            </Link>
            <Link
              to={"/about"}
              className="hover:bg-gray-200 transition-all px-4 py-2 rounded-lg"
            >
              About
            </Link>
          </div>
          <div className="flex gap-2">
            {loading ? (
              <div className="loading loading-infinity me-20" />
            ) : user ? (
              <div className="flex gap-4">
                <Link
                  to={`${user.uid}/write`}
                  className="hover:bg-gray-200 px-4 transition-all gap-2 py-2 rounded-lg border border-gray-400 flex justify-between"
                >
                  Write 📝
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
                    <li>
                      <Link
                        to={`${user.uid}`}
                        className="flex justify-between items-center gap-1"
                      >
                        Profile
                        <UserProfileIcon size={24} />
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logOut();
                          toast.success("User Successfully Loged out");
                          navigate("/");
                        }}
                        className="flex justify-between"
                      >
                        Logout
                        <ExitIcon size={24} />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <Link
                  className="hover:bg-gray-200 transition-all  px-4 py-2 rounded-lg"
                  to={"/login"}
                >
                  Login
                </Link>
                <Link
                  className="hover:bg-gray-200 transition-all  px-4 py-2 rounded-lg"
                  to={"/register"}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
