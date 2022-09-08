/* eslint-disable react/jsx-filename-extension */
import Card from "@mui/material/Card";
import { useSoftUIController } from "context";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";

// eslint-disable-next-line react/prop-types
function Invoices() {
  const [controller] = useSoftUIController();
  const { listCM } = controller;
  console.log(listCM);
  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          Billing By Case Management
        </SoftTypography>
        <SoftButton variant="outlined" color="info" size="small">
          view all
        </SoftButton>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        {listCM.map((item, index) => {
            // console.log(item);
            for (const key in item) {
              // console.log(item[key]);
              return <Invoice key={key} date={key} id={`${item[key]} services`} price={item['total']} />
            }
          }
          )}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default Invoices;
