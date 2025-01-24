import UserProfileCard from "src/components/User/UserProfileCard";
import { useReadUser } from "src/hooks/user/useReadUser";
import UserBlogs from "./UserBlogs";

const PublicProfile = () => {
  const { state } = useReadUser();

  return (
    <div className="min-h-96 relative flex items-center flex-col justify-center">
      <div className="bg-white w-full py-10">
        <div className="max-w-[1440px] mx-auto">
          <UserProfileCard
            error={state.error}
            user_email={state.data?.email}
            user_id={state.data?.user_id}
            loading={state.loading}
          />
        </div>
      </div>

      <UserBlogs />
    </div>
  );
};

export default PublicProfile;
