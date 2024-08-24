import { useQueryClient } from "@tanstack/react-query";
/* eslint-disable no-unused-vars*/
/*eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCraeteCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  //put other properties into the editValue object
  const { id: editId, ...editValues } = cabinToEdit;
  //we need a variable to control whether we want to edit/ create a cabin
  //if there is an edit id then true
  const isEditSession = Boolean(editId);

  //getValues can be the function to get values within this hook Form
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    //if it is an editSession, we use the editValues as default values, if not just an epmty object
    defaultValues: isEditSession ? editValues : {},
  });

  const queryClient = useQueryClient();

  //we need to get error from console and display it into the UI
  //formState is an object
  const { errors } = formState;
  const { isCreating, createCabin } = useCraeteCabin();
  const { isEditting, editCabin } = useEditCabin();
  function onSubmitForm(data) {
    //we need to handle different situations
    //CHECK THE IMAGE TYPE
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        { onSuccess: () => reset() }
      );
    else {
      //this is the mutation function so we can get access to the onSuccess
      //since we are not able to place reset and useForm hook inside our custom hooks ( has a default value)
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }
  //it receives the actual error so that we can check it in the console
  function onError(errors) {
    console.log(errors);
  }

  const isWorking = isCreating || isEditting;
  return (
    //this handleSubmit is the one we received from useForm hook
    //in the handleSubmit function of react hook form, we call the  function we created our own
    //when the form attampts to submit, the validation will be executed. if there is any error, the handleSubmit function won't call onSubmitForm function
    //instead, it willl call the second function we passed in, which is the onError
    <Form
      onSubmit={handleSubmit(onSubmitForm, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isWorking}
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
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
          disabled={isWorking}
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
          disabled={isWorking}
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
          {...register("description", {
            required: isEditSession ? false : "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          // type="file"
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        {/* in case if we want to use the form in other situation and the onCloseModal is not exist */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
