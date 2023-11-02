import { useContext } from "react";
import { Context } from "../context";

export const useAddItemToCart = () => {
  const { swell, setCart } = useContext(Context);
  const addItemToCart = async (product_id, quantity, variant_id, options) => {
    try {
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
