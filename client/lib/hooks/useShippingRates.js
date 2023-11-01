import { useContext, useEffect, useState } from "react";
import { Context } from "../context";

export const useShippingRates = async () => {
  // const [shippingRates, setShippingRates] = useState([]);
  // const { swell } = useContext(Context);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await swell.cart.getShippingRates();
  //       setShippingRates(result.services);
  //       if (!result) {
  //         throw new Error(
  //           "Product delivery requires 'shipment' value or country ISO code is required"
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // return shippingRates;
};
