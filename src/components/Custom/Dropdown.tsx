import { LegacyRef, ReactNode, useEffect } from "react";

type Props = {
  summary?: ReactNode;
  dropdownRef: LegacyRef<HTMLDetailsElement>;
  children: ReactNode;
  className?: string;
};

const Dropdown = ({ children, summary, dropdownRef, className }: Props) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the dropdownRef is a valid reference and if the click is outside
      if (
        dropdownRef &&
        typeof dropdownRef === "object" &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dropdownRef.current.removeAttribute("open"); // Close the dropdown
      }
    };

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]); // Re-run the effect if dropdownRef changes

  return (
    <details className={`dropdown ${className}`} ref={dropdownRef}>
      <summary className="btn px-0 overflow-hidden !rounded-full !w-10 !h-10 bg-white bg-gradient-to-br from-green-500 to-blue-700">
        {summary}
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box min-w-40 p-2 shadow">
        {children}
      </ul>
    </details>
  );
};

export default Dropdown;