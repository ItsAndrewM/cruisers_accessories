import { useState, useEffect } from 'react'
import { NextSeo } from 'next-seo'
import LoadingDots from '@/components/ui/loadingDots/loadingDots'
import builderConfig from '@/builder.config'
import { ProductGrid, ProductGridProps } from '../productGrid/productGrid'
import { getCollection } from '../../lib/operations-swell'
import styles from "./collectionView.module.css"

const CollectionPreview = ({
  collection: initialCollection,
  productGridOptions,
  renderSeo,
}) => {
  console.log(initialCollection)
  const [collection, setCollection] = useState(initialCollection)
  const [loading, setLoading] = useState(false)

  useEffect(() => setCollection(initialCollection), [initialCollection])

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true)
      const result = await getCollection(builderConfig, {
        handle: collection,
      })
      setCollection(result)
      setLoading(false)
    }
    if (typeof collection === 'string') {
      fetchCollection()
    }
  }, [collection])

  if (!collection || typeof collection === 'string' || loading) {
    return (
      <>
        <LoadingDots />
      </>
    )
  }

  const { title, description, products } = collection
  return (
    <>
      <div className={styles.wrapper}
        key={collection.id}
      >
        {renderSeo && (
          <NextSeo
            title={collection.title}
            description={collection.description}
            openGraph={{
              type: 'website',
              title,
              description,
            }}
          />
        )}
        <div className={styles.wrapper}>
          <span style={{ marginTop: 0, marginBottom: 2 }}>
            <h1>{collection.title}</h1>
          </span>
          <div dangerouslySetInnerHTML={{ __html: collection.description }} />
        </div>
        <div className={styles.padding5}>
          <ProductGrid {...productGridOptions} products={products} />
        </div>
      </div>
    </>
  )
}

export default CollectionPreview
