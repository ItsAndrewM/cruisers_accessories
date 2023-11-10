const swell = require("swell-node");
swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE_ID,
  process.env.SWELL_SECRET_KEY
);

export const getCatsNoParents = async () => {
  return await swell.get("/categories", {
    where: {
      $and: [{ active: true }, { parent_id: "null" }],
    },
    sort: "name asc",
    limit: 100,
    page: 1,
  });
};

const handler = async (req, res) => {
  try {
    const jsonData = await getCatsNoParents();
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
