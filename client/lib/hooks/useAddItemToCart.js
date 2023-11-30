import { useContext } from "react";
import { Context } from "../context";

export const useAddItemToCart = () => {
  const { swell, setCart } = useContext(Context);
  const addItemToCart = async (product_id, quantity, variant_id, options) => {
    try {
      // const { setCart } = useContext(Context);
      // try {
      //   if (swell) {
      const newCart = await swell.cart.addItem({
        product_id,
        quantity,
        variant_id: variant_id.id,
        options: !options
          ? null
          : [{ name: options.name, value: options.value }],
      });
      setCart(newCart);
      return newCart;
    } catch (err) {
      console.log(err);
    }
  };

  return addItemToCart;
};
