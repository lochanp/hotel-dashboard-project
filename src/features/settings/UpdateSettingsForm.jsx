import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSettings from './useSettings';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {
  //get settings
  const {isLoading,error,settingsData = {}} = useSettings()
  
  //update settings
  const {updateSetting,isUpdating} = useUpdateSetting()

  const handleUpdate = (e,fieldName) => {
    if(e.target.value) {
      updateSetting({[fieldName]:e.target.value})
    }
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={settingsData.minBookingLength} onBlur={(e) => handleUpdate(e,'minBookingLength')} disabled={isUpdating} />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={settingsData.maxBookingLength} onBlur={(e) => handleUpdate(e,'maxBookingLength')} disabled={isUpdating} />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={settingsData.maxGuestsPerBooking} onBlur={(e) => handleUpdate(e,'maxGuestsPerBooking')} disabled={isUpdating} />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={settingsData.BreakfastPrice} onBlur={(e) => handleUpdate(e,'BreakfastPrice')} disabled={isUpdating} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
