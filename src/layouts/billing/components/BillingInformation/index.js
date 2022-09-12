/* eslint-disable react/jsx-filename-extension */

import { Grid, TextareaAutosize, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Bill from "layouts/billing/components/Bill";
import './style.css'


function BillingInformation() {
  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Case Management Progress Note
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="pos" sx={{ width: 230 }} helperText="Client Name" />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="cn" sx={{ width: 130 }} helperText="Client Number" />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="cn" sx={{ width: 130 }} helperText="Provider Number" />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="cn" sx={{ width: 130 }} helperText="Date of Service" />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="cn" sx={{ width: 130 }} helperText="Service Code" />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="cn" sx={{ width: 130 }} helperText="Setting" />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="cn" sx={{ width: 130 }} helperText="Time Start" />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="cn" sx={{ width: 130 }} helperText="Time End" />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="cn" sx={{ width: 130 }} helperText="Minutes" />
          </Grid>
        </Grid>
        <Grid container spacing={0} mt={3} bgcolor='#5b5c5ca3' >         
          <Grid item xs={2} md={0} ml={0} mr={0}>
            <SoftTypography variant="h6" color='black'>Domain</SoftTypography>
          </Grid>
          <Grid item xs={4} md={0} ml={0} mr={0}>
            <SoftTypography variant="h6" color='black'>Description of Service(s)/Interventios</SoftTypography>
          </Grid>
          
        </Grid>
        <Grid container spacing={0} mt={0}  pr={0} >          
          <Grid item xs={3} md={0} ml={0} mr={0}>
            <TextField id="cn" sx={{ width: '100%', flexBasis:'10%' }}  />
          </Grid>
          <Grid item xs={10.5} md={0} ml={1} mr={0}>
            <TextField id="cn" sx={{ width: '100%', flexBasis:'100%', fontSize:'xx-large' }} multiline minRows={10} style={{fontSize:'64px !important'}} />
          </Grid>
        </Grid>
      </SoftBox>
    </Card>
  );
}

export default BillingInformation;
