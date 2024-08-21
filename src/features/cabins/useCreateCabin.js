import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";

export function useCraeteCabin() {
  const queryClient = useQueryClient();
  //useMutation to create new cabin and do the re-validation
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    //same as:
    //mutationFn: newCabin => createCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      //we also need to re-fetch the data using queryClient
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //after submission, reset the form
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}
