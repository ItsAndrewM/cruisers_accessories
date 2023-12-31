export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `${process.env.NEXT_PUBLIC_SITE_URL}`; // https://v2ds.netlify.app

  return base_url;
};
