export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://example.com"; // https://v2ds.netlify.app

  return base_url;
};
