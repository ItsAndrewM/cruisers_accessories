import { useState, useEffect } from 'react'
import { NextSeo } from 'next-seo'
import LoadingDots from '../../components/ui/loadingDots/loadingDots'
import builderConfig from '../../builder.config'
import { getAllCollections, getCollection } from '../../lib/operations-swell'
import styles from "./collectionViewHome.module.css"
import { CollectionGrid } from '../collectionGrid/collectionGrid'

const CollectionViewHome = ({
  collection: initialCollection,
  productGridOptions,
  renderSeo,
}) => {
  const [collection, setCollection] = useState(initialCollection)
  const [loading, setLoading] = useState(false)

  // useEffect(() => setCollection(initialCollection), [initialCollection])

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true)
      const result = await getAllCollections(builderConfig)
      console.log(result)
      setCollection(result)
      setLoading(false)
    }
    fetchCollection()
  }, [])


  if (!collection || typeof collection === 'string' || loading) {
    return (
      <>
        <LoadingDots />
      </>
    )
  }

  const title = "CAS category collections";
  const description = "CAS category collections";
  return (
    <>
      <div className={styles.wrapper}
      >
        {renderSeo && (
          <NextSeo
            title={title}
            description={description}
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
          {/* <div dangerouslySetInnerHTML={{ __html: collection.description }} /> */}
        </div>
        <div className={styles.padding5}>
          <CollectionGrid {...productGridOptions} collection={collection} />
        </div>
      </div>
    </>
  )
}

export default CollectionViewHome
