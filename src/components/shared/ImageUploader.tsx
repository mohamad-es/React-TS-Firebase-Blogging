import { ChangeEvent, Dispatch, ReactNode, useEffect } from "react";
import { TFetchingAction } from "src/types/actions";
import { TFetchingStates } from "src/types/states";
import { errorToast } from "src/utils/Toast";

type Props<T extends { img: string | null }> = {
  state: TFetchingStates<T>;
  dispatch: Dispatch<TFetchingAction<T>>;
  img: ReactNode;
  label: ReactNode;
};

const ImageUploader = <T extends { img: string | null }>({ dispatch, state, img, label }: Props<T>) => {
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > 100 * 1024) {
        errorToast("File size must be less than 100KB");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        dispatch({ type: "SUCCESS", payload: { ...state.data, img: reader.result } as T });
      };
      reader.onerror = (error) => {
        errorToast(error instanceof Error ? error.message : "Failed to upload image");
      };
    }
  };

  useEffect(() => {
    console.log(state);
  }, [state.data]);

  return (
    <div>
      {state.data?.img ? (
        <div className="flex flex-col gap-10 items-center">
          {img}
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
            <button
              className="text-red-500 font-medium"
              onClick={() => dispatch({ type: "SUCCESS", payload: { ...state.data, img: null } as T })}
            >
              Remove banner
            </button>
          </div>
        </div>
      ) : (
        <div className="relative w-full rounded-xl rounded-b-none">
          {label}
          
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
