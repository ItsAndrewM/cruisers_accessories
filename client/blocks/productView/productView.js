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
import InStock from "@/components/inStock/inStock";
import Quantity from "@/components/quantity/quantity";
import Image from "next/image";
import accordionStyles from "@/components/accordion/accordion.module.css";
import { getSiteSettings } from "@/lib/operations-swell";

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

  const options = product?.options ? product?.options : product?.variants;

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
    // if (selections && variants) {
    //   const selectedVariant = variants.find((variant) => {
    //     // return variant.option_value_ids?.every((id) => {
    //     return selections.find((selection) => {
    //       return selection.value == variant.name;
    //     });
    //     // });
    //   });
    //   if (selectedVariant) {
    //     setVariant(selectedVariant);
    //   }
    // }
  };

  const { openSidebar } = useUI();

  const [variant, setVariant] = useState(variants[0] || null);
  const [selections, setSelections] = useState(defaultSelections);
  const [productOptions, setProductOptions] = useState(options);
  const [added, setAdded] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [quantity, setQuantity] = useState(1);
  const [imageArr, setImageArr] = useState([]);
  const [currentImage, setCurrentImage] = useState(
    !product.images.length
      ? `https://placehold.co/475/jpeg`
      : product.images[0].file.url
  );

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

  // console.log(selections);

  const addToCart = async () => {
    setLoading(true);

    try {
      await addItem(product.id, quantity, !variant ? selections : variant);
      openSidebar();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const addToCartMobile = async () => {
    setLoading(true);
    try {
      await addItem(product.id, 1, variant ? variant : selections);
      setAdded(true);
      if (added) {
        setButtonText("Added");
        setTimeout(() => {
          setButtonText("Add to Cart");
        }, 2000);
      }
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

    if (product.images || product.variants) {
      if (product.images.length > 1) {
        setImageArr(product.images);
      } else {
        if (
          product.variants.length &&
          product.variants[0].images &&
          product.variants[0].images.length
        ) {
          setImageArr(product.variants);
        }
      }
    } else {
      setImageArr([]);
    }
    // const fetchSiteSettings = async () => {
    //   const settings = await getSiteSettings();
    //   console.log(settings);
    // };
    // fetchSiteSettings();
  }, []);

  const handleChange = (e) => {
    // const id =
    //   values.find((optionValue) => optionValue.name == value)?.id ?? "";
    const id = e.target.value;
    const selectionToUpdate = selections.find((selection) => {
      return selection.id == e.target.value;
    });
    const selectedVariant = product.variants.find((variant) => {
      if (variant.option_value_ids) {
        return variant.option_value_ids[0] === id;
      } else {
        return variant.name === e.target.parentNode.textContent;
      }
    });

    if (selections.length) {
      // selectionToUpdate.value = value;
      // selectionToUpdate.id = id;
      setSelections(selections);
      setVariant(selectedVariant);
      setSelectedVariant();
    }
  };

  const handleClick = (e) => {
    console.log(e.currentTarget);
    setCurrentImage(e.currentTarget.value);
  };

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
                  "https://placehold.co/800x600/jpeg",
                width: 800,
                height: 600,
                alt: title,
              },
            ],
          }}
        />
      )}
      {/* <div className={styles.product}>
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
                          src: `https://placehold.co/1050/jpeg`,
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
                    <Grid padding={2} columns={1} key={option.id}>
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
              {loading ? <LoadingDots /> : <span>{buttonText}</span>}
            </button>
            <button
              className={styles.mobileButton}
              name="add-to-cart"
              disabled={loading}
              onClick={addToCartMobile}
            >
              {loading ? <LoadingDots /> : <span>{buttonText}</span>}
            </button>
            <div></div>
          </div>
        </Grid>
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          style={{
            marginBottom: "1em",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        />
      </div> */}
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <div>
            <Image
              alt={product.name}
              src={currentImage}
              width={475}
              height={475}
            />
            {!imageArr.length ? (
              <></>
            ) : (
              <div className={styles.listContainer}>
                {imageArr.map((image) => {
                  if (image.file) {
                    return (
                      <button
                        onClick={handleClick}
                        value={image.file.url}
                        key={image.file.url}
                      >
                        <Image
                          src={image.file.url}
                          width={75}
                          height={75}
                          style={{ objectFit: "contain" }}
                        />
                      </button>
                    );
                  } else {
                    console.log(image);
                    if (image.images) {
                      return (
                        <button
                          onClick={handleClick}
                          value={image.images[0].file.url}
                          key={image.images[0].file.url}
                        >
                          <Image
                            src={image.images[0].file.url}
                            width={75}
                            height={75}
                            style={{ objectFit: "contain" }}
                          />
                        </button>
                      );
                    }
                  }
                })}
              </div>
            )}
          </div>
          <div>
            <div
              className={styles.container}
              style={{
                borderBottom: "2px solid var(--cream)",
                paddingBottom: "1em",
              }}
            >
              <h1>{product.name}</h1>
              <p>
                {product.currency} $
                {!variant
                  ? product.price.toFixed(2)
                  : variant?.price.toFixed(2)}
              </p>
              <small>Shipping calculated at checkout</small>
            </div>
            {!product.options ? (
              <></>
            ) : (
              <div className={styles.container}>
                {product.options.map((option) => {
                  return (
                    <>
                      <p className={styles.textHeader}>{option.name}</p>
                      <form onChange={handleChange}>
                        <ul className={styles.options}>
                          {option.values.map((value) => {
                            return (
                              <li key={value.id}>
                                <label>
                                  {value.name}
                                  <input
                                    type="radio"
                                    value={value.id}
                                    name={option.name}
                                    className={styles.option}
                                  />
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      </form>
                    </>
                  );
                })}
              </div>
            )}
            <div className={styles.container}>
              <p className={styles.textHeader}>Quantity</p>
              <Quantity quantity={quantity} setQuantity={setQuantity} />
              <InStock product={product} />
            </div>
            <div className={styles.container}>
              <button name="add-to-cart" disabled={loading} onClick={addToCart}>
                {loading ? <LoadingDots /> : <span>{buttonText}</span>}
              </button>
            </div>
            <div>
              <details className={`${accordionStyles.accordian}`}>
                <summary>Shipping Information</summary>
              </details>
              <div className={accordionStyles.content}>
                <div className={styles.textWrapper}>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Processing Time</p>
                    <p>Standard Shipping (USA & Canada)</p>
                    <p>
                      Precision Sails utilizes the world’s leading shipping and
                      logistics companies through out the world to ensure that
                      we can safely deliver sails where ever your adventures may
                      have led you to.
                    </p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Shipping rates</p>
                    <p>
                      rates for many items are weight-based. The weight of any
                      such item can be found on its detail page. To reflect the
                      policies of the shipping companies we use, all weights
                      will be rounded up to the next full pound.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.container} ${styles.description}`}>
              <p className={styles.textHeader}>Description</p>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        </div>
      </section>
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
