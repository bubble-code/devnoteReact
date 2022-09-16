/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { useSoftUIController, setCurrentClToNote, setListBilling } from "../../../../context";
import DataService from '../../../../service/services'
import { useSaveNote } from "../../../../service/fetchHoo";
import { Box, Button, Grid, Icon, TextareaAutosize, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Bill from "layouts/billing/components/Bill";
import './style.css'
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";


function WriteNote() {
  const [formData, setFormData] = React.useState({});
  const [controler, dispatch] = useSoftUIController();
  const { currentClToNote } = controler;
  const { datas, error, loading, saveData } = useSaveNote();
  const description = currentClToNote.description ? Object.values(currentClToNote.description).join('/') : '';
  const initialValues = {
    sNote: '',
    domain: '',
    outComeS: '',
    nStep: '',
  };

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    saveData({ cm: currentClToNote.cm, id: currentClToNote.id, data: { ...formData, ['status']: 'completed' } })
    if (error) {
      console.log(error)
    }
    else {
      DataService.listBillingOpenByCm({ cm: currentClToNote.cm }).then((res) => {
        console.log(res)
        setListBilling(dispatch, { [cm]: [...res] });
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
          tcm: '',
          domain: '',
          id: '',
          outComeS: '',
          nStep: '',
        });

      })
    }
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
            <TextField id="tcn" sx={{ width: 230 }} helperText="Client Name" value={currentClToNote.cn} disabled color="light" />
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
            <TextField id="tpos" sx={{ width: 130 }} helperText="Setting" value={currentClToNote.pos} disabled />
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
        <SoftBox display='flex'>
          <SoftBox sx={{ width: '15%' }}>
            <SoftInput id="domain" onChange={handleChange} value={formData['domain']} />
          </SoftBox>
          <SoftBox ml={3} alignItems='center' display='flex' justifyContent='center' >
            <SoftTypography variant="h6" color='black' textAlign='center'>{description}</SoftTypography>
          </SoftBox>
        </SoftBox>
        <SoftBox container spacing={0} mt={3} bgColor='grey-400' borderRadius='md' p={0.5} pl={1}  >
          <SoftTypography variant="h6" color='black'>Description of Service(s)/Interventios</SoftTypography>
        </SoftBox>
        <Grid container spacing={0} mt={0} pr={0} justifyContent={'space-between'}>
          <SoftBox sx={{ width: '100%' }}>
            <TextareaAutosize id="sNote" sx={{ width: '100%' }} minRows={15} onChange={handleChange} style={{ fontSize: '1.2rem' }} value={formData['sNote']} />
          </SoftBox>
          <SoftBox display='flex' width='100%' >
            <SoftBox sx={{ width: '50%' }} mr={4}>
              <SoftTypography variant="h6" color='grey'>OutCome of Service</SoftTypography>
              <TextareaAutosize id="outComeS" minRows={5} onChange={handleChange} style={{ fontSize: '1.2rem', width: '100%' }} value={formData['outComeS']} />
            </SoftBox>
            <SoftBox sx={{ width: '50%' }}>
              <SoftTypography variant="h6" color='grey'>Next Step</SoftTypography>
              <TextareaAutosize id="nStep" minRows={5} onChange={handleChange} style={{ fontSize: '1.2rem', width: '100%' }} value={formData['nStep']} />
            </SoftBox>
          </SoftBox>
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
