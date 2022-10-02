/* eslint-disable react/jsx-filename-extension */
import SoftBox from "components/SoftBox";
import FormAddBilling from "./FormAddBilling";
import AddBillingForm from "layouts/billing/components/PaymentMethod";
import { grey } from '@mui/material/colors';

function Tables() {

  return (
    <SoftBox mb={3} mt={3}>
      <SoftBox mb={3} mt={3}>
        <AddBillingForm />
      </SoftBox>
      <SoftBox sx={{ border: `solid 1px ${grey[400]}`, borderRadius: '4px' }}>
        <FormAddBilling headTitle={"Billing Invoice"} />
      </SoftBox>
    </SoftBox>
  );
}

export default Tables;
