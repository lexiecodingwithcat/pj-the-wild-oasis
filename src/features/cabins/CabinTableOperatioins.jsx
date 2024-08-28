import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function CabinTableOperatioins() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name(A-Z)" },
          { value: "name-desc", label: "Sort by name(Z-A)" },
          { value: "regularPrice-desc", label: "Sort by price(high first)" },
          { value: "regularPrice-asc", label: "Sort by price(low first)" },
          { value: "maxCapacity-desc", label: "Sort by price(high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity(low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperatioins;
