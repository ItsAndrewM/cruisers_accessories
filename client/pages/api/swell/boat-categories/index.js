const swell = require("swell-node");
swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.SWELL_SECRET_KEY
);

export const getCategoriesWithBoats = async (boatMake, boatModel) => {
  return await swell.get("/products", {
    where: {
      $or: [
        { "attributes.boat_make": { $in: [boatMake] } },
        { "attributes.boat_model": { $in: [boatModel] } },
      ],
    },
    sort: "name asc",
    limit: 100,
    page: 1,
  });
};

const handler = async (req, res) => {
  const { boat_make, boat_model } = req.query;
  try {
    const jsonData = await getCategoriesWithBoats(boat_make, boat_model);
    res.status(200).json({
      status: 200,
      message: jsonData.messageDetails,
      data: jsonData,
    });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
