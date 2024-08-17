import styled from "styled-components";
import toast from "react-hot-toast";
/* eslint-disable no-unused-vars*/
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit } = useForm();
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
      // reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmitForm(data) {
    if (data.image === "") data.image = null;
    mutate(data);
  }
  return (
    //this handleSubmit is the one we received from useForm hook
    //in the handleSubmit function, we call the  function we created our own
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
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
