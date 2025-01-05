import { PropsWithChildren } from "react";

const PortfolioSeries = ({ children }: PropsWithChildren) => (
  <article className="flex flex-col gap-2 border-b-[1px] border-black/20 dark:border-white/50">
    {children}
  </article>
);

export default PortfolioSeries;
