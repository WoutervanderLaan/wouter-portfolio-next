import PORTFOLIO_ITEMS from "./portfolio-items";
import PortfolioThumbnails from "@/components/atoms/portfolio/portfolio-thumbnails";
import PortfolioSeriesInfo from "@/components/atoms/portfolio/portfolio-series-info";
import PortfolioSeries from "@/components/atoms/portfolio/portfolio-series";

const PortfolioPage = () => {
  const sortedPortfolio = PORTFOLIO_ITEMS.toSorted(
    (a, b) => parseInt(b.year) - parseInt(a.year),
  );

  return (
    <main className="mx-40 mt-10 flex flex-col gap-10">
      {sortedPortfolio.map((series) => {
        const { title, img } = series;

        return (
          <PortfolioSeries key={`portfolio_${title}`}>
            <PortfolioSeriesInfo {...series} />
            <PortfolioThumbnails images={img} size="default" />
          </PortfolioSeries>
        );
      })}
    </main>
  );
};

export default PortfolioPage;
