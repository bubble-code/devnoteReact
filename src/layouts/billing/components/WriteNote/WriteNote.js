/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { useSoftUIController, setCurrentClToNote } from "../../../../context";
import Dataservice from '../../../../service/services'
import { Button, Grid, Icon, TextareaAutosize, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Bill from "layouts/billing/components/Bill";
import './style.css'
import SoftButton from "components/SoftButton";


function WriteNote() {
  const [formData, setFormData] = React.useState({});
  const [controler, dispatch] = useSoftUIController();
  const { currentClToNote } = controler;
  const initialValues = {
    sNote: '',
    domain: '',
  };

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    Dataservice.updateSerNote({ cm: currentClToNote.cm, id: currentClToNote.id, data: { ...formData, ['status']: 'completed' } })
      .then((response) => {
        setFormData(initialValues);
        setCurrentClToNote(dispatch, {
          status: '',
          timeEnd: '',
          timeStart: '',
          pNumber: '',
          sNote: '',
          pos: '',
          sCode: '',
          units: '',
          fecha: '',
          description: {},
          cn: '',
          min: '',
          cnumb: '',
          cm: '',
          domain: '',
          id: '',
        });
      })
  }
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
            <TextField id="cn" sx={{ width: 230 }} helperText="Client Name" value={currentClToNote.cn} disabled />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="cnumb" sx={{ width: 130 }} helperText="Client Number" value={currentClToNote.cnumb} disabled />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="pNumber" sx={{ width: 130 }} helperText="Provider Number" value={currentClToNote.pNumber} disabled />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="dSer" sx={{ width: 130 }} helperText="Date of Service" value={currentClToNote.fecha} disabled />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="sCode" sx={{ width: 130 }} helperText="Service Code" value={currentClToNote.sCode} disabled />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="pos" sx={{ width: 130 }} helperText="Setting" value={currentClToNote.pos} disabled />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="tStart" sx={{ width: 130 }} helperText="Time Start" value={currentClToNote.timeStart} disabled />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="tEnd" sx={{ width: 130 }} helperText="Time End" value={currentClToNote.timeEnd} disabled />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="mn" sx={{ width: 130 }} helperText="Minutes" value={currentClToNote.min} disabled />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <TextField id="units" sx={{ width: 130 }} helperText="Unitis" value={currentClToNote.units} disabled />
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
        <Grid container spacing={0} mt={0} pr={0} justifyContent={'space-between'}>
          <Grid item xs={2} md={0} ml={0} mr={0} width={50}>
            <TextField id="domain" sx={{ width: '100%', flexBasis: '90%' }} onChange={handleChange} value={formData['domain']} />
          </Grid>
          <Grid item xs={9} md={0} ml={1} mr={0}>
            <TextareaAutosize id="sNote" sx={{ width: '100%' }} minRows={10} onChange={handleChange} style={{ fontSize: '1.2rem' }} value={formData['sNote']} />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox display="flex" justifyContent="end" alignItems="left">
        <SoftBox mr={6}>
          <SoftButton variant="gradient" color={"dark"} onClick={handleSubmit}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;Save Note
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default WriteNote;
