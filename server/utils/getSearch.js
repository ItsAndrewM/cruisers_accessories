const swell = require("swell-node");
swell.init("psl-test-store", "sk_drvQHk5KZy6w0BF55jyArsdojvJ3AxVy");

const getSearch = async (searchTerm) => {
  return await swell.get("/products", {
    where: {
      $or: [
        { "attributes.boat_make": { $regex: searchTerm, $options: "i" } },
        { name: { $regex: searchTerm, $options: "i" } },
      ],
    },
  });
};
