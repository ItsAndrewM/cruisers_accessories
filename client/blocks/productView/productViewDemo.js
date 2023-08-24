import { Fragment, useState } from 'react'
import OptionPicker from '../../components/optionPicker/optionPicker'
import { NextSeo } from 'next-seo'
import { getPrice } from '../../lib/utils/product'
import ProductLoader from './productLoader'
import ImageCarousel from '@/components/ui/imageCarousel/imageCarousel'

const ProductBox = ({
  product,
  renderSeo = true,
  description = product.body_html,
  title = product.title,
}) => {
  const variants = product.variants
  const images = product.images
  const variant = variants.find((v) => v.available) || variants[0]
  const price = getPrice(variant.compare_at_price || variant.price, 'USD')
  const [image, setImage] = useState(
    variant.featured_image || product.images[0]
  )

  return (
    <Fragment>
      {renderSeo && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title: title,
            description: description,
            images: [
              {
                url: product.images[0].file.url,
                width: 800,
                height: 600,
                alt: title,
              },
            ],
          }}
        />
      )}
      <div className={styles.outerGrid} >
        <div>
          <div className={styles.box}>
            <ImageCarousel
              showZoom
              alt={title}
              width={1050}
              height={1050}
              priority
              // onThumbnailClick={(index) => {
              //   if (images[index]?.color) {
              //     setColor(images[index].color)
              //   }
              // }}
              images={allImages?.length > 0 ? allImages : [{
                src: `https://via.placeholder.com/1050x1050`,
              }]}
            ></ImageCarousel>
          </div>
        </div>
        <div className={styles.column}>
          <span className={styles.span}>
            <h1>{title}</h1>
            <h4 aria-label="price" className={styles.span}>
              {getPrice(variant ? variant?.price : product.price, product.currency ?? 'USD')}
            </h4>
          </span>
          <div dangerouslySetInnerHTML={{ __html: description }} />
          <div>
            {productOptions?.length > 0 && productOptions?.map((option) => {
              return (
                <div className={styles.grid} key={option.id}>
                  {Boolean(option.values?.length) && (
                    <OptionPicker
                      key={option.id}
                      name={option.name}
                      options={formatOptionValues(option.values)}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment     
                      // @ts-ignore
                      selected={selections[option.id]}
                      onChange={(event) => { inputChangeHandler(option, event.target.value) }}
                    />
                  )}
                </div>
              )
            })}
          </div>
          <button
            className={styles.button}
            name="add-to-cart"
            disabled={loading}
            onClick={addToCart}
          >
            Add to Cart {loading && <LoadingDots />}
          </button>
        </div>
      </div>
    </Fragment>
  )
}

const ProductView = ({ product, ...props }) => {
  return (
    <ProductLoader product={product}>
      {(productObject) => <ProductBox {...props} product={productObject} />}
    </ProductLoader>
  )
}
export default ProductView