const Opacity = ({ size = 24 }: { size?: number }) => (
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
    <circle cx="9" cy="9" r="7" />
    <circle cx="15" cy="15" r="7" />
  </svg>
);

export default Opacity;
