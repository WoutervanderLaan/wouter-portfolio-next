const Move = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v20" />
    <path d="m15 19-3 3-3-3" />
    <path d="m19 9 3 3-3 3" />
    <path d="M2 12h20" />
    <path d="m5 9-3 3 3 3" />
    <path d="m9 5 3-3 3 3" />
  </svg>
);

export default Move;
