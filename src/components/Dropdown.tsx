import { ArrowDown01Icon } from "hugeicons-react";
import { LegacyRef, ReactNode } from "react";

type Props = {
  summary: string;
  dropdownRef: LegacyRef<HTMLDetailsElement>;
  children: ReactNode;
  className?: string;
};

const Dropdown = ({ children, summary, dropdownRef, className }: Props) => {

  return (
    <details className={`dropdown h-full ${className}`} ref={dropdownRef}>
      <summary className="btn bg-white justify-between shadow-none rounded-xl !h-11 border-gray-200 hover:bg-gray-100 w-full">
        {summary}
        <ArrowDown01Icon size={18} />
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow w-full">
        {children}
      </ul>
    </details>
  );
};

export default Dropdown;

