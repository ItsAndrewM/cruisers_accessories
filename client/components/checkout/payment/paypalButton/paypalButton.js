import { Context } from "@/lib/context";
import {
  PayPalScriptProvider,
  usePayPalScriptReducer,
  getScriptID,
  destroySDKScript,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { Router, useRouter } from "next/router";
import { useContext, useState } from "react";

const SCRIPT_PROVIDER_OPTIONS = {
  clientId:
    "ATT6zwIXEo7yOo7q4uZ4WZZpIE_bAT3IAsbqcM7dg0GDS88qcjRTMCGbWPvryT6cXoTPSMmA2qPoHKZw",
  currency: "USD",
  intent: "capture",
};

const LoadScriptButton = () => {
  const [{ isResolved }, dispatch] = usePayPalScriptReducer();

  return (
    <div style={{ display: "inline-flex" }}>
      <button
        type="button"
        style={{ display: "block", marginBottom: "20px" }}
        disabled={isResolved}
        onClick={() => {
          dispatch({
            type: "setLoadingStatus",
            value: "pending",
          });
        }}
      >
        Load PayPal script
      </button>
      <button
        type="button"
        style={{
          display: "block",
          marginBottom: "20px",
          marginLeft: "1em",
        }}
        onClick={() => {
          destroySDKScript(getScriptID(SCRIPT_PROVIDER_OPTIONS));
          dispatch({
            type: "setLoadingStatus",
            value: "initial",
          });
        }}
      >
        Reset
      </button>
    </div>
  );
};

function PrintLoadingState() {
  const [{ isInitial, isPending, isResolved, isRejected }] =
    usePayPalScriptReducer();
  let status = "no status";

  if (isInitial) {
    status = "initial";
  } else if (isPending) {
    status = "pending";
  } else if (isResolved) {
    status = "resolved";
  } else if (isRejected) {
    status = "rejected";
  }

  return <div>Current status: {status}</div>;
}

const PayPalButton = ({ cart, id }) => {
  const [checkoutId, setCheckoutId] = useState(id);
  const { swell } = useContext(Context);
  const router = useRouter();
  const swellCreateOrder = async () => {
    try {
      let response = await fetch(
        process.env.NODE_ENV === "production"
          ? `${process.env.SITE_URL}api/swell/create-order`
          : "http://localhost:3000/api/swell/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: cart.grand_total,
            account_id: cart.account_id,
            method: "paypal_checkout",
          }),
        }
      )
        .then((response) => response.json())
        .then((order) => {
          return order;
        });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const swellCreatePayment = async (order_id, paypal_order_id) => {
    try {
      let response = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://www.precisioncruisingaccessories.com/api/swell/create-payment`
          : "http://localhost:3000/api/swell/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: cart.grand_total,
            account_id: cart.account_id,
            method: "paypal_checkout",
            order_id: order_id,
            paypal_order_id: paypal_order_id,
          }),
        }
      )
        .then((response) => response.json())
        .then((order) => {
          return order;
        });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const paypalCreateOrder = async () => {
    try {
      let response = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://www.precisioncruisingaccessories.com/api/paypal/create-order`
          : "http://localhost:3000/api/paypal/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart.items,
            user_id: cart.account_id,
            order_price: cart.capture_total,
          }),
        }
      )
        .then((response) => response.json())
        .then((order) => {
          return order;
        });
      return response.data.id;
    } catch (err) {
      console.log(err);
      // Your custom code to show an error like showing a toast:
      // toast.error('Some Error Occured')
      return null;
    }
  };

  const paypalCaptureOrder = async (orderID) => {
    try {
      let response = await axios.post(
        process.env.NODE_ENV === "production"
          ? `https://www.precisioncruisingaccessories.com/api/paypal/capture-order`
          : "http://localhost:3000/api/paypal/capture-order",
        {
          orderID,
        }
      );
      if (response.data.success) {
        if (swell) {
          await swell.cart.update({
            billing: {
              method: "paypal_checkout",
            },
            metadata: {
              paypal_checkout: {
                order_id: response.data.data.id,
              },
            },
          });
        }

        return response.data;
        // Order is successful
        // Your custom code
        // Like showing a success toast:
        // toast.success('Amount Added to Wallet')
        // And/Or Adding Balance to Redux Wallet
        // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))
      }
    } catch (err) {
      console.log(err);
      // Order is not successful
      // Your custom code
      // Like showing an error toast
      // toast.error('Some Error Occured')
    }
  };

  return (
    <PayPalScriptProvider options={SCRIPT_PROVIDER_OPTIONS}>
      {/* <LoadScriptButton /> */}
      {/* <PrintLoadingState /> */}
      <PayPalButtons
        style={{
          color: "gold",
          shape: "rect",
          label: "pay",
          height: 50,
        }}
        fundingSource={undefined}
        onCancel={(data) => {
          console.log(`order cancelled: ${data.orderID}`);
        }}
        onError={(err) => {
          console.log(err);
        }}
        createOrder={async (data, actions) => {
          let order_id = await paypalCreateOrder();
          return order_id + "";
        }}
        onApprove={async (data, actions) => {
          let response = await paypalCaptureOrder(data.orderID);

          if (response.success) {
            if (swell) {
              const submitOrder = await swell.cart.submitOrder();
              const swellResponse = await swellCreatePayment(
                submitOrder.id,
                submitOrder.metadata.paypal_checkout.order_id
              );
              if (swellResponse.success) {
                router.push(`/checkout/${swellResponse.data.order_id}/order`);
              }
              // const swellOrderResponse = await swellCreateOrder();
            }
            return true;
          }
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
