import PORTFOLIO_ITEMS from "../../components/portfolio-items";
import PortfolioSeriesInfo from "@/components/templates/portfolio/portfolio-series-info";
import PortfolioSeries from "@/components/templates/portfolio/portfolio-series";
import Thumbnails from "@/components/molecules/thumbnails/thumbnails";

const PortfolioPage = () => (
  <main className="mt-10 flex flex-col gap-16 md:mx-20 lg:mx-40">
    {PORTFOLIO_ITEMS.map((series, i) => {
      const { title, img, video } = series;

      return (
        <PortfolioSeries key={`portfolio_${title}_${i}`}>
          <PortfolioSeriesInfo {...series} />
          <Thumbnails type="modalTrigger" images={img} videos={video} />
        </PortfolioSeries>
      );
    })}
  </main>
);

export default PortfolioPage;
