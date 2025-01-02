import Portfolio from "@/components/atoms/portfolio/portfolio";
import { TImage } from "@/components/atoms/portfolio/portfolio.types";

const ImageGallery = ({
  selectedImage,
  images,
}: {
  selectedImage: TImage;
  images: Array<TImage>;
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Portfolio.Image
        src={selectedImage.src}
        alt={selectedImage.alt || "no alt text provided"}
        size="xl"
      />
      <Portfolio.Thumbnails size="small" images={images} />
    </div>
  );
};

export default ImageGallery;
