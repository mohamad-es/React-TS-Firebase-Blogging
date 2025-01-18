import { CheckmarkCircle02Icon } from "hugeicons-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import TabsLayout from "src/components/Custom/TabsLayout";
import Input from "src/components/Form/Input";
import UpdateProfileImage from "src/components/Form/UpdateProfileImage";

const ProfileSetting = () => {

  const params = useParams();
  const {
    formState: { errors },
    register,
  } = useForm();

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
      <div className="grid grid-cols-12 max-w-[1440px] mx-auto">
        <div className="p-10 col-span-3">
          <UpdateProfileImage/>
        </div>

        <div className="col-span-8">
          <div className="flex justify-between items-center">
            <h2 className="mt-10 mb-16">Update Password</h2>
            <button className="btn btn-primary btn-sm">
              Update Password <CheckmarkCircle02Icon color="#4a00ff" fill="white" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-5 w-full flex-1">
            <Input
              register={register}
              input={{
                label: "Current Password",
                name: "current_password",
                pattern: {
                  value: /^/,
                  message: "",
                },
                placeholder: "",
                required: {
                  message: "",
                  value: true,
                },
                type: "password",
              }}
              errors={errors}
            />

            <Input
              register={register}
              input={{
                label: "New Password",
                name: "current_password",
                pattern: {
                  value: /^/,
                  message: "",
                },
                placeholder: "",
                required: {
                  message: "",
                  value: true,
                },
                type: "password",
              }}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </TabsLayout>
  );
};

export default ProfileSetting;
