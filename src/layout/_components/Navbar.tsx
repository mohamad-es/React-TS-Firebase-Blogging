import { User } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import ExitIcon from "src/components/icons/ExitIcon";
import NoteBookIcon from "src/components/icons/NoteBookIcon";
import UserProfileIcon from "src/components/icons/UserProfileIcon";
import { auth } from "src/config/firebaseConfig";
import { logOut } from "src/hooks/useAuth";
import { toastInstance } from "src/utils/Toast";

type Props = {
  user: User | null;
  loading: boolean;
};

const Navbar = ({ user, loading }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-5 py-2 z-20">
      <div className="flex gap-2">
        <Link
          to={"/"}
          className="hover:bg-gray-200 transition-all px-4 py-2 rounded-lg"
        >
          Home
        </Link>
        <Link
          to={"/blogs"}
          className="hover:bg-gray-200 transition-all px-4 py-2 rounded-lg"
        >
          Blogs
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
            <Link to="/write" className="btn border border-gray-400 bg-white">
              Write
              <NoteBookIcon size={20} />
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
                      toastInstance({
                        text: "User Successfully Loged out",
                        type: "success",
                      });
                      navigate("/login");
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
  );
};

export default Navbar;
