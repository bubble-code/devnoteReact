/* eslint-disable react/jsx-filename-extension */
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { grey } from "@mui/material/colors";



function HeadClient() {
    return (
        <SoftBox pt={2} px={2} py={2} display="flex" justifyContent="space-between" alignItems="center" borderRadius="md"  >
            <SoftTypography variant="button" fontWeight="regular" textTransform='capitalize' color='blue'>
                Area Clients
            </SoftTypography>
        </SoftBox>
    );
}

export default HeadClient;
