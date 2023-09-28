import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import styles from "../../styles/test.module.css";
import swellConfig from "@/swell.config";
import swell from "swell-js";
import SearchByBoat from "@/components/searchByBoat/searchByBoat";
import CategorySidebar from "@/components/categorySidebar/categorySidebar";
import BreadCrumbs from "@/components/breadCrumbs/breadcrumbs";

export async function getServerSideProps(context) {
  await swell.init(swellConfig.storeId, swellConfig.publicKey);
  const boatModel = await swell.attributes.get("boat_model");
  const boatMake = await swell.attributes.get("boat_make");
  const categoriesData = await swell.categories.list({ limit: 100 });
  const categories =
    (await categoriesData.results.map((entry) => entry.name)) || [];
  // const test = await fetch(
  //   "http://localhost:3000/api/boat-model?boat_model=Abbott"
  // );
  // const data = await test.json();
  // console.log(data);
  return {
    props: {
      boatModel: boatModel,
      boatMake: boatMake,
      categories: categories,
    },
  };
}

const Page = ({ boatModel, boatMake, categories }) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <BreadCrumbs />
      <div className={styles.box}>
        <CategorySidebar />
      </div>
    </div>
  );
};

Page.Layout = Layout;

export default Page;
