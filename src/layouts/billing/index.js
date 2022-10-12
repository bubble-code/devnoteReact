/* eslint-disable react/jsx-filename-extension */
import { Fragment } from "react";

// Component
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import WriteNote from "../../components/WriteNote/WriteNote";
import ContainerAcordionBilling from "../../components/BillAcordionContainer/ContainerAcordionBilling";


function Billing() {
  return (
    <Fragment>
      <SoftBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ContainerAcordionBilling mb={2} headTitle={"Billing Service"} />
          </Grid>
        </Grid>
        <SoftBox my={2}>
          <Grid item xs={23} md={23}>
            <WriteNote />
          </Grid>
        </SoftBox>
      </SoftBox>
    </Fragment>
  );
}

export default Billing;
