import { EyeIcon, CheckmarkCircle02Icon } from "hugeicons-react";
import { RefObject } from "react";
import { Fragment } from "react/jsx-runtime";

type Props = {
  modalsRef: RefObject<HTMLDialogElement | null>;
  loading: boolean;
};

const WriteFormSidebar = ({ loading, modalsRef }: Props) => {
  return (
    <Fragment>
      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => modalsRef.current?.showModal()}
          className="flex items-center gap-2 border rounded-xl px-3 py-2 text-sm transition-all hover:bg-blue-600 hover:text-white"
        >
          Preview
          <EyeIcon size={18} />
        </button>

        <button
          type="submit"
          className="flex items-center gap-2 border rounded-xl px-3 py-2 text-sm transition-all hover:bg-green-600 hover:text-white"
        >
          {loading ? (
            <div className="loading loading-infinity" />
          ) : (
            <Fragment>
              Publish
              <CheckmarkCircle02Icon size={16} />
            </Fragment>
          )}
        </button>
      </div>
      <ul className="list-disc mt-10">
        <li className="text-sm">Upload Blog Image (optional, max 100KB)</li>
      </ul>
    </Fragment>
  );
};

export default WriteFormSidebar;
