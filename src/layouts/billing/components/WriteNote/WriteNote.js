/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentClToNote } from "../../../../context";
import { useSaveNote } from "../../../../service/fetchHoo";
import { Box, Button, Grid, Icon, TextareaAutosize, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "components/SoftTypography";
import './style.css'
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftBadge from "components/SoftBadge";
import moment from "moment";


function WriteNote() {
  const [formData, setFormData] = React.useState({});
  const clientFromRedux = useSelector((state) => state.currentClToNote);
  const { currentClient: currentClToNote } = clientFromRedux;
  const dispatchRedux = useDispatch();
  const { datas, error, loading, saveData } = useSaveNote();
  const description = currentClToNote.description ? Object.values(currentClToNote.description).join('/') : '';
  const initialValues = {
    sNote: '',
    domain: '',
    outComeS: '',
    nStep: '',
  };

  const stringTime = currentClToNote.timeStart ? moment(currentClToNote.timeStart, "HHmm").format("HH:mm A") : null;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    saveData({ cm: currentClToNote.cm, id: currentClToNote.id, data: { ...formData, ['status']: 'completed' } })
    if (!error) {
      dispatchRedux({ type: 'CURRENT_CL_TO_NOTE_SUCCESS', value: {} })
      setFormData(initialValues);
    }
  }

  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" sx={{ fontFamily: "Amethysta", textTransform: 'uppercase', fontSize: '0.8rem' }}>
          Case Management Progress Note
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <SoftBadge variant="contained" badgeContent={currentClToNote.cn}
              color="palettePastel" size="sm" container wordSpacing='0.1rem' />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <SoftBadge variant="contained" badgeContent={currentClToNote.fecha}
              color="palettePastel" size="sm" container wordSpacing='0.1rem' />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <SoftBadge variant="contained" badgeContent={currentClToNote.pos}
              color="palettePastel" size="sm" container wordSpacing='0.1rem' />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <SoftBadge variant="contained" badgeContent={stringTime}
              color="palettePastel" size="sm" container wordSpacing='0.1rem' />
          </Grid>
          <Grid item xs={0} md={0} ml={0} mr={0}>
            <SoftBadge variant="contained" badgeContent={currentClToNote.units}
              color="palettePastel" size="sm" container wordSpacing='0.1rem' />
          </Grid>
          <Grid item sx={{ width: '15%' }}>
            <SoftInput id="domain" onChange={handleChange} value={formData['domain']} placeholder="Domain" />
          </Grid>
        </Grid>
        <SoftBox display='flex'>

          <SoftBox alignItems='center' display='flex' justifyContent='center' >
            <SoftBadge variant="contained" badgeContent={description}
              color="palettePastel" size="sm" container wordSpacing='0.1rem' />
          </SoftBox>
        </SoftBox>
        <SoftBox container spacing={0} mt={3} borderRadius='md' p={0.5}   >
          <SoftBadge variant="contained" badgeContent="Description of Service(s)/Intervention(s)"
            color="palettePastel" size="sm" container wordSpacing='0.1rem' />
        </SoftBox>
        <Grid container spacing={0} mt={0} pr={0} justifyContent={'space-between'}>
          <SoftBox sx={{ width: '100%' }}>
            <TextareaAutosize id="sNote" sx={{ width: '100%' }} minRows={15} onChange={handleChange} style={{ fontSize: '1.2rem', lineHeight: 1.5, textAlign: 'justify' }} value={formData['sNote']} />
          </SoftBox>
          <SoftBox display='flex' width='100%' spacing={2} >
            <SoftBox sx={{ width: '50%', margin: '4px' }} >
              <SoftBadge variant="contained" badgeContent="OutCome of Service"
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
              <TextareaAutosize id="outComeS" minRows={5} onChange={handleChange} style={{ fontSize: '1.2rem', width: '100%' }} value={formData['outComeS']} />
            </SoftBox>
            <SoftBox sx={{ width: '50%', margin: '4px' }}>
              <SoftBadge variant="contained" badgeContent="Next Step"
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
              <TextareaAutosize id="nStep" minRows={5} onChange={handleChange} style={{ fontSize: '1.2rem', width: '100%' }} value={formData['outComeS']} />
            </SoftBox>
          </SoftBox>
        </Grid>
      </SoftBox >
      <SoftBox display="flex" justifyContent="end" alignItems="left">
        <SoftBox mr={6}>
          <SoftButton variant="gradient" color={"dark"} onClick={handleSubmit}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;Save Note
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card >
  );
}

export default WriteNote;
