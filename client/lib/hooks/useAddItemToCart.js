import { useContext } from "react";
import { Context } from "../context";

export const useAddItemToCart = () => {
  const { swell, setCart } = useContext(Context);
  const addItemToCart = async (
    product_id,
    quantity,
    options
  ) => {
    const newCart = await swell.cart.addItem({
      product_id,
      quantity,
      options,
    });
    setCart(newCart);
    return newCart;
  }

  return addItemToCart;
}
