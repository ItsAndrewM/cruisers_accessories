const swell = require("swell-node");
swell.init("psl-test-store", "sk_drvQHk5KZy6w0BF55jyArsdojvJ3AxVy");

const getOrderDetails = async (id) => {
  return await swell.get("/orders/{id}", {
    id: id,
  });
};

export default async function Handler(req, res) {
  console.log(req.query.id);
  if (req.method != "GET")
    return res.status(404).json({ success: false, message: "Not Found" });

  if (!req.query.id)
    return res.status(400).json({
      success: false,
      message: "Please Provide amount, account ID and method of payment",
    });

  try {
    const response = await getOrderDetails(req.query.id);
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
