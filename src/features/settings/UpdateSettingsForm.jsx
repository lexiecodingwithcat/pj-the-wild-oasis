import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";


function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      breakfastPrice,
      maxGuestPerBooking,
    } = {},
    isLoading,
  } = useSettings();
  const { isUpdating, updateSettings } = useUpdateSettings();
  const { register } = useForm();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    // [field] is to pass the params dynamically
    updateSettings({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          //when using register to control the form, React Hook Form will manage all event handler, so it's better to use it inside the register
          {...register("minBookingLength", {
            onBlur: (e) => handleUpdate(e, "minBookingLength"),
          })}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          {...register("maxBookingLength", {
            onBlur: (e) => handleUpdate(e, "maxBookingLength"),
          })}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          disabled={isUpdating}
          {...register("maxGuestPerBooking", {
            onBlur: (e) => handleUpdate(e, "maxGuestPerBooking"),
          })}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          {...register("breakfastPrice", {
            onBlur: (e) => handleUpdate(e, "breakfastPrice"),
          })}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
