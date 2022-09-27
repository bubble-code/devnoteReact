/* eslint-disable react/jsx-filename-extension */
import PropTypes from "prop-types";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { grey } from "@mui/material/colors";
import { Divider } from "@mui/material";



function HeadClient({ title, icon, ...rest }) {
    return (
        <SoftBox pt={2} px={2} display="flex"  alignItems="center" borderRadius="md"  >
            <SoftTypography variant="button" fontWeight="regular" textTransform='capitalize' color='blue'>
                {title}
            </SoftTypography>
        </SoftBox>
    );
}

export default HeadClient;

HeadClient.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
};