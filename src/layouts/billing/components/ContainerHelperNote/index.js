/* eslint-disable react/jsx-filename-extension */
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import TabHelperNotes from "../../TabHelperNotes/TabHelperNotes";
import { grey } from '@mui/material/colors';

function ContainerHelperNotes() {
  return (
    <SoftBox sx={{ height: "100%" }} bgColor={grey[500]} borderRadius='md' >
      <SoftBox display="flex" justifyContent="space-between" flexDirection="column" alignItems="left" pt={3} px={2}>
        <SoftTypography  color='black' fontWeight="medium" sx={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.08rem' }}>
          Helper Notes Create
        </SoftTypography>
        <SoftBox mt={2} >
          <TabHelperNotes />
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

export default ContainerHelperNotes;