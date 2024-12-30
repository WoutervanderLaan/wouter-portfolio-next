import Portfolio from "@/components/atoms/portfolio/portfolio";
import { TImage } from "@/components/atoms/portfolio/portfolio.types";

const ImageGallery = ({
  selectedImage,
  images,
  onImageClick,
}: {
  selectedImage: TImage;
  images: Array<TImage>;
  onImageClick: (image: TImage, images: Array<TImage>) => void;
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Portfolio.Image
        isClickable={false}
        src={selectedImage.src}
        alt={selectedImage.alt || "no alt text provided"}
        size="xl"
      />
      <Portfolio.Thumbnails
        size="small"
        selectedImage={selectedImage}
        images={images}
        onImageClick={onImageClick}
      />
    </div>
  );
};

export default ImageGallery;
