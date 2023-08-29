import Image from 'next/image'
import { Card, Text } from '@theme-ui/components'
import Link from '../ui/link/link'
import { getPrice } from '../../lib/utils/product'
import { useState } from 'react'
import NoSSR from '../ui/noSSR/noSSR'

const CollectionCardDemo = ({
  product,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const [showAlternate, setShowAlternate] = useState(false)
  const [canToggle, setCanToggle] = useState(false)
  const src = product.images[0].src
  const handle = (product).handle
  const productVariant = product.variants[0]
  const price = getPrice(
    productVariant.price,
    product.currency ?? 'USD'
  )
  const alternateImage = product.images[1]?.file.url

  return (
    <Card
      sx={{
        maxWidth: [700, 500],
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseOut={() => setShowAlternate(false)}
      onMouseOver={() => setShowAlternate(true)}
    >
      <Link href={`/product/${handle}/`}>
        <div style={{ flexGrow: 1 }}>
          {alternateImage && (
            <div
              sx={{ display: showAlternate && canToggle ? 'block' : 'none' }}
            >
              <NoSSR>
                <Image
                  quality="85"
                  src={alternateImage}
                  alt={product.title}
                  width={imgWidth || 540}
                  sizes={imgSizes}
                  height={imgHeight || 540}
                  layout={imgLayout}
                  onLoad={() => setCanToggle(true)}
                  loading="eager"
                />
              </NoSSR>
            </div>
          )}
          <div
            sx={{
              display:
                canToggle && showAlternate && alternateImage ? 'none' : 'block',
            }}
          >
            <Image
              quality="85"
              src={src}
              alt={product.title}
              width={imgWidth || 540}
              sizes={imgSizes}
              height={imgHeight || 540}
              layout={imgLayout}
              loading={imgLoading}
              priority={imgPriority}
            />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 sx={{ mt: 4, mb: 0, fontSize: 14 }}>
            {product.title}
          </h2>
          <Text sx={{ fontSize: 12, mb: 2 }}>{price}</Text>
        </div>
      </Link>
    </Card>
  )
}

export default CollectionCardDemo
