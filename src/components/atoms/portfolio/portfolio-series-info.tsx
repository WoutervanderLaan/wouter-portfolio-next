import { Fragment } from "react";
import { TPortfolioSeriesInfo } from "./portfolio.types";
import Text from "../text/text";

const PortfolioSeriesInfo = ({
  title,
  material,
  dimensions,
  description,
  year,
}: TPortfolioSeriesInfo) => (
  <Fragment>
    <Text.Paragraph>
      <em>&apos;{title}&apos;</em>, {year}
    </Text.Paragraph>
    <Text.Paragraph>{material}</Text.Paragraph>
    {dimensions && <Text.Paragraph>{dimensions}</Text.Paragraph>}
    <Text.Paragraph>
      <em>{description}</em>
    </Text.Paragraph>
  </Fragment>
);

export default PortfolioSeriesInfo;
