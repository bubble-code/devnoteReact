import React from "react";
import PropTypes from "prop-types";
import Grid from '@mui/material/Grid';

// Component: SoftBox
// import SoftBox from "components/SoftBox";
import SoftBox from "../../components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';


function FormAddBilling({ py, mb, headTitle }) {
    return (
        <SoftBox py={py}>
            <SoftBox mb={mb}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">{headTitle}</SoftTypography>                        
                    </SoftBox>
                    <Divider  color="black"/>
                    <SoftBox
                        sx={{
                            "& .MuiTableRow-root:not(:last-child)": {
                                "& td": {
                                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                        `${borderWidth[1]} solid ${borderColor}`,
                                },
                            },
                        }}
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={4} ml={2}>
                                <SoftBox display='flex' alignItems='left' flexDirection='column'>
                                    <SoftTypography variant="h6">Fecha</SoftTypography>
                                    <SoftInput />
                                </SoftBox>
                            </Grid>
                            <Grid item xs={12} md={4} ml={2}>
                                <SoftBox display='flex' alignItems='left' flexDirection='column'>
                                    <SoftTypography variant="h6">Fecha</SoftTypography>
                                    <SoftInput />
                                </SoftBox>
                            </Grid>
                            <Grid item xs={12} md={4} ml={2}>
                                <SoftBox display='flex' alignItems='left' flexDirection='column'>
                                    <SoftTypography variant="h6">Fecha</SoftTypography>
                                    <SoftInput />
                                </SoftBox>
                            </Grid>
                            <Grid item xs={12} md={4} ml={2}>
                                <SoftBox display='flex' alignItems='left' flexDirection='column'>
                                    <SoftTypography variant="h6">Fecha</SoftTypography>
                                    <SoftInput />
                                </SoftBox>
                            </Grid>
                        </Grid>
                    </SoftBox>
                </Card>
            </SoftBox>
        </SoftBox>
    );
}


FormAddBilling.propTypes = {
    py: PropTypes.number,
    mb: PropTypes.number,
    headTitle: PropTypes.string,
};

export default FormAddBilling;