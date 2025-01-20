import { PlusSignIcon } from "hugeicons-react";
import { ChangeEvent, useState } from "react";
import { useUpdateUserProfile } from "src/hooks/useUser";
// import { toastInstance } from "src/utils/Toast";

const UpdateProfileImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const { updateUserProfile } = useUpdateUserProfile();

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024) {
        // toastInstance({
        //   text: "File size must be less than 100KB",
        //   type: "error",
        // });
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result as string;
        setImage(base64Image); // If you still want to keep the image in state

        // Update the user profile with the new image
        await updateUserProfile(base64Image);
      };
      reader.onerror = (error) => {
        console.error("Error converting image to Base64:", error);
        // toastInstance({
        //   text: "Failed to upload image",
        //   type: "error",
        // });
      };
    }
  };

  return (
    <div>
      {image ? (
        <div className="max-w-44 flex flex-col gap-10 items-center">
          <div className="relative h-32 w-32 bg-white border rounded-full overflow-hidden">
            <img
              src={image}
              alt="Preview"
              className="w-full h-full object-cover absolute text-xl left-0 top-0 flex flex-col gap-5 items-center justify-center"
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative w-40 h-10">
              <label htmlFor="upload-banner" className="btn btn-outline absolute start-0 top-0 w-full h-full z-10">
                Change banner
              </label>

              <input
                id="upload-banner"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="h-full w-full opacity-0 absolute start-0 top-0"
              />
            </div>
            <button className="text-red-500 font-medium" onClick={() => setImage(null)}>
              Remove banner
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-44 flex flex-col justify-center gap-5 items-center">
          <div className="relative h-32 w-32 bg-white border rounded-full">
            <label
              htmlFor="upload-banner"
              className="w-full h-full cursor-pointer z-20 absolute text-xl left-0 top-0 flex flex-col gap-5 items-center justify-center"
            >
              <PlusSignIcon size={50} color="gray" />
            </label>

            <input
              id="upload-banner"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="h-full w-full opacity-0 absolute left-0 top-0 p-0"
            />
          </div>
          <div className="text-sm">Upload your profile image</div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfileImage;
