import toast from "react-hot-toast";
/* eslint-disable no-unused-vars*/
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  //getValues can be the function to get values within this hook Form
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const queryClient = useQueryClient();
  //useMutation to create new cabin and do the re-validation
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    //same as:
    //mutationFn: newCabin => createCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      //we also need to re-fetch the data using queryClient
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //after submission, reset the form
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  //we need to get error from console and display it into the UI
  //formState is an object
  const { errors } = formState;

  function onSubmitForm(data) {
    if (data.image === "") data.image = null;
    mutate(data);
  }
  //it receives the actual error so that we can check it in the console
  function onError(errors) {
    console.log(errors);
  }
  return (
    //this handleSubmit is the one we received from useForm hook
    //in the handleSubmit function, we call the  function we created our own
    //when the form attampts to submit, the validation will be executed. if there is any error, the handleSubmit function won't call onSubmitForm function
    //instead, it willl call the second function we passed in, which is the onError
    <Form onSubmit={handleSubmit(onSubmitForm, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            //we can set validation as the second params in register function
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least one",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            //we can also write our own validation using a callback function
            //the value is the one currently being input in this field
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              //pass as a message
              "Disocunt should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
