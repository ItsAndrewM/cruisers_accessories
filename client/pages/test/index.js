import FeaturedCat from "../../components/featuredCat/featuredCat"
import Layout from "../../components/layout/layout"
import SearchBar from "../../components/searchBar/searchBar"
import { BuilderComponent } from "@builder.io/react";
import { Suspense } from "react";
import { useThemeUI } from "theme-ui";

const SearchBarFallback = () => {
  return <>placeholder</>;
};
const Page = () => {
  const { theme } = useThemeUI()

  return (
    <>
      <BuilderComponent
        data={{ theme }}
        model="test"
      />
      <div>
        <SearchBar />
      </div>
    </>
  );
};

Page.Layout = Layout

export default Page;
