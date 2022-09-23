/* eslint-disable react/jsx-filename-extension */
import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import WriteNote from "../billing/components/WriteNote/WriteNote";
import ContainerHelperNotes from "./components/ContainerHelperNote";
import TableBillingService from "../../components/TableBillingService";

function Billing() {
  return (
    <Fragment>
      <SoftBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableBillingService py={0} mb={2} headTitle={"Billing Service"} />
          </Grid>
        </Grid>
        <SoftBox my={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <WriteNote />
            </Grid>
            <Grid item xs={12} md={5}>
              <ContainerHelperNotes />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </Fragment>
  );
}

export default Billing;
