import { TIcon } from "src/types/global";

const PencilIcon = ({ size, color }: TIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <path
          stroke={color || "currentColor"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0z"
        ></path>
        <path
          stroke={color || "currentColor"}
          d="m5 16l-1 4l4-1L18 9l-3-3z"
        ></path>
        <path
          stroke={color || "currentColor"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m15 6l3 3m-5 11h8"
        ></path>
      </g>
    </svg>
  );
};

export default PencilIcon;
