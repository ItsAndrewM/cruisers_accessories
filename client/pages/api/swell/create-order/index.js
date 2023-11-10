const swell = require("swell-node");
swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.SWELL_SECRET_KEY
);

//https://github.com/orgs/swellstores/discussions/255#discussioncomment-5960624

export default async function Handler(req, res) {
  if (req.method != "POST")
    return res.status(404).json({ success: false, message: "Not Found" });

  if (!req.body.items || !req.body.account_id || !req.body.shipping)
    return res.status(400).json({
      success: false,
      message: "Please Provide cart items, account ID and shipping address",
    });

  try {
    await swell.post("/orders", {
      amount: req.body.amount,
      method: !req.body.method,
      account_id: req.body.account_id,
    });
    if (response.statusCode !== 201) {
      console.log("RES: ", response);
      return res
        .status(500)
        .json({ success: false, message: "Some Error Occured at backend" });
    }

    res.status(200).json({ success: true, data: response.result });
  } catch (err) {
    console.log("Err at Create Order: ", err);
    return res
      .status(500)
      .json({ success: false, message: "Could Not Found the user" });
  }
}
