"use client";

import Portfolio from "@/components/atoms/portfolio/portfolio";
import { useRef, useState } from "react";
import { TImage } from "@/components/atoms/portfolio/portfolio.types";
import Dialog from "@/components/atoms/dialog/dialog";
import { useScrollContext } from "@/context/scroll-context";
import ImageGallery from "@/components/organisms/image-gallery/image-gallery";
import PORTFOLIO_ITEMS from "./portfolio-items";

const PortfolioPage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [selectedImage, setSelectedImage] = useState<TImage | null>(null);
  const [images, setImages] = useState<Array<TImage>>([]);
  const { setIsScrollEnabled } = useScrollContext();

  const sortedPortfolio = PORTFOLIO_ITEMS.toSorted(
    (a, b) => parseInt(b.year) - parseInt(a.year)
  );

  const onImageClick = (image: TImage, images: Array<TImage>) => {
    setIsScrollEnabled(false);
    setSelectedImage(image);
    setImages(images);
    modalRef.current?.show();
  };

  return (
    <main className="flex flex-col mx-40 mt-10 gap-10">
      {sortedPortfolio.map((series) => {
        const { title, img } = series;

        return (
          <Portfolio.Series key={`portfolio_${title}`}>
            <Portfolio.Info {...series} />
            <Portfolio.Thumbnails images={img} onImageClick={onImageClick} />
          </Portfolio.Series>
        );
      })}

      <Dialog ref={modalRef}>
        {selectedImage && (
          <div className="flex flex-col justify-center items-center h-full">
            <ImageGallery
              selectedImage={selectedImage}
              images={images}
              onImageClick={onImageClick}
            />
          </div>
        )}
      </Dialog>
    </main>
  );
};

export default PortfolioPage;
