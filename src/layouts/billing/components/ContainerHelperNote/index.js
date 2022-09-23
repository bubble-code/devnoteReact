/* eslint-disable react/jsx-filename-extension */
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import TabHelperNotes from "../../TabHelperNotes/TabHelperNotes";

function ContainerHelperNotes() {
  return (
    <SoftBox sx={{ height: "100%", backgroundColor: "#ffffffd4" }} >
      <SoftBox display="flex" justifyContent="space-between" flexDirection="column" alignItems="left" pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" sx={{ fontFamily: "Amethysta", textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.08rem' }}>
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