"use client";

// import Button from "@/components/atoms/button/button";
import Image from "@/components/atoms/image/image";
import {
  Size,
  TImage,
  TVideo,
} from "@/components/templates/portfolio/portfolio.types";
// import ModalTrigger from "@/components/molecules/modal-trigger/modal-trigger";
// import ImageGallery from "@/components/organisms/image-gallery/image-gallery";
import clsx from "clsx";

type BaseThumbnailsProps = {
  images: Array<TImage>;
  videos?: Array<TVideo>;
  size?: Exclude<Size, "large" | "xl">;
  selectedImage?: TImage;
};

type ThumbnailButtonProps = {
  type?: "button";
  onPress: (img: TImage) => void;
};

type ThumbnailModalTriggerProps = {
  type: "modalTrigger";
  onPress?: never;
};

const isModalTriggerType: (
  props: ThumbnailButtonProps | ThumbnailModalTriggerProps,
) => props is ThumbnailModalTriggerProps = (props) =>
  props.type === "modalTrigger";

const Thumbnails = (
  props: BaseThumbnailsProps &
    (ThumbnailButtonProps | ThumbnailModalTriggerProps),
) => {
  const { images, size, ...rest } = props;

  return (
    <div
      className={clsx("my-4 flex gap-4 pb-4", {
        "flex-wrap": rest.type === "modalTrigger",
      })}
    >
      {images.map(({ src, alt = "" }, i) => {
        if (isModalTriggerType(rest)) {
          return (
            // <ModalTrigger
            //   key={i}
            //   aria-label={`Open image of ${alt}`}
            //   isDismissable
            //   modalContent={
            //     <ImageGallery images={images} selectedImage={{ src, alt }} />
            //   }
            //   className={clsx({
            //     "border-4 border-blue-500": selectedImage?.src === src,
            //   })}
            // >
            <Image key={i} size={size} src={src} alt={alt} loading="eager" />
            // {/* </ModalTrigger> */}
          );
        } else {
          // const { onPress } = rest as ThumbnailButtonProps;

          return (
            // <Button
            //   key={i}
            //   aria-label={`Open image of ${alt}`}
            //   variant="unstyled"
            //   onPress={() => onPress({ src, alt })}
            //   className={clsx({
            //     "border-4 border-black/50 dark:border-white/50":
            //       selectedImage?.src === src,
            //   })}
            // >
            <Image key={i} size={size} src={src} alt={alt} />
            // </Button>
          );
        }
      })}
    </div>
  );
};

export default Thumbnails;
