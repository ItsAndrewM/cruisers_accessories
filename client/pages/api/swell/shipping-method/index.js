import swellConfig from "@/swell.config";
const swell = require("swell-node");
swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.SWELL_SECRET_KEY
);

export const getShippingMethods = async () => {
  return await swell.get("/settings", {
    page: 1,
  });
};

const handler = async (req, res) => {
  try {
    const data = await getShippingMethods();
    const shipments = data.results.find((value) =>
      value.id.includes("shipments")
    );
    res.status(200).json({
      status: 200,
      message: data.messageDetails,
      data: shipments.services,
    });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
