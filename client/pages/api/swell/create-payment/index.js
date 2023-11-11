const swell = require("swell-node");
swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.SWELL_SECRET_KEY
);

//https://github.com/orgs/swellstores/discussions/255#discussioncomment-5960624

export default async function Handler(req, res) {
  if (req.method != "POST")
    return res.status(404).json({ success: false, message: "Not Found" });

  if (
    !req.body.amount ||
    !req.body.account_id ||
    !req.body.method ||
    !req.body.order_id ||
    !req.body.paypal_order_id
  )
    return res.status(400).json({
      success: false,
      message: "Please Provide amount, account ID and method of payment",
    });

  try {
    const response = await swell.post("/payments", {
      amount: req.body.amount,
      method: req.body.method,
      account_id: req.body.account_id,
      order_id: req.body.order_id,
      paypal_order_id: req.body.paypal_order_id,
      authorized: true,
      captured: true,
    });
    if (!response.success) {
      console.log("RES: ", response);
      return res
        .status(500)
        .json({ success: false, message: "Some Error Occured at backend" });
    }
    res.status(200).json({ success: true, data: response });
  } catch (err) {
    console.log("Err at Swell Create Payment: ", err);
    return res
      .status(500)
      .json({ success: false, message: "Could Not Found the user" });
  }
}
