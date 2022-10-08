/* eslint-disable react/jsx-filename-extension */
import React from "react";
import PropTypes from "prop-types";

// Component
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import BillAcordionRender from "../BillBodyAcordRender/BillBodyAcordRender";
import BillInputFilterByClient from "./BillInputFilterByClient/BillInputFilterByClient";
import InputSelectCM from "./InputSelectCM";
import IconReloadService from "./IconReloadService";

import { grey } from '@mui/material/colors';


function ContainerAcordionBilling({ mb, headTitle }) {

    return (
        <SoftBox sx={{ minHeight: 250, padding: 2 }} bgColor={grey[300]} borderRadius='md' mb={mb}>
            <SoftBox display="flex" justifyContent="start" alignItems="center" >
                <SoftBox >
                    <SoftTypography variant="h6" mr={5} sx={{ fontFamily: "Amethysta", textTransform: 'uppercase', fontSize: '0.8rem', textAling: 'center' }}>{headTitle} </SoftTypography>
                </SoftBox>
                <InputSelectCM />
                <IconReloadService />
                <BillInputFilterByClient />
            </SoftBox>
            <SoftBox sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                            `${borderWidth[1]} solid ${borderColor}`,
                    },
                },
            }}
            >
                {/**/}
                <BillAcordionRender />
            </SoftBox>
        </SoftBox>
    );
}

ContainerAcordionBilling.propTypes = {
    py: PropTypes.number,
    mb: PropTypes.number,
    headTitle: PropTypes.string,
    isOpen: PropTypes.bool,
    handleOpen: PropTypes.func,
};

export default ContainerAcordionBilling;

