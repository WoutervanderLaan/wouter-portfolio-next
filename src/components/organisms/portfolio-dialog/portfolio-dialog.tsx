"use client";

import Dialog from "@/components/atoms/dialog/dialog";
import Portfolio from "@/components/atoms/portfolio/portfolio";
import { TImage } from "@/components/atoms/portfolio/portfolio.types";
import { useScrollContext } from "@/context/scroll-context";
import { ForwardedRef, forwardRef, useEffect } from "react";

const PortfolioDialog = forwardRef(
  (
    {
      selectedImage,
      images,
      onImageClick,
    }: {
      selectedImage: TImage | null;
      images: Array<TImage>;
      onImageClick: (image: TImage, images: Array<TImage>) => void;
    },
    ref: ForwardedRef<HTMLDialogElement>
  ) => {
    const { setIsScrollEnabled } = useScrollContext();

    useEffect(() => {
      return () => {
        setIsScrollEnabled(true);
      };
    }, [setIsScrollEnabled]);

    if (!selectedImage?.src) return null;

    return (
      <Dialog ref={ref}>
        <Portfolio.Image
          src={selectedImage.src}
          alt={selectedImage.alt || "no alt text provided"}
          size="large"
        />
        <Portfolio.Thumbnails
          size="small"
          images={images}
          onImageClick={onImageClick}
        />
      </Dialog>
    );
  }
);

PortfolioDialog.displayName = "PortfolioDialog";

export default PortfolioDialog;
