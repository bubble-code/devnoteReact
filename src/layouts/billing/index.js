/* eslint-disable react/jsx-filename-extension */
import { Fragment } from "react";

// Component
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import WriteNote from "../billing/components/WriteNote/WriteNote";
import ContainerHelperNotes from "./components/ContainerHelperNote";
import ContainerAcordionBilling from "../../components/BillAcordionContainer/ContainerAcordionBilling";
import BillModalEditService from "../../components/BillModalEditService/BillModalEditService";


function Billing() {
  return (
    <Fragment>
      <SoftBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ContainerAcordionBilling py={0} mb={2} headTitle={"Billing Service"} />
          </Grid>
        </Grid>
        <SoftBox my={2}>
          <Grid container spacing={3}>
            <Grid item xs={22} md={22}>
              <WriteNote />
            </Grid>
          </Grid>
          <Grid item xs={23} md={23}>
            <ContainerHelperNotes />
          </Grid>
        </SoftBox>
      </SoftBox>
      <BillModalEditService />
    </Fragment>
  );
}

export default Billing;
