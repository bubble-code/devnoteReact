/* eslint-disable react/jsx-filename-extension */
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux';


// Component
import WriteAreaContainer from "../TextAreaTinic/TextAreaTinic";
import SoftInput from "components/SoftInput";
import SoftBadge from "components/SoftBadge";
import SoftBox from "../SoftBox";
import { TextareaAutosize, Snackbar } from "@mui/material";
import { grey } from "@mui/material/colors";
import WriteBarHelper from "../WriteBarHelper/WriteBarHelper";
import WriteNoteCurrentInfoBar from "../WriteNoteCurrentInfoBar/WriteNoteCurrentInfoBar";
import { Row, Divider, Col } from "antd";
import ButtonsSave from "./ButtonsSaves";

// Style
import './style.css'


function WriteNote() {
  const clientFromRedux = useSelector((state) => state);
  const { currentClient: currentClToNote } = clientFromRedux["currentClToNote"];
  const [formData, setFormData] = useState(currentClToNote);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const editorRef = useRef(null);

  const { isInProcess = false } = currentClToNote;
  // console.log("isInProcess", currentClToNote);

  useEffect(() => {
    setFormData(currentClToNote);
  }, [currentClToNote]);

  function handleCloseSnaclbar() {
    setOpenSnackbar(false);
  }


  const description = currentClToNote.description ? Object.values(currentClToNote.description).join(' / ') : '';

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  function handeAreaChange(id, data) {
    setFormData({
      ...formData,
      [id]: data,
    });
  }


  return (
    <SoftBox bgColor={grey[300]} borderRadius='md' pb={2}>
      <Row >
        <Col span={10}>
          <WriteNoteCurrentInfoBar />
        </Col>
        <Col span={1}>
          <Divider type="vertical" style={{ background: 'blue' }} />
        </Col>
        <Col span={10}>
          <WriteBarHelper />
        </Col>
        <Row gutter={[24, 24]} justify='start' align="bottom">
          <Col>
            <SoftBadge variant="contained" badgeContent={description}
              color="palettePastel" size="sm" container wordSpacing='0.1rem' />
          </Col>
          <Col >
            <SoftInput id="domain" onChange={handleChange} value={formData['domain'] || ''} placeholder="Domain" />
          </Col>
        </Row>

        <Col span={24}>
          <WriteAreaContainer editorRef={editorRef} value={formData['sNote'] || ''} onChange={handeAreaChange} id="sNote" />
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]} >
            <Col span={12}>
              <SoftBadge variant="contained" badgeContent="OutCome of Service"
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
              <TextareaAutosize id="outComeS" minRows={5} onChange={handleChange} style={{ marginTop: '2px', fontSize: '1.2rem', width: '100%', fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }} value={formData['outComeS'] || ''} />
            </Col>
            <Col span={12}>
              <SoftBadge variant="contained" badgeContent="Next Step"
                color="palettePastel" size="sm" container wordSpacing='0.1rem' />
              <TextareaAutosize id="nStep" minRows={5} onChange={handleChange} style={{ marginTop: '2px', fontSize: '1.2rem', width: '100%', fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }} value={formData['nStep'] || ''} />
            </Col>
          </Row>
        </Col>
        <ButtonsSave formVal={formData} handleOpenSnack={setOpenSnackbar} viewInProccess={!formData?.isInProcess} />
      </Row >
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnaclbar} anchorOrigin={{ horizontal: 'center', vertical: 'top' }} message="Has been saved correctly!" />
    </SoftBox >
  );
}

export default WriteNote;
