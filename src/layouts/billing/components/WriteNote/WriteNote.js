/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentClToNote } from "../../../../context";
import { useSaveNote } from "../../../../service/fetchHoo";
import moment from "moment";

// Component
import WriteAreaContainer from "../../../../components/TextAreaTinic/TextAreaTinic";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftBadge from "components/SoftBadge";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Box, Button, Grid, Icon, TextareaAutosize, Snackbar, Alert, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import Card from "@mui/material/Card";
import WriteBarHelper from "../../../../components/WriteBarHelper/WriteBarHelper";

// Style
import './style.css'


function WriteNote() {
  const clientFromRedux = useSelector((state) => state.currentClToNote);
  const { currentClient: currentClToNote } = clientFromRedux;
  const [formData, setFormData] = React.useState({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const dispatchRedux = useDispatch();
  const { datas, error, loading, saveData } = useSaveNote();
  const editorRef = useRef(null);

  function handleCloseSnaclbar() {
    setOpenSnackbar(false);
  }
  function handleOpenSnackbar() {
    setOpenSnackbar(true);
  }

  const description = currentClToNote.description ? Object.values(currentClToNote.description).join('/') : '';

  const initialValues = {
    sNote: '',
    domain: '',
    outComeS: '',
    nStep: '',
  };

  useEffect(() => {
    setFormData({ ...currentClToNote });

  }, [currentClToNote]);

  const stringTime = currentClToNote.timeStart ? moment(currentClToNote.timeStart, "HHmm").format("HH:mm A") : null;
  const stringTimeEnd = currentClToNote.timeEnd ? moment(currentClToNote.timeEnd, "HHmm").format("HH:mm A") : null;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  function handeAreaChange(id, data) {
    // console.log('Content was updated:', data);
    // console.log('ID:', id);

    setFormData({
      ...formData,
      [id]: data,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    saveData({ cm: currentClToNote.cm, id: currentClToNote.id, data: { ...formData, ['status']: 'open' } })
    if (!error) {
      handleOpenSnackbar();
      // dispatchRedux({ type: 'CURRENT_CL_TO_NOTE_SUCCESS', value: {} })
      // setFormData(initialValues);
    }
  }

  return (
    <SoftBox bgColor={grey[300]} borderRadius='md' pb={2}>
      <SoftBox pt={0} pb={2} px={2}>
        <Grid container >
          <Grid container spacing={3} sm={5}>
            <Grid item xs={0} md={0} ml={0} mr={0}>
              <SoftBadge variant="contained" badgeContent={currentClToNote.cn}
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Grid>
            <Grid item xs={0} md={0} ml={0} mr={0}>
              <SoftBadge variant="contained" badgeContent={currentClToNote.pos}
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Grid>
            <Grid item xs={0} md={0} ml={0} mr={0}>
              <SoftBadge variant="contained" badgeContent={currentClToNote.fecha}
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Grid>
            <Grid item xs={0} md={0} ml={0} mr={0}>
              <SoftBadge variant="contained" badgeContent={stringTime}
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Grid>
            <Grid item xs={0} md={0} ml={0} mr={0}>
              <SoftBadge variant="contained" badgeContent={stringTimeEnd}
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Grid>
            <Grid item xs={0} md={0} ml={0} mr={0}>
              <SoftBadge variant="contained" badgeContent={`${currentClToNote.min} min`}
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Grid>
            <Grid item xs={0} md={0} ml={0} mr={0}>
              <SoftBadge variant="contained" badgeContent={currentClToNote.units}
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
            </Grid>
          </Grid>
          <Grid container sm={1}>
            <Divider orientation={"vertical"} sx={{ "& .MuiDivider-root": { background: 'black !important' }, mt: 1, mb: 1, opacity: 1 }} />
          </Grid>
          {/*aqui botones de ayudas*/}
          <WriteBarHelper />
        </Grid>

        <SoftBox display='flex' justifyContent='start' container spacing={0} mt={2}>
          <SoftBadge variant="contained" badgeContent={description}
            color="palettePastel" size="sm" container wordSpacing='0.1rem' />
          <SoftBox ml={4}>
            <SoftInput id="domain" onChange={handleChange} value={formData['domain'] || ''} placeholder="Domain" />
          </SoftBox>
        </SoftBox>
        <Grid container spacing={0} mt={1} pr={0} justifyContent={'space-between'}>
          {/*<SoftBox sx={{ width: '100%' }} bgColor={grey[500]}>
            <TextareaAutosize id="sNote" sx={{ width: '100%' }} minRows={15} onChange={handleChange} style={{ background: grey[300], fontSize: '1.2rem', lineHeight: 1.5, textAlign: 'justify', fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }} value={formData['sNote'] || ''} />
          </SoftBox>*/}
          <SoftBox sx={{ width: '100%' }} bgColor={grey[300]}>
            <SoftBox>
              <WriteAreaContainer editorRef={editorRef} value={formData['sNote'] || ''} onChange={handeAreaChange} id="sNote" />
            </SoftBox>
          </SoftBox>

          <SoftBox display='flex' width='100%' spacing={2} >
            <SoftBox sx={{ width: '50%', margin: '4px' }} >
              <SoftBadge variant="contained" badgeContent="OutCome of Service"
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
              <TextareaAutosize id="outComeS" minRows={5} onChange={handleChange} style={{ marginTop: '2px', fontSize: '1.2rem', width: '100%', fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }} value={formData['outComeS'] || ''} />
            </SoftBox>
            <SoftBox sx={{ width: '50%', margin: '4px' }}>
              <SoftBadge variant="contained" badgeContent="Next Step"
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
              <TextareaAutosize id="nStep" minRows={5} onChange={handleChange} style={{ marginTop: '2px', fontSize: '1.2rem', width: '100%', fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }} value={formData['nStep'] || ''} />
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" justifyContent="end" alignItems="left">
            <SoftBox mr={6}>
              <SoftButton variant="gradient" color={"dark"} onClick={handleSubmit}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;Save Note
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </Grid>
      </SoftBox >
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnaclbar} anchorOrigin={{ horizontal: 'center', vertical: 'top' }} message="Has been saved correctly!" />
    </SoftBox >
  );
}

export default WriteNote;
