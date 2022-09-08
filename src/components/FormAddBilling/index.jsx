import React from "react";
import PropTypes from "prop-types";
import { useSoftUIController } from "context";
import Grid from '@mui/material/Grid';

// Component: SoftBox
// import SoftBox from "components/SoftBox";
import SoftBox from "../../components/SoftBox";
import SelectInput from "../../components/SelectInput";
// import SoftInput from "components/SoftInput";
import SoftInput from "../../components/SoftInput";
import SoftTypography from "components/SoftTypography";
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DateTimePicker from "components/DateTimePicker";
import DataService from '../../service/services'


function FormAddBilling({ py, mb, headTitle }) {
    const [actClinet, setactClinet] = React.useState([]);
    const [controler] = useSoftUIController();
    const { listCM } = controler;
    const handleChangeCmName = async (event, value) => {
        const request = await DataService.listActivedClients({ cm: value.label })
        console.log("request");
        const listActClient = request.map((item) => {
            return { label: item.id }
        });
        // console.log(listActClient);
        setactClinet(listActClient);
    };
    return (
        <SoftBox py={py}>
            <SoftBox mb={mb}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">{headTitle}</SoftTypography>
                        <SelectInput data={listCM} onchange={handleChangeCmName} parse hText="Choice CM Name" />
                        <DateTimePicker />
                    </SoftBox>
                    <Divider color="black" /> 
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
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={3} ml={1} mr={0}>
                                <SelectInput data={actClinet} sxx={{ width: 200 }} onchange={() => { }} hText="Type Name Client" />
                            </Grid>
                            <Grid item xs={1} md={1} ml={1} mr={0}>
                                <SoftInput placeholder="Pos"
                                // icon={{ component: "AccountCircle", direction: "left" }} 
                                />
                            </Grid>
                            <Grid item xs={12} md={4} ml={1}>
                                <SoftInput placeholder="Service description"
                                />
                            </Grid>
                            <Grid item xs={12} md={1.5} ml={1}>
                                <SoftInput placeholder="Start time"
                                />
                            </Grid>
                            <Grid item xs={12} md={1.5} ml={1}>
                                <SoftInput placeholder="End time"
                                />
                            </Grid>
                        </Grid>
                    </SoftBox>

                    <SoftBox mr={3} mb={3} mt={3} display="flex" justifyContent="end">
                        <SoftButton variant="gradient" color={"dark"} current={0}>
                            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                            &nbsp;Add Service
                        </SoftButton>
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