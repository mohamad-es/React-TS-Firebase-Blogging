import { Image01Icon, PlusSignIcon } from "hugeicons-react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { toastInstance } from "src/utils/Toast";

type Props = {
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
};

const ImageUploader = ({ image, setImage }: Props) => {
  // Handle image upload and convert to Base64
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (100KB limit)
      if (file.size > 100 * 1024) {
        toastInstance({
          text: "File size must be less than 100KB",
          type: "error",
        });
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error("Error converting image to Base64:", error);
        toastInstance({
          text: "Failed to upload image",
          type: "error",
        });
      };
    }
  };
  return (
    <div className="">
      {image ? (
        <div className="flex flex-col gap-10 items-center">
          <img src={image} alt="Preview" className="w-full h-96 object-cover rounded-xl border" />

          <div className="flex gap-5">
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
        <div className="relative h-96 w-full border-b-2 rounded-xl rounded-b-none">
          <label
            htmlFor="upload-banner"
            className="w-full h-full cursor-pointer z-20 absolute text-xl left-0 top-0 flex flex-col gap-5 items-center justify-center"
          >
            <PlusSignIcon size={50} color="gray" />
            Add banner for your blog
          </label>

          <input
            id="upload-banner"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="h-full w-full opacity-0 absolute left-0 top-0 p-0"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
