import React from "react";
import PropTypes from "prop-types";

// Components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// import BoSeletInput from "components/Input/SeletInput";
import SelectInput from "../../../components/SelectInput";
import './style.css';
import { Divider } from "@mui/material";
import SoftButton from "components/SoftButton";


function AssignedToBar({ listCMs, title, handleChange, currentCM, ...rest }) {
    return (
        <SoftBox px={2} py={2} display="flex" justifyContent="start" alignItems="center" borderRadius="md"  >
            <SoftBox display="flex" justifyContent="start" alignItems="center">
                <SoftTypography variant="caption" fontWeight="medium" textTransform='capitalize'>
                    {title}
                </SoftTypography>
                <SoftBox ml={1} id="select_Client_Id" mt={1}>
                    <SelectInput data={listCMs} sxx={{ width: 160, height: 30 }} onchange={handleChange} value={currentCM} />
                </SoftBox>
            </SoftBox>
            <Divider orientation="vertical" flexItem />
            <SoftButton sx={{ border: 'none' }} bgColor='transparent' ><SoftTypography variant='caption'>Add Client</SoftTypography></SoftButton>
        </SoftBox>
    )

}

export default AssignedToBar;

AssignedToBar.propTypes = {
    listCMs: PropTypes.array,
    title: PropTypes.string,
    handleChange: PropTypes.func,
    currentCM: PropTypes.string
};