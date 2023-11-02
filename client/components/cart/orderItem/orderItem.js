import styles from "../cartItem/cartItem.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/operations-swell";

const OrderItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [removing, setRemoving] = useState(false);
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProductData = async () => {
      const data = await getProduct({ id: item.product_id });
      if (data) {
        setProduct(data);
      }
    };
    if (item.product_id) {
      fetchProductData();
    }
  }, [item]);

  return (
    <div className={styles.grid}>
      <div>
        {!product ? (
          <div
            style={{
              width: "90px",
              height: "90px",
              backgroundColor: "lightgray",
            }}
          ></div>
        ) : (
          <Image
            src={
              !product.images.length
                ? "https://placehold.co/90/jpeg"
                : product.images[0].file?.url
            }
            width={90}
            height={90}
            alt={item.product_name}
          />
        )}
      </div>
      <div className={styles.information}>
        <div>
          <small>{item.product_name}</small>
          {!item.options ? <></> : <small> - {item.options[0].value}</small>}
        </div>
        <div>
          <small>${item.price_total.toFixed(2)}</small>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
