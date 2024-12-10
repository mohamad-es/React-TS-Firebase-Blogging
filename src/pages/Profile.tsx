import UserBlogs from "src/components/UserBlogs";
import { auth } from "src/config/firebaseConfig";
import UserProfileIcon from "src/components/icons/UserProfileIcon";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="panel">
      <div className="flex items-center gap-2 mb-5">
        <UserProfileIcon size={40} />
        <div>{auth.currentUser?.email}</div>
      </div>
      <hr />
      <UserBlogs />
          </div>
  );
};

export default Profile;
