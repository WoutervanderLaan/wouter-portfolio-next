"use client";

import ModalTrigger from "@/components/molecules/modal-trigger/modal-trigger";
import PortfolioImage from "./portfolio-image";
import { PortfolioThumbnailsProps } from "./portfolio.types";
import Dialog from "../dialog/dialog";

const PortfolioThumbnails = ({
  images,
  size = "default",
}: PortfolioThumbnailsProps) => (
  <div className="my-4 flex flex-wrap gap-4 pb-4">
    {images.map(({ src, alt = "" }, i) => {
      const imageSrc = `/img/${src}`;

      return (
        <ModalTrigger
          key={i}
          isDismissable
          buttonContent={
            <PortfolioImage key={i} size={size} src={imageSrc} alt={alt} />
          }
        >
          {() => (
            <Dialog title={imageSrc}>
              <PortfolioImage key={i} size="xl" src={imageSrc} alt={alt} />
            </Dialog>
          )}
        </ModalTrigger>
      );
    })}
  </div>
);

export default PortfolioThumbnails;
