
import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import styles from "./imageCarousel.module.css"
import UntilInteraction from '@/components/untilInteraction/untilInteraction'

const LazyCarousel = dynamic(() => import('./lazyImageCarousel'), {
    loading: () => <div className={styles.container} ></div>,
    ssr: false,
})
const ImageCarousel = ({
    images,
    onThumbnailClick,
    showZoom,
    currentSlide,
    ...imageProps
}) => {
    return (
        <div >
            <UntilInteraction
                skeleton={<Image src={images[0].src} {...imageProps} alt='' />}
            >
                <LazyCarousel
                    images={images}
                    showZoom={showZoom}
                    currentSlide={currentSlide}
                    onThumbnailClick={onThumbnailClick}
                    {...imageProps}
                />
            </UntilInteraction>
        </div>
    )
}
export default ImageCarousel
