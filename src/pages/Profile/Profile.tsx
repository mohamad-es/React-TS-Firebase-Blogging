import { limit, orderBy, where } from "firebase/firestore";
import { useParams } from "react-router";
import TabsLayout from "src/components/shared/TabsLayout";
import BlogFullList from "src/components/shared/Blog/BlogFullList";
import BlogFullListHeader from "src/components/shared/Blog/BlogFullListHeader";
import { useState } from "react";
import { TBlog } from "src/types/blog";
import { useAllBlogs } from "src/hooks/blog/useAllBlogs";

const Profile = () => {
  const params = useParams();

  const [fitleredBlogs, setFilteredBlogs] = useState<TBlog[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { dispatch, state } = useAllBlogs([
    orderBy("create_time", "desc"),
    limit(6),
    where("user_id", "==", params.uid),
  ]);

  return (
    <div>
      <TabsLayout
        tabs={[
          { title: "Profile", link: "/profile" },
          {
            title: "Setting",
            link: "/setting",
          },
        ]}
        url={`/${params.uid}`}
      >
        <div className="py-3 sticky top-[102px] border-b bg-white px-10 z-10">
          <BlogFullListHeader
            state={state}
            setFilteredBlogs={setFilteredBlogs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <BlogFullList filteredBlogs={fitleredBlogs} searchQuery={searchQuery} dispatch={dispatch} state={state} />
      </TabsLayout>
    </div>
  );
};

export default Profile;
