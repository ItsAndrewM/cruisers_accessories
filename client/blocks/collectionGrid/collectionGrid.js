import { useEffect, useState } from 'react'
import LoadingDots from '../../components/ui/loadingDots/loadingDots'
import { Grid } from '@theme-ui/components'
import ProductCard from "../../components/productCard/productCard"
import ProductCardDemo from "../../components/productCard/productCardDemo"
import { getCollection, getProduct } from '../../lib/operations-swell'
import builderConfig from '../../builder.config'
import CollectionCard from '../../components/collectionCard/collectionCard'

export const CollectionGrid = ({
  // collection: initialCollection,
  offset = 0,
  limit = 10,
  cardProps,
  highlightCard,
}, collection) => {
  const [loading, setLoading] = useState(false)

  // useEffect(() => {

  // }, [collection])

  if (loading) {
    return <LoadingDots />
  }
  const CollectionComponent =
    // process.env.IS_DEMO
    // ? ProductCardDemo
    CollectionCard
  console.log(collection)
  return (
    <Grid gap={2} width={['100%', '40%', '24%']}>
      {/* {collection.slice(offset, limit).map((category, i) => (
        <CollectionComponent
          key={String(category.id) + i}
          {...(highlightCard?.index === i ? highlightCard : cardProps)}
          category={category}
        />
      ))} */}
    </Grid>
  )
}
