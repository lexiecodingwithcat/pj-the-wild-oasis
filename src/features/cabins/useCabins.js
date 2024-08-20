import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  //use react query to fetch cabin data
  // we pass an object: 1. queryKey which can uniquely identify this data that we are querying and need to be an array
  // so if we want to use the same data in another page, we can use this key, the data will then read from cache
  //2.queryFn is the function for fetching data from API
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({ queryKey: ["cabins"], queryFn: getCabins });
  return {isLoading, cabins, error}
}
