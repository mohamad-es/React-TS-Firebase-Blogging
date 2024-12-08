import { onAuthStateChanged, User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { auth } from "src/services/firebaseConfig";
import banner from "src/assets/landing-banner.png";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="px-10 flex flex-col items-center justify-between">
      <div className="flex flex-col h-80 shadow-lg w-full overflow-hidden rounded-b-2xl relative bg-white">
        <div className="h-4/5 relative">
          <img src={banner} alt="" className="w-full h-full object-cover" />
          <h1 className="absolute bottom-4 start-8 text-3xl font-sans font-extrabold text-white">
            Blogstore | Free Blog Source
          </h1>
        </div>

        <div className="flex h-full items-center justify-between px-5">
          <div className="flex gap-2">
            <Link
              to={"/"}
              className="hover:bg-gray-200 transition-all  px-4 py-2 rounded-lg"
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
          {user ? (
            <div className="flex gap-4">
              <Link
                to={`${user.uid}/write`}
                className="hover:bg-gray-200 px-4 transition-all gap-2 py-2 rounded-lg border flex justify-between"
              >
                Write 📝
              </Link>
              <Link
                to={`${user.uid}`}
                className="hover:bg-gray-200 transition-all  px-4 py-2 rounded-lg"
              >
                My Profile
              </Link>
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
  );
};

export default Header;
