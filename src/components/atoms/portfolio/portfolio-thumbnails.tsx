import Button from "../button/button";
import Portfolio from "./portfolio";
import { PortfolioThumbnailsProps } from "./portfolio.types";

const PortfolioThumbnails = ({
  images,
  size = "default",
  onImageClick,
  selectedImage,
}: PortfolioThumbnailsProps) => (
  <div className="flex flex-wrap gap-4 my-4 pb-4">
    {images.map(({ src, alt = "" }, i) => (
      <Button
        variant="unstyled"
        className="hover:-translate-y-2 hover:opacity-50"
        disabled={`/img/${src}` === selectedImage?.src}
        key={i}
        onClick={() => {
          if (selectedImage) onImageClick(selectedImage, images);
        }}
      >
        <Portfolio.Image
          size={size}
          src={`/img/${src}`}
          alt={alt}
          images={images}
          onImageClick={onImageClick}
        />
      </Button>
    ))}
  </div>
);

export default PortfolioThumbnails;
