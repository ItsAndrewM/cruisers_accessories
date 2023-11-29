import { useContext } from "react";
import { Context } from "../context";

export const useAddItemToCart = () => {
  const { setCart, cart } = useContext(Context);
  const addItemToCart = async (product_id, quantity, variant_id, options) => {
    try {
      const newCart = await fetch(
        "http://localhost:3000/api/wc/store/cart/add-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: product_id,
            quantity: quantity,
            token: cart.nonce,
          }),
        }
      );
      setCart(newCart);
      return newCart;
    } catch (err) {
      console.log(err);
    }
  };

  return addItemToCart;
};
