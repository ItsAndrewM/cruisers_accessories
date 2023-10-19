import { useEffect, useState } from "react";
import BoatSelect from "./boatSelect";
import styles from "./searchByBoat.module.css";
import LoadingDots from "../ui/loadingDots/loadingDots";
import { getCategoryByBoat } from "@/lib/operations-swell";
import { useRouter } from "next/router";
import swellConfig from "@/swell.config";
import swell from "swell-js";

const SearchByBoat = () => {
  const [boatMake, setBoatMake] = useState([]);
  const [boatModel, setBoatModel] = useState([]);
  const [categories, setCategories] = useState([]);
  const [make, setMake] = useState();
  const [model, setModel] = useState([]);
  const [category, setCategory] = useState();
  const [categoryIds, setCategoryIds] = useState();
  const [filtered, setFiltered] = useState([]);
  const [errors, setErrors] = useState({});
  const [filteredCategories, setFilteredCategories] = useState([]);
  const router = useRouter();

  const fetchCategories = async () => {
    const jsonData = await getCategoryByBoat(model, make);
    let categoryWithIds = jsonData.results.map((cat) => {
      return { name: cat.name, id: cat.id };
    });
    const mapWithId = new Map(categoryWithIds.map((val) => [val.id, val]));
    categoryWithIds = [...mapWithId.values()];
    setCategoryIds(categoryWithIds);
    let categoryNames = jsonData.results.map((category) => {
      return category.name;
    });
    categoryNames = [...new Set(categoryNames)];
    setFilteredCategories(categoryNames);
  };

  useEffect(() => {
    const fetchBoats = async () => {
      await swell.init(swellConfig.storeId, swellConfig.publicKey);
      const boatModel = await swell.attributes.get("boat_model");
      const boatMake = await swell.attributes.get("boat_make");
      const categoriesData = await swell.categories.list({ limit: 100 });
      const categoriesArr =
        (await categoriesData.results.map((entry) => entry.name)) || [];
      setBoatMake(boatMake);
      setBoatModel(boatModel);
      setCategories(categoriesArr);
    };
    fetchBoats();
  }, []);

  useEffect(() => {
    if (make) {
      if (make.includes("All Boat Makes")) {
        setFiltered(["All Boat Models"]);
      } else {
        const filtered = boatModel.values.filter((boat) => {
          return boat.toLowerCase().includes(make.toLowerCase());
        });
        if (filtered.length) {
          setFiltered(filtered);
          setModel(filtered[0]);
        }
      }
    }
  }, [make]);

  useEffect(() => {
    if (model && make) {
      fetchCategories();
    }
  }, [model, make]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = e.target.checkValidity();
    const form = e.target;
    const formData = new FormData(e.currentTarget);
    const validationMessages = Array.from(formData.keys()).reduce(
      (acc, key) => {
        acc[key] = form.elements[key].validationMessage;
        return acc;
      },
      {}
    );
    if (isValid) {
      // here you do what you need to do if is valid
      const data = Array.from(formData.keys()).reduce((acc, key) => {
        acc[key] = formData.get(key);
        return acc;
      }, {});
      if (data) {
        const find = !categoryIds
          ? []
          : categoryIds.find((category) => {
              return data.category === category.name;
            });
        try {
          router.push({
            pathname: "/products",
            query: {
              "Boat Make": data.boat_make,
              "Boat Model": data?.boat_model ? data.boat_model : "",
              categories: find?.id ? find.id : "",
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setErrors(validationMessages);
    }
  };

  const handleChange = (e) => {
    if (make && model.toLowerCase().includes(make.toLowerCase())) {
      fetchCategories();
    }
  };

  const getError = (field) => errors[field];

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} noValidate onChange={handleChange}>
        {!boatMake ? (
          <></>
        ) : (
          <BoatSelect
            values={boatMake.values}
            label={boatMake.name}
            setState={setMake}
            defaultVal={"select a boat make"}
            getError={getError}
            name={"boat_make"}
            required={true}
          />
        )}
        {!boatModel ? (
          <></>
        ) : (
          <BoatSelect
            values={!filtered.length ? boatModel.values : filtered}
            label={boatModel.name}
            setState={setModel}
            name={"boat_model"}
            getError={getError}
            defaultVal={"select a boat model"}
            required={false}
          />
        )}
        {!categories.length ? (
          <LoadingDots />
        ) : (
          <BoatSelect
            values={!filteredCategories.length ? [] : filteredCategories}
            label={"Product Categories"}
            setState={setCategory}
            defaultVal={"select a category"}
            getError={getError}
            name={"category"}
            required={false}
          />
        )}
        <input type="submit" value={"Search"} className={styles.submit} />
      </form>
    </div>
  );
};

export default SearchByBoat;
