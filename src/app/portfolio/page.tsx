import PORTFOLIO_ITEMS from "../../components/portfolio-items";
import PortfolioSeriesInfo from "@/components/templates/portfolio/portfolio-series-info";
import PortfolioSeries from "@/components/templates/portfolio/portfolio-series";
import Thumbnails from "@/components/molecules/thumbnails/thumbnails";

const PortfolioPage = () => {
  const sortedPortfolio = PORTFOLIO_ITEMS.toSorted(
    (a, b) => parseInt(b.year) - parseInt(a.year),
  );

  return (
    <main className="mx-40 mt-10 flex flex-col gap-16">
      {sortedPortfolio.map((series) => {
        const { title, img } = series;

        return (
          <PortfolioSeries key={`portfolio_${title}`}>
            <PortfolioSeriesInfo {...series} />
            <Thumbnails type="modalTrigger" images={img} />
          </PortfolioSeries>
        );
      })}
    </main>
  );
};

export default PortfolioPage;
