/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { useSelector } from "react-redux";
import { useNotesByCliet } from '../../../../service/fetchHoo'
import moment from "moment";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './style.css'
import { CircularProgress } from "@mui/material";
import { grey } from '@mui/material/colors';


function TableRender() {
    const { currentClient } = useSelector(state => state.currentClToNote);
    const { cm, cn } = currentClient;
    const { data, loading, error } = useNotesByCliet({ cmm: cm, client: cn });

    let rows = [];
    const orderData = data.sort((a, b) => {
        return moment(b.data().fecha, "DD-MM-YYYY") - moment(a.data().fecha, "DD-MM-YYYY");
    });
    orderData.map((item, index) => {
        const { fecha, sNote, description } = item.data();
        rows.push(
            <Accordion style={{ background: grey[400] }} >
                <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={index}
                    style={{ width: '100%' }}
                >
                    <SoftBox bgColor='grey-400' borderRadius='md' display='flex' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}
                        style={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }} >
                        <SoftBox borderRadius='md' px={1} style={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
                            <SoftTypography color='black' sx={{ fontFamily: "inherit", textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.08rem' }}>{fecha.slice(0, -5)}</SoftTypography>
                        </SoftBox>
                        <SoftBox borderRadius='md' px={1.5} style={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
                            <SoftTypography color='black' sx={{ fontFamily: "inherit", textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.07rem' }}>{Object.values(description).join(' / ')}</SoftTypography>
                        </SoftBox>
                    </SoftBox>
                </AccordionSummary>
                <AccordionDetails>
                    <SoftBox container >
                        <SoftTypography variant="caption" color="secondary" alignItems='rigth' style={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }} >
                            {sNote}
                        </SoftTypography>
                    </SoftBox>
                </AccordionDetails>
            </Accordion>

        );
    });
    // bgColor='grey-400' display='flex' justifyContent='space-between' flexDirection='column' sx={{ width: '420px' }}
    return (
        <SoftBox display='flex' justifyContent='center' flexDirection='column' alignItems='center' >
            {loading ? <SoftBox><CircularProgress /></SoftBox> : rows}
        </SoftBox>
    );
}

export default TableRender;

