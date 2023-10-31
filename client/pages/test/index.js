import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import styles from "../../styles/test.module.css";
import swellConfig from "@/swell.config";
import swell from "swell-js";
import BreadCrumbs from "@/components/breadCrumbs/breadcrumbs";
import { getProduct } from "@/lib/operations-swell";
import Carousel from "@/components/carousel/carousel";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import navbarStyles from "@/components/ui/navbar/navbar.module.css";
import CustomerInfo from "@/components/checkout/customerInfo/customerInfo";
import Shipping from "@/components/checkout/shipping/shipping";
import { getLayoutProps } from "@/lib/get-layout-props";
import { useCart } from "@/lib/hooks/useCart";
import { Context } from "@/lib/context";

export async function getServerSideProps(context) {
  const data = await fetch("http://localhost:3000/api/swell/shipping-method");
  const result = await data.json();
  return {
    props: {
      product: "blah blah" || null,
      ...(await getLayoutProps()),
    },
  };
}

const Page = ({ product }) => {
  const [aState, setAState] = useState();
  const router = useRouter();
  const { cart, swell } = useContext(Context);

  useEffect(() => {
    const fetchGetStuff = async () => {
      const stuff = await swell.cart.getShippingRates();
      console.log(stuff);
      console.log(cart);
    };
    if (swell && cart) {
      fetchGetStuff();
    }
  }, [swell, cart]);

  return <div style={{ display: "flex", flexWrap: "nowrap" }}></div>;
};

Page.Layout = Layout;

export default Page;
