import { useState, useEffect } from "react";
import { getProduct } from "../../lib/operations-swell";
import LoadingDots from "../../components/ui/loadingDots/loadingDots";

const ProductLoader = ({ product: initialProduct, children }) => {
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(false);

  useEffect(() => setProduct(initialProduct), [initialProduct]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const result = await getProduct({
        slug: String(product),
      });
      setProduct(result);
      setLoading(false);
    };
    if (typeof product === "string") {
      fetchProduct();
    }
  }, [product]);

  if (!product || typeof product === "string" || loading) {
    return <LoadingDots />;
  }
  return children(product);
};

export default ProductLoader;
