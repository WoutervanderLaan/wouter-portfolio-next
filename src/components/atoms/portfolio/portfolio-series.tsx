import { PropsWithChildren } from "react";

const PortfolioSeries = ({ children }: PropsWithChildren) => (
  <article className="flex flex-col gap-2 border-b-[1px] border-black dark:border-white">
    {children}
  </article>
);

export default PortfolioSeries;
