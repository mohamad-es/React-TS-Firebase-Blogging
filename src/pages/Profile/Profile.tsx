import { limit, orderBy, where } from "firebase/firestore";
import { useParams } from "react-router";
import TabsLayout from "src/components/Custom/TabsLayout";
import BlogFullList from "src/components/Blog/BlogFullList";
import BlogFullListHeader from "src/components/Blog/BlogFullListHeader";
import { useState } from "react";
import { TBlog } from "src/types/blog";

const Profile = () => {
  const params = useParams();

  const [fitleredBlogs, setFilteredBlogs] = useState<TBlog[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
            filterQuery={[orderBy("create_time", "desc"), limit(6)]}
            setFilteredBlogs={setFilteredBlogs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <BlogFullList
          filteredBlogs={fitleredBlogs}
          searchQuery={searchQuery}
          filterQuery={[orderBy("create_time", "desc"), limit(6), where("user_id", "==", params.uid)]}
        />
      </TabsLayout>
    </div>
  );
};

export default Profile;
