const swell = require("swell-node");
swell.init("psl-test-store", "sk_drvQHk5KZy6w0BF55jyArsdojvJ3AxVy");

export const getQueriedProducts = async (query) => {
  const data = Array.from(Object.keys(query)).reduce((acc, key) => {
    const formattedKey = key.toLowerCase().split(" ").join("_");
    if (!Array.isArray(query[key])) {
      acc[`attributes.${formattedKey}`] = { $in: [query[key]] };
    } else {
      acc[`attributes.${formattedKey}`] = { $in: query[key] };
    }
    return acc;
  }, {});
  return await swell.get("/products", {
    where: {
      $and: [{ active: true }, data],
    },
    sort: "name asc",
    limit: 24,
    page: 1,
  });
};

const handler = async (req, res) => {
  const query = req.query;
  try {
    const jsonData = await getQueriedProducts(query);
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
