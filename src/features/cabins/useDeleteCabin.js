import toast from "react-hot-toast";
import { deleteCabins as deleteCabinsApi } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCabin() {
  //since the invalidQuery is inside queryClient, we we need to get query client first
  const queryClinet = useQueryClient();
  // the mutate function is a callback function we can connect with the button
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinsApi,
    // mutationFn: () => deleteCabinsApi(cabinId),
    //tell React waht to do as soon as the mutation is successful
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      //fetch the cabin data again by specifying the queryKey
      queryClinet.invalidateQueries({ queryKey: ["cabins"] });
    },
    //the err.message will display the message we wrote in deleteCabin function
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
