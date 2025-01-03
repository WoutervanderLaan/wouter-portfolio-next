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
      return (
        <ModalTrigger
          key={i}
          isDismissable
          buttonContent={
            <PortfolioImage key={i} size={size} src={src} alt={alt} />
          }
        >
          {() => (
            <Dialog>
              <PortfolioImage key={i} size="xl" src={src} alt={alt} />
            </Dialog>
          )}
        </ModalTrigger>
      );
    })}
  </div>
);

export default PortfolioThumbnails;
