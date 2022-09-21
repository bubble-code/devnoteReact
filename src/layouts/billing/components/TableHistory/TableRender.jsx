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
            <Accordion  >
                <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={index} sx={{ width: '450px', paddingLeft: 1 }}
                >
                    <SoftBox bgColor='grey-200' borderRadius='md' display='flex' justifyContent='space-between' sx={{ width: '100%' }} px={1} >
                        <SoftTypography variant="h6" color='black' >{fecha.slice(0, -5)}</SoftTypography>
                        <SoftTypography variant="h6" color='black'>{Object.values(description).join(' / ')}</SoftTypography>
                    </SoftBox>
                </AccordionSummary>
                <AccordionDetails>
                    <SoftBox container>
                        <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'  >
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

