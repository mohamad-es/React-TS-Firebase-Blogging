import { auth } from "src/services/firebaseConfig";
import UserBlogs from "src/components/UserBlogs";
import banner from "src/assets/banner.webp";
import { logOut } from "src/hooks/useAuth";

const Profile = () => {
  return (
    <div className="panel mt-20">
      <div className="mb-12">
        <div className="col-span-3 relative">
          <div className="bg-white absolute start-5 -top-28 w-36 h-36 overflow-hidden outline outline-4 outline-white rounded-md">
            <img src={banner} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        {/* <div className="pt-10">{auth?.currentUser?.email}</div> */}
      </div>
      <UserBlogs />
      <button onClick={()=> logOut()} className="btn-red mt-20 mx-auto">Logout</button>
    </div>
  );
};

export default Profile;
