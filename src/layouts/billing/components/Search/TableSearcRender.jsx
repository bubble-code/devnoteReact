/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import moment from "moment";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { blue, grey } from '@mui/material/colors';




function TablesSearchRender({ respData }) {
    const orderData = respData.sort((a, b) => {
        return moment(b.fecha, "DD-MM-YYYY") - moment(a.fecha, "DD-MM-YYYY");
    });
    console.log('orderData', orderData);
    return (
        orderData.map((item, index) => {
            const { fecha, sNote, description, cm, cn } = item;
            return (
                <Accordion key={uuidv4()} style={{ background: grey[400] }} >
                    <AccordionSummary
                        aria-controls="panel2bh-content"
                        id={index}
                        style={{ width: '100%' }}
                    ><SoftBox display="flex"  justifyContent="space-between" flexDirection='column' sx={{ width: '100%' }} borderRadius='md'>
                            <SoftBox display="flex" justifyContent="space-between" borderRadius='md' px={0} style={{ textAlign: 'center' }}>
                                <SoftBox borderRadius='md' px={1} mt={1} mb={1} style={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
                                    <SoftTypography color='black' sx={{ fontFamily: "inherit", textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.08rem' }}>{fecha.slice(0, -5)}</SoftTypography>
                                </SoftBox>
                                <SoftBox borderRadius='sm' px={1} mt={1} mb={1} >
                                    <SoftTypography color='black' sx={{ fontFamily: 'inherit', fontSize: '0.8rem', letterSpacing: '0.05rem', textTransform: 'uppercase' }}>{Object.values(description).join(' / ')}</SoftTypography>
                                </SoftBox>
                            </SoftBox>
                            <SoftBox borderRadius='md' display='flex' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }} style={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }} >
                                <SoftBox bgColor={blue[50]} borderRadius='sm' px={1} >
                                    <SoftTypography color='black' sx={{ textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.08rem' }} style={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>{cm}</SoftTypography>
                                </SoftBox>
                                <SoftBox bgColor={blue[50]} borderRadius='sm' px={1} >
                                    <SoftTypography color='black' sx={{ textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: '0.08rem' }} style={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>{cn}</SoftTypography>
                                </SoftBox>
                            </SoftBox>

                        </SoftBox>
                    </AccordionSummary>
                    <AccordionDetails >
                        <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth' style={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }} >
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
