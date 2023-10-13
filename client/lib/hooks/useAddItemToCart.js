import { useContext } from "react";
import { Context } from "../context";

export const useAddItemToCart = () => {
  const { swell, setCart } = useContext(Context);
  const addItemToCart = async (product_id, quantity, options) => {
    // if (options) {
    try {
      const newCart = await swell.cart.addItem({
        product_id,
        quantity,
        // variant_id: options.id,
        variant_id: options ? options.id : null,
      });
      setCart(newCart);
      return newCart;
    } catch (err) {
      console.log(err);
    }
    // }
    // else {
    //   console.log("no options");
    //   const newCart = await swell.cart.addItem({
    //     product_id,
    //     quantity,
    //   });
    //   setCart(newCart);
    //   return newCart;
    // }
  };

  return addItemToCart;
};
