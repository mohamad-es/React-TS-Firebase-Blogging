import { Link } from "react-router";
import RenderState from "../RenderState";
import UserProfileCardSkeleton from "src/components/Skeleton/UserProfileCardSkeleton";

type Props = {
  user_email: string | undefined;
  user_id: string | undefined;
  img: string | undefined;
  loading: boolean;
  error: string | null;
};

const UserProfileCard = ({ user_email, user_id, error, loading, img }: Props) => {
  return (
    <RenderState
      loading={loading}
      error={error}
      loadingRender={<UserProfileCardSkeleton />}
      emptyListText={"user not found"}
    >
      <div className="flex gap-3 justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          {img ? (
            <img src={img} className="w-7 h-7 overflow-hidden rounded-full" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gray-200 flex justify-center items-center text-gray-600 ">
              {user_email?.substring(0, 1).toUpperCase()}
            </div>
          )}
          <Link to={`/${user_id}`} className="c-gray hover:text-blue-600 transition-all">
            {user_email}
          </Link>
        </div>
      </div>
    </RenderState>
  );
};

export default UserProfileCard;
