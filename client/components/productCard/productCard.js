import { Card, Text } from '@theme-ui/components'
import ImageCarousel from '../ui/imageCarousel/lazyImageCarousel'
import Link from '../ui/link/link'
import { getPrice } from '@/lib/utils/product'

const ProductCard = ({
  product,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const handle = product.slug
  const price = getPrice(product.price, product.currency ?? 'USD')

  return (
    <Card
      sx={{
        maxWidth: [700, imgWidth || 540],
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link href={`/product/${handle}/`}>
        <div style={{ flexGrow: 1 }}>
          <ImageCarousel
            currentSlide={product.images ? product.images.length - 1 : 0}
            width={imgWidth}
            height={imgHeight}
            priority={imgPriority}
            loading={imgLoading}
            layout={imgLayout}
            sizes={imgSizes}
            alt={product.name}
            images={
              product.images?.length
                ? product.images
                : [
                  {
                    src: `https://via.placeholder.com/${imgWidth}x${imgHeight}`,
                  },
                ]
            }
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 sx={{ mt: 4, mb: 0, fontSize: 14 }}>{product.name}</h2>
          <Text sx={{ fontSize: 12, mb: 2 }}>{price}</Text>
        </div>
      </Link>
    </Card>
  )
}

export default ProductCard
