import React from "react";
import { useSelector } from "react-redux";

// Components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { grey } from "@mui/material/colors";
// import BoSeletInput from "components/Input/SeletInput";
import SelectInput from "../../../components/SelectInput";


function AssignedToBar() {
    const { listCMs } = useSelector(state => state.listCM)
    return (
        <SoftBox px={2} py={2} display="flex" justifyContent="start" alignItems="center" borderRadius="md"  >
            <SoftBox>
                <SoftTypography variant="caption" fontWeight="medium" textTransform='capitalize'>
                    Assignated to:
                </SoftTypography>
            </SoftBox>
            <SoftBox>
                <SelectInput data={listCMs} />
            </SoftBox>
        </SoftBox >
    );
}

export default AssignedToBar;