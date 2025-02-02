import { UserCircleIcon, Logout02Icon } from "hugeicons-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router";
import Dropdown from "src/components/custom/Dropdown";
import { auth } from "src/config/firebaseConfig";
import { layout_data } from "src/data/layout";
import { useReadUser } from "src/hooks/user/useReadUser";
import { logOut } from "src/services/auth/logout";
import { successToast } from "src/utils/Toast";

type Props = {
  uid: string;
};

const UserProfileDropdown = ({ uid }: Props) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    successToast("User Successfully Logged out");
    navigate("/login");
  };

  const { state } = useReadUser(uid);

  const dropdownRef = useRef<HTMLDetailsElement | null>(null);
  return (
    <Dropdown
      dropdownRef={dropdownRef}
      summary={
        state.loading ? (
          <div className="skeleton w-full h-full" />
        ) : state.data?.img ? (
          <img src={state.data.img} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white">{auth?.currentUser?.email?.substring(0, 1).toUpperCase()}</span>
        )
      }
      className="dropdown-end"
    >
      {layout_data.header.profile_list.map((item) => (
        <li key={item}>
          <Link
            to={item === "Profile" ? `${uid}/profile` : "/login"}
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
  );
};

export default UserProfileDropdown;
