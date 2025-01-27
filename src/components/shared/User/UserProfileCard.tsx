import { Link } from "react-router";
import RenderState from "../RenderState";

type Props = {
  user_email: string | undefined;
  user_id: string | undefined;
  loading: boolean;
  error: string | null;
};

const UserProfileCard = ({ user_email, user_id, error, loading }: Props) => {
  return (
    <RenderState
      loading={loading}
      error={error}
      data={user_email}
      emptyListText={"user not found"}
    >
      <div className="flex gap-3 justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-200 flex justify-center items-center text-gray-600 ">
            {user_email?.substring(0, 1).toUpperCase()}
          </div>
          <Link
            to={`/${user_id}`}
            className="c-gray hover:text-blue-600 transition-all"
          >
            {user_email}
          </Link>
        </div>
      </div>
    </RenderState>
  );
};

export default UserProfileCard;
