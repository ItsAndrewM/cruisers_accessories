import {
  CarouselProvider,
  ImageWithZoom,
  Slide,
  Slider,
  Dot,
} from "pure-react-carousel";
import Image from "next/image";
import styles from "./imageCarousel.module.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { IconButton } from 'theme-ui'
const CustomDotGroup = ({ images, onThumbnailClick, ...imageProps }) => {
  return (
    <div className={styles.wrapper}>
      {images.map((image, slide) => {
        console.log(image)
        return (
          <IconButton
            key={slide}
            sx={{ height: 80, width: 80 }}
            as="span"
            onClick={() => onThumbnailClick?.(slide)}
          >
            <Dot slide={slide}>
              <Image
                src={image.src}
                {...imageProps}
                height={80}
                width={80}
              ></Image>
            </Dot>
          </IconButton>
        )
      })}
    </div>
  );
};

const ImageCarousel = ({
  images,
  onThumbnailClick,
  showZoom,
  currentSlide,
  ...imageProps
}) => (
  <CarouselProvider
    currentSlide={currentSlide}
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    hasMasterSpinner={false}
    totalSlides={images.length}
  >
    <Slider>
      {images.map((image, index) => (
        <Slide index={index} key={index}>
          {showZoom ? (
            <ImageWithZoom src={image.src} />
          ) : (
            <Image src={image.src} {...imageProps} />
          )}
        </Slide>
      ))}
    </Slider>
    {showZoom && (
      <CustomDotGroup
        {...imageProps}
        onThumbnailClick={onThumbnailClick}
        images={images}
      />
    )}
  </CarouselProvider>
);

export default ImageCarousel;
