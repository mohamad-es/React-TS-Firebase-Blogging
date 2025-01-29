import { EyeIcon } from "hugeicons-react";
import { RefObject } from "react";
import { Fragment } from "react/jsx-runtime";
import SubmitButton from "src/components/buttons/SubmitButton";

type Props = {
  modalsRef: RefObject<HTMLDialogElement | null>;
  loading: boolean;
};

const WriteFormSidebar = ({ loading, modalsRef }: Props) => {
  return (
    <Fragment>
      <div className="flex justify-end mb-5 max-w-min overflow-hidden rounded-xl border h-10">
        <button
          className="h-full bg-blue-700 text-white text-sm gap-2 flex w-36 justify-center items-center transition-all hover:bg-blue-700 hover:text-white"
          type="button"
          onClick={() => modalsRef.current?.showModal()}
        >
          Preview
          <EyeIcon size={16} />
        </button>
        <SubmitButton loading={loading} title="Publish" className="btn-success !rounded-none" />
      </div>
      <ul className="list-disc space-y-3 mt-10">
        <li className="text-sm">Upload blog image (optional, max 100KB)</li>
        <li className="text-sm">Best image size for banner (width:944 - height:380)</li>
      </ul>
    </Fragment>
  );
};

export default WriteFormSidebar;
