import { useEffect, useState } from "react";
import BoatSelect from "./boatSelect";
import styles from "./searchByBoat.module.css";
import LoadingDots from "../ui/loadingDots/loadingDots";
import { getCategoryByBoat } from "@/lib/operations-swell";
import { useRouter } from "next/router";

const SearchByBoat = ({ boatMake, boatModel, categories }) => {
  const [make, setMake] = useState();
  const [model, setModel] = useState([]);
  const [category, setCategory] = useState();
  const [categoryIds, setCategoryIds] = useState();
  const [filtered, setFiltered] = useState([]);
  const [errors, setErrors] = useState({});
  const [filteredCategories, setFilteredCategories] = useState();
  const router = useRouter();

  useEffect(() => {
    if (make) {
      const filtered = boatModel.values.filter((boat) => {
        return boat.toLowerCase().includes(make.toLowerCase());
      });
      if (!filtered.length) {
        return null;
      } else {
        setFiltered(filtered);
      }
    }
  }, [make]);

  useEffect(() => {
    const fetchCategories = async () => {
      const jsonData = await getCategoryByBoat(model, make);
      console.log(jsonData);
      const categoryWithIds = jsonData.results.map((cat) => {
        return { name: cat.name, id: cat.id };
      });
      console.log(categoryWithIds);
      setCategoryIds(categoryWithIds);
      const categoryNames = jsonData.results.map((category) => {
        return category.name;
      });
      setFilteredCategories(categoryNames);
    };
    if (model && make) {
      fetchCategories();
    }
  }, [model, make]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = e.target.checkValidity();
    const form = e.target;
    const formData = new FormData(e.currentTarget);
    console.log(formData);
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
        console.log(find);
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

  const getError = (field) => errors[field];

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} noValidate>
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
            values={!filteredCategories ? categories : filteredCategories}
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
