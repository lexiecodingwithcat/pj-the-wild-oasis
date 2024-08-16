import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "../cabins/CabinRow";
import { getCabins } from "../../services/apiCabins";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  //use react query to fetch cabin data
  // we pass an object: 1. queryKey which can uniquely identify this data that we are querying and need to be an array
  // so if we want to use the same data in another page, we can use this key, the data will then read from cache
  //2.queryFn is the function for fetching data from API
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({ queryKey: ["cabin"], queryFn: getCabins });
  console.log(isLoading, error, cabins);

  if (isLoading) return <Spinner />;
  return (
    // because we are using div to create the table
    // so giving them role will make browser knows this is a table --- accessibility
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          ))}
    </Table>
  );
}

export default CabinTable;
