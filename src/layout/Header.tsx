import { onAuthStateChanged, User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { Link, Links } from "react-router";
import { auth } from "src/config/firebaseConfig";
import banner from "src/assets/banner.png";
import GithubIcon from "src/components/icons/GithubIcon";

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
      <div className="flex flex-col h-72 shadow-lg w-full overflow-hidden rounded-b-2xl relative bg-white">
        <div className="h-4/5 relative">
          <img src={banner} alt="" className="object-top  object-cover" />
          <h1 className="absolute top-10 start-8 text-4xl font-sans font-extrabold ">
            Blogging React + Typescript + Firebase
          </h1>
          <div className="absolute top-28 start-8 flex gap-2 ">
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

        <div className="flex h-full items-center px-5 z-20 mb-5">
          <div className="flex gap-2">
            <Link
              to={"/"}
              className="hover:bg-gray-200 transition-all  px-4 py-2 rounded-lg"
            >
              Home
            </Link>
            <Link
              to={"/about"}
              className="hover:bg-gray-200 transition-all px-4 py-2 rounded-lg me-64"
            >
              About
            </Link>
            {user ? (
              <div className="flex gap-4">
                <Link
                  to={`${user.uid}/write`}
                  className="hover:bg-gray-200 px-4 transition-all gap-2 py-2 rounded-lg border border-gray-400 flex justify-between"
                >
                  Write 📝
                </Link>
                <Link
                  to={`${user.uid}`}
                  className="hover:bg-gray-200 transition-all  px-4 py-2 rounded-lg"
                >
                  Profile
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
    </div>
  );
};

export default Header;
