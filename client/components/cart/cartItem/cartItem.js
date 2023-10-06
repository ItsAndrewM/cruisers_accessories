import { Grid, Button, Input, Text, IconButton } from "theme-ui";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Plus from "../../icons/plus";
import Minus from "../../icons/minus";
import { getPrice } from "../../../lib/utils/product";
import { useUpdateItemQuantity } from "../../../lib/hooks/useUpdateItemQuantity";
import { useRemoveItemFromCart } from "../../../lib/hooks/useRemoveItemFromCart";
import styles from "./cartItem.module.css";
const CartItem = ({ item, currencyCode }) => {
  const updateItem = useUpdateItemQuantity();
  const removeItem = useRemoveItemFromCart();
  const [quantity, setQuantity] = useState(item.quantity);
  const [removing, setRemoving] = useState(false);
  const updateQuantity = async (quantity) => {
    await updateItem(item.id, quantity);
  };
  const handleQuantity = (e) => {
    const val = Number(e.target.value);

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val);
    }
  };
  const handleBlur = () => {
    const val = Number(quantity);

    if (val !== item.quantity) {
      updateQuantity(val);
    }
  };
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n;

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val);
      updateQuantity(val);
    }
  };
  const handleRemove = async () => {
    setRemoving(true);

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem(item.product.id);
    } catch (error) {
      console.error(error);
      setRemoving(false);
    }
  };

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity);
    }
  }, [item.quantity]);

  return (
    <Grid gap={2} sx={{ width: "100%", m: 12 }} columns={[2]}>
      <div className={styles.container}>
        <Image
          height={130}
          width={130}
          unoptimized
          alt={item.product.meta_description}
          src={
            (item.product.images && item.product.images[0].file?.url) ??
            "https://placehold.co/150/jpeg"
          }
        />
      </div>
      <div>
        <div
          as={Link}
          href={`/products/${item.product.slug}/`}
          className={styles.wrapper}
        >
          <>
            {item.product.name} {item.variant ? `- ${item.variant.name}` : ""}
            <Text
              sx={{
                fontSize: 4,
                fontWeight: 700,
                display: "block",
                marginLeft: "auto",
              }}
            >
              {getPrice(item.price, currencyCode)}
            </Text>
          </>
        </div>
        <ul className={styles.list}>
          <li>
            <div style={{ display: "flex", justifyItems: "center" }}>
              <IconButton onClick={() => increaseQuantity(-1)}>
                <Minus width={18} height={18} />
              </IconButton>

              <label>
                <Input
                  sx={{
                    height: "100%",
                    textAlign: "center",
                  }}
                  type="number"
                  max={99}
                  min={0}
                  value={quantity}
                  onChange={handleQuantity}
                  onBlur={handleBlur}
                />
              </label>
              <IconButton onClick={() => increaseQuantity(1)}>
                <Plus width={18} height={18} />
              </IconButton>
            </div>
          </li>
          {/* {item.variant.selectedOptions.map((option: any) => (
            <li key={option.value}>
              {option.name}:{option.value}
            </li>
          ))} */}
        </ul>
      </div>
    </Grid>
  );
};
export default CartItem;
