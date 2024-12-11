
type Props = {
  size: number;
};

const CircleCheckIcon = ({ size }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
    >
      <defs>
        <mask id="ipSCheckOne0">
          <g fill="none" strokeLinejoin="round" strokeWidth={4}>
            <path
              fill="#fff"
              stroke="#fff"
              d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"
            ></path>
            <path
              stroke="#000"
              strokeLinecap="round"
              d="m16 24l6 6l12-12"
            ></path>
          </g>
        </mask>
      </defs>
      <path
        fill="currentColor"
        d="M0 0h48v48H0z"
        mask="url(#ipSCheckOne0)"
      ></path>
    </svg>
  );
};

export default CircleCheckIcon