import { limit, orderBy, where } from "firebase/firestore";
import { useParams } from "react-router";
import TabsLayout from "src/components/shared/TabsLayout";
import { useRef } from "react";
import { BlogFullList, BlogFullListRef } from "src/components/shared/Blog/BlogFullList";
import { BlogFullListHeader } from "src/components/shared/Blog/BlogFullListHeader";

const Profile = () => {
  const params = useParams();

  const ref = useRef<BlogFullListRef>(null);

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
            searchQuery={ref.current?.searchQuery!}
            setFilteredBlogs={ref.current?.setFilteredBlogs!}
            setSearchQuery={ref.current?.setSearchQuery!}
          />
        </div>

        <BlogFullList
          ref={ref}
          filterQuery={[orderBy("create_time", "desc"), limit(6), where("user_id", "==", params.uid)]}
        />
      </TabsLayout>
    </div>
  );
};

export default Profile;
