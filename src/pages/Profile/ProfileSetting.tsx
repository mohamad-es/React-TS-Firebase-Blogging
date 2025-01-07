import { UserIcon, Settings01Icon } from "hugeicons-react";
import { useParams } from "react-router";
import TabsLayout from "src/components/Custom/TabsLayout";

const ProfileSetting = () => {
  const params = useParams();
  return (
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
      <div>ProfileSetting</div>
    </TabsLayout>
  );
};

export default ProfileSetting;
