import { onAuthStateChanged, User } from "@firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { auth } from "src/config/firebaseConfig";
import banner from "src/assets/banner.png";
import GithubIcon from "src/components/icons/GithubIcon";
import Navbar from "./_components/Navbar";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

        <Navbar loading={loading} user={user} />
      </div>
    </div>
  );
};

export default Header;
