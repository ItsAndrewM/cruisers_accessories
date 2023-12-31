const swell = require("swell-node");
swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.SWELL_SECRET_KEY
);

const getAccountDetails = async (id) => {
  return await swell.get("/accounts/{id}", {
    id: id,
  });
};

export default async function Handler(req, res) {
  if (req.method != "GET")
    return res.status(404).json({ success: false, message: "Not Found" });

  if (!req.query.id)
    return res.status(400).json({
      success: false,
      message: "Please Provide account ID",
    });

  try {
    const response = await getAccountDetails(req.query.id);
    if (!response) {
      console.log("RES: ", response);
      return res
        .status(500)
        .json({ success: false, message: "Some Error Occured at backend" });
    }
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error);
  }
}
