import { CheckmarkCircle02Icon, PlusSignIcon } from "hugeicons-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import TabsLayout from "src/components/shared/TabsLayout";
import Input from "src/components/form/Input";
import ImageUploader from "src/components/shared/ImageUploader";
import { useUpdateUser } from "src/hooks/user/useUpdateUser";
import { useReadUser } from "src/hooks/user/useReadUser";
import SubmitButton from "src/components/buttons/SubmitButton";

const ProfileSetting = () => {
  const params = useParams();
  const {
    formState: { errors },
    register,
  } = useForm();

  const { state: userState } = useReadUser(params.uid!);

  const { dispatch, state, submitUpdateUser } = useUpdateUser(userState?.data!);

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
      <div className="max-w-[1440px] mx-auto">
        <div className="p-10 flex items-center flex-col justify-center gap-3">
          <ImageUploader
            dispatch={dispatch}
            state={state}
            img={<img src={state.data?.img} alt="Preview" className=" object-cover rounded-full w-44 h-44" />}
            label={
              <label
                htmlFor="upload-banner"
                className="w-44 h-44 mx-auto cursor-pointer bg-white rounded-full z-20 text-xl flex flex-col gap-5 items-center justify-center"
              >
                <PlusSignIcon size={40} color="gray" />
                <span className="text-sm">Add profile photo</span>
              </label>
            }
          />

          <SubmitButton loading={state.loading} title="Save profile" submitFn={submitUpdateUser} />
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
