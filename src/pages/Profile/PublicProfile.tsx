import { useState } from "react";
import { TBlog } from "src/types/blog";
import { searchBlogs } from "src/services/blogServices";
import BlogCard from "src/components/Blog/BlogCard";
import Search from "src/components/Form/Search";
import LoadingButton from "src/components/Buttons/LoadingButton";
import { profile_data } from "src/data/profile";
import UserProfileCard from "src/components/User/UserProfileCard";
import RenderState from "src/components/Custom/RenderState";
import { useFetchUser } from "src/hooks/useUser";
import { useFetchBlogs } from "src/hooks/useBlog";
import { limit, orderBy, where } from "firebase/firestore";
import { useParams } from "react-router";

const PublicProfile = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<TBlog[]>([]);
  const { user, userError, userLoading } = useFetchUser();
  const { blogs, error, loadMoreLoading, loading, blogsPerPage, setPage, page } = useFetchBlogs({
    filterQuery: [orderBy("create_time", "desc"), limit(6), where("user_id", "==", params.uid)],
  });

  return (
    <div className="min-h-96 relative flex items-center flex-col justify-center">
      <div className="bg-white w-full py-10">
        <div className="max-w-[1440px] mx-auto">
          <UserProfileCard error={userError} user_email={user?.email!} user_id={user?.user_id!} loading={userLoading} />
        </div>
      </div>

      <RenderState
        loading={loading && page === 1}
        error={error}
        data={blogs.length}
        emptyListText={profile_data.not_found}
      >
        <div className="bg-white border-b w-full sticky top-[64px] py-3 z-10">
          <div className="flex max-w-[1440px] mx-auto justify-between items-center ">
            <h2>{profile_data.title}</h2>
            <Search
              searchData={searchBlogs}
              searchQuery={searchQuery}
              setFiltered={setFilteredBlogs}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-8 max-w-[1440px]">
          {(searchQuery ? filteredBlogs : blogs).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <LoadingButton
          blogsPerPage={blogsPerPage}
          data={blogs}
          loadMoreLoading={loadMoreLoading}
          searchQuery={searchQuery}
          setPage={setPage}
        />
      </RenderState>
    </div>
  );
};

export default PublicProfile;
