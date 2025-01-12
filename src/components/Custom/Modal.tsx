import { Cancel01Icon } from "hugeicons-react";
import { ReactNode, RefObject } from "react";

type Props = {
  title?: string;
  children: ReactNode;
  modalsRef: RefObject<HTMLDialogElement>;
  className?: string;
  hiddenClosBtn?: boolean;
};

const Modal = ({
  title,
  children,
  modalsRef,
  className,
  hiddenClosBtn,
}: Props) => {
  return (
    <dialog ref={modalsRef} className={`modal`}>
      <div className={`modal-box ${className}`}>
        <div className="modal-action justify-between mt-0">
          {title && <h3 className="font-bold text-lg w-full mb-10">{title}</h3>}
          {!hiddenClosBtn && (
            <form method="dialog">
              <button className="!btn !btn-sm btn-circle btn-ghost absolute right-2 top-2">
                <Cancel01Icon size={16} />
              </button>
            </form>
          )}
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
