import { EyeIcon } from "hugeicons-react";
import { RefObject } from "react";
import SubmitButton from "src/components/Buttons/SubmitButton";

type Props = {
  loading: boolean;
  modalsRef: RefObject<HTMLDialogElement | null>;
};

const EditFormSidebar = ({ loading, modalsRef }: Props) => {
  return (
    <div className="col-span-3 sticky top-28 left-0">
      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => modalsRef.current?.showModal()}
          className="flex items-center gap-2 border rounded-xl px-3 py-2 text-sm transition-all hover:bg-blue-600 hover:text-white"
        >
          
          Preview
          <EyeIcon size={18} />
        </button>

        <SubmitButton loading={loading}>Publish</SubmitButton>
      </div>
      <ul className="list-disc mt-10">
        <li className="text-sm">Upload Blog Image (optional, max 100KB)</li>
      </ul>
    </div>
  );
};

export default EditFormSidebar;
