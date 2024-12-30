const Sun = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 100 100"
    style={{
      strokeWidth: 8,
      strokeLinecap: "round",
      strokeMiterlimit: 10,
    }}
    className="dark:fill-black dark:stroke-white stroke-black fill-white"
  >
    <circle stroke="1" cx="50" cy="50" r="24.09" />
    <line x1="50" y1="4.5" x2="50" y2="14.47" />
    <line x1="50" y1="85.53" x2="50" y2="95.5" />
    <line x1="95.5" y1="50" x2="85.53" y2="50" />
    <line x1="14.47" y1="50" x2="4.5" y2="50" />
    <line x1="82.17" y1="82.17" x2="75.12" y2="75.12" />
    <line x1="24.88" y1="24.88" x2="17.83" y2="17.83" />
    <line x1="82.17" y1="17.83" x2="75.12" y2="24.88" />
    <line x1="24.88" y1="75.12" x2="17.83" y2="82.17" />
  </svg>
);

export default Sun;
