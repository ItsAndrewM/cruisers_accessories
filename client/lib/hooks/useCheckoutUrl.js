import { useContext, useState, useEffect } from "react";
import { Context } from "../context";

export const useCheckoutUrl = () => {
  const { cart } = useContext(Context);
  if (!cart) {
    return null;
  }

  return `/checkout/${cart?.checkout_id}/shipping`;
};
