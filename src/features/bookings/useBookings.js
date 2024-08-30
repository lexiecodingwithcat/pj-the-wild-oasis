import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  // we filter the booking data from the server side
  const [searchParams] = useSearchParams();
  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : // we can also pass the method to make it dynamic instead of hard code "equal"
        // { field: "totalPrice", value: 5000, method: "gte" };
        { field: "status", value: filterValue };
  //SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    //whenever the filter obj changed, it will re-fetch the data
    //otherwise React Query won't know the bookings is changed
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, error, isLoading };
}
