import productViewStyles from "../../blocks/productView/productView.module.css";

const OptionPicker = ({ name, options, onChange, selected }) => {
  return (
    <div className={productViewStyles.container}>
      <label htmlFor={name}>{name}</label>
      <select
        className={productViewStyles.select}
        id={name}
        onChange={onChange}
        value={selected}
      >
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionPicker;
