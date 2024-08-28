import Select from "./Select";
import { useSearchParams } from "react-router-dom";
/*eslint-disable react/prop-types */
function SortBy({ options }) {
  //we need to set state to the URL
  const [searchParams, setSearchParams] = useSearchParams();
  //get currently selected value and assign it to the select so it wont disappear if refreshing the website
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return <Select options={options} type="white" onChange={handleChange} value={sortBy} />;
}

export default SortBy;
