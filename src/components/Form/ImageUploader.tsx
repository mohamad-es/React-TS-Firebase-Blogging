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
    <div className="flex justify-center">
      {image ? (
        <div className="flex gap-10 items-center">
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

          <img src={image} alt="Preview" className="w-64 h-28 object-contain rounded-lg border" />
        </div>
      ) : (
        <div className="relative h-16 w-64">
          <label htmlFor="upload-banner" className="btn btn-outline absolute start-0 top-0 w-full h-full z-10">
            Add banner for your blog
          </label>

          <input
            id="upload-banner"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="h-full opacity-0 absolute start-0 top-0"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
