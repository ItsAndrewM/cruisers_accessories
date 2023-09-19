const swell = require("swell-node");
swell.init("psl-test-store", "sk_drvQHk5KZy6w0BF55jyArsdojvJ3AxVy");

export const getBoatModel = async (boatMake) => {
  return await swell.get("/attributes", {
    where: {
      id: "boat_model",
    },
    sort: "name asc",
    limit: 100,
    page: 1,
  });
};

const handler = async (req, res) => {
  const { boat_model } = req.query;
  try {
    const jsonData = await getBoatModel(boat_model);
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
