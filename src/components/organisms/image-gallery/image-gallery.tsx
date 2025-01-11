import Image from "@/components/atoms/image/image";
import { TImage } from "@/components/templates/portfolio/portfolio.types";
import Thumbnails from "@/components/molecules/thumbnails/thumbnails";
import { useState } from "react";
import { MotionDiv } from "@/components/atoms/motion-element/motion-element";
import Spinner from "@/components/atoms/spinner/spinner";
import StyledLink from "@/components/atoms/link/link";

const ImageGallery = ({
  selectedImage,
  images,
}: {
  selectedImage: TImage;
  images: Array<TImage>;
}) => {
  const [image, setImage] = useState<TImage>(selectedImage);
  const [loading, setLoading] = useState(true);

  const handleImageSelect = (img: TImage) => {
    if (img.src === image.src) return;
    setLoading(true);
    setImage(img);
  };

  return (
    <div className="container flex h-full flex-col items-center justify-center">
      {loading && (
        <div className="absolute">
          <Spinner />
        </div>
      )}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        exit={{ opacity: 0 }}
      >
        <StyledLink href={image.src.src} target="_blank" aria-label={image.alt}>
          <Image
            onLoad={() => setLoading(false)}
            src={image.src}
            alt={image.alt}
            size="xl"
            sizes="(max-width: 768px) 80vw, 50vw"
          />
        </StyledLink>
      </MotionDiv>
      <Thumbnails
        size={"extraSmall"}
        images={images}
        onPress={handleImageSelect}
        selectedImage={image}
      />
    </div>
  );
};

export default ImageGallery;
