/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import moment from "moment";
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress } from "@mui/material";




function TablesSearchRender({ respData }) {
    const orderData = respData.sort((a, b) => {
        return moment(b.fecha, "DD-MM-YYYY") - moment(a.fecha, "DD-MM-YYYY");
    });
    console.log('orderData', orderData);
    return (
        orderData.map((item, index) => {
            const { fecha, sNote, description, cm, cn } = item;
            return (
                <Accordion key={uuidv4()} >
                    <AccordionSummary
                        aria-controls="panel2bh-content"
                        id={index}
                        style={{ width: '100%' }}
                    >
                        <SoftBox bgColor='grey-100' borderRadius='md' display='flex' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}   >
                            <SoftBox bgColor='grey-400' borderRadius='md' px={1}>
                                <SoftTypography color='black' sx={{ fontFamily: "Amethysta", textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: '0.08rem' }}>{fecha.slice(0, -5)}</SoftTypography>
                            </SoftBox>
                            <SoftBox borderRadius='md' px={1.5} style={{ background: 'rgba(161, 88, 88,0.80)' }}>
                                <SoftTypography color='white' sx={{ fontFamily: "Amethysta", fontSize: '0.9rem', letterSpacing: '0.06rem' }}>{Object.values(description).join(' / ')}</SoftTypography>
                            </SoftBox>
                            <SoftBox bgColor='grey-400' borderRadius='md' px={1}>
                                <SoftTypography color='black' sx={{ fontFamily: "Amethysta", textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: '0.08rem' }}>{cm}</SoftTypography>
                            </SoftBox>
                            <SoftBox bgColor='grey-400' borderRadius='md' px={1}>
                                <SoftTypography color='black' sx={{ fontFamily: "Amethysta", textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: '0.08rem' }}>{cn}</SoftTypography>
                            </SoftBox>
                        </SoftBox>
                    </AccordionSummary>
                    <AccordionDetails >
                        <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'  >
                            {sNote}
                        </SoftTypography>
                    </AccordionDetails>
                </Accordion>

            );
        })
    );
}

// Setting default values for the props of Table
TablesSearchRender.defaultProps = {
    columns: [],
    rows: [{}],
};

// Typechecking props for the Table
TablesSearchRender.propTypes = {
    columns: PropTypes.node,
    rows: PropTypes.arrayOf(PropTypes.object),
}

export default TablesSearchRender;
