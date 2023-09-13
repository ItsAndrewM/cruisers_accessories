import { useMemo, useState, useEffect, Fragment } from "react";
import OptionPicker from "../../components/optionPicker/optionPicker";
import { NextSeo } from "next-seo";
import { useUI } from "../../components/ui/context";
import { useAddItemToCart } from "../../lib/hooks/useAddItemToCart.js";
import {
  prepareVariantsWithOptions,
  prepareVariantsImages,
  getPrice,
} from "../../lib/utils/product";
import LoadingDots from "../../components/ui/loadingDots/loadingDots";
import ProductLoader from "./productLoader";
import styles from "./productView.module.css";
import ImageCarousel from "../../components/ui/imageCarousel/lazyImageCarousel";
import { Grid } from "theme-ui";

const ProductBox = ({
  product,
  renderSeo = true,
  description = product.description,
  title = product.name,
}) => {
  const [loading, setLoading] = useState(false);
  const addItem = useAddItemToCart();

  const formatOptionValues = (values) => {
    return values.map((value) => value.name);
  };
  const variants = useMemo(
    () => prepareVariantsWithOptions(product),
    [product]
  );

  const options = product?.options;

  const defaultSelections = options
    ?.filter((options) => options.values?.length)
    .map((option) => {
      return {
        id: option.values[0].id,
        name: option.name,
        value: option.values[0].name,
      };
    });

  const images = useMemo(
    () => prepareVariantsImages(variants, "color"),
    [variants]
  );

  const setSelectedVariant = () => {
    const selectedVariant = variants.find((variant) => {
      return variant.option_value_ids?.every((id) => {
        return selections.find((selection) => {
          return selection.id == id;
        });
      });
    });
    if (selectedVariant) {
      setVariant(selectedVariant);
    }
  };

  const { openSidebar } = useUI();

  const [variant, setVariant] = useState(variants[0] || null);
  const [selections, setSelections] = useState(defaultSelections);
  const [productOptions, setProductOptions] = useState(options);

  function inputChangeHandler(option, value) {
    const { name, values } = option;
    const id =
      values.find((optionValue) => optionValue.name == value)?.id ?? "";
    const selectionToUpdate = selections.find((selection) => {
      return selection.name == name;
    });

    if (selectionToUpdate) {
      selectionToUpdate.value = value;
      selectionToUpdate.id = id;

      setSelections(selections);
      setSelectedVariant();
    }
  }

  const addToCart = async () => {
    setLoading(true);
    try {
      await addItem(product.id, 1, selections);
      openSidebar();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const allImages = images
    .map((image) => ({ src: image.src }))
    .concat(
      product.images &&
        product.images
          .filter(
            ({ file }) => !images.find((image) => image.file?.url === file?.url)
          )
          .map((productImage) => ({
            ...productImage,
            src:
              productImage.file?.url ?? "https://via.placeholder.com/1050x1050",
          }))
    );

  useEffect(() => {
    setSelections(defaultSelections);
    setSelectedVariant();
  }, []);

  return (
    <>
      {renderSeo && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: "website",
            title: title,
            description: description,
            images: [
              {
                url:
                  product.images[0]?.file?.url ||
                  "https://via.placeholder.com/800x600",
                width: 800,
                height: 600,
                alt: title,
              },
            ],
          }}
        />
      )}
      <div className={styles.product}>
        <Grid gap={4} columns={[1, 2]}>
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
                images={
                  allImages?.length > 0
                    ? allImages
                    : [
                        {
                          src: `https://via.placeholder.com/1050x1050`,
                        },
                      ]
                }
              ></ImageCarousel>
            </div>
          </div>
          <div className={styles.column}>
            <span className={styles.span}>
              <h1>{title}</h1>
              <h4 aria-label="price" className={styles.span}>
                {getPrice(
                  variant ? variant?.price : product.price,
                  product.currency ?? "USD"
                )}
              </h4>
            </span>
            <div>
              {productOptions?.length > 0 &&
                productOptions?.map((option) => {
                  return (
                    <Grid padding={2} columns={2} key={option.id}>
                      {Boolean(option.values?.length) && (
                        <OptionPicker
                          key={option.id}
                          name={option.name}
                          options={formatOptionValues(option.values)}
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          selected={selections[option.id]}
                          onChange={(event) => {
                            inputChangeHandler(option, event.target.value);
                          }}
                        />
                      )}
                    </Grid>
                  );
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
            <div></div>
          </div>
        </Grid>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </>
  );
};

const ProductView = ({ product, ...props }) => {
  return (
    <ProductLoader product={product}>
      {(productObject) => <ProductBox {...props} product={productObject} />}
    </ProductLoader>
  );
};
export default ProductView;
