/* eslint-disable react/jsx-filename-extension */
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import FormAddBilling from "./FormAddBilling";
import AddBillingForm from "layouts/billing/components/PaymentMethod";
import Invoice from "layouts/billing/components/Invoice";

function Tables() {

  return (
    <SoftBox mb={3} mt={3}>
      <SoftBox mb={3} mt={3}>
        <AddBillingForm />
      </SoftBox>
      <Card>
        <FormAddBilling headTitle={"Billing Invoice"} />
      </Card>
    </SoftBox>
  );
}

export default Tables;
