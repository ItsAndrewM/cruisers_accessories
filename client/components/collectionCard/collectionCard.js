import { Card } from '@theme-ui/components'
import ImageCarousel from '../ui/imageCarousel/lazyImageCarousel'
import Link from '../ui/link/link'
import styles from "../productCard/productCard.module.css"

const CollectionCard = ({
  category,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const handle = category.slug

  return (
    <Card
      sx={{
        maxWidth: [700, imgWidth || 540],
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link href={`/collection/${handle}/`}>
        <div style={{ flexGrow: 1 }}>
          <ImageCarousel
            currentSlide={category.images ? category.images.length - 1 : 0}
            width={imgWidth}
            height={imgHeight}
            priority={imgPriority}
            loading={imgLoading}
            sizes={imgSizes}
            alt={category.name}
            images={
              category.images?.length
                ? category.images
                : [
                  {
                    src: `https://via.placeholder.com/${imgWidth}x${imgHeight}`,
                  },
                ]
            }
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 className={styles.h2}>{category.name}</h2>
        </div>
      </Link>
    </Card>
  )
}

export default CollectionCard
