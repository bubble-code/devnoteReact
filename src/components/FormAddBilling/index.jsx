import React from "react";
import PropTypes from "prop-types";
import { useSoftUIController } from "context";
import Grid from '@mui/material/Grid';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import "./style.css";

// Component: SoftBox
// import SoftBox from "components/SoftBox";
import SoftBox from "../../components/SoftBox";
import SelectInput from "../../components/SelectInput";
// import SoftInput from "components/SoftInput";
import SoftInput from "../../components/SoftInput";
import SoftTypography from "../../components/SoftTypography";
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DateTimePicker from "components/DateTimePicker";
import DataService from '../../service/services'
import SoftBadge from "../../components/SoftBadge";
import { Button, TextField } from "@mui/material";
import moment from "moment/moment";


function FormAddBilling({ py, mb, headTitle }) {
    const [actClinet, setactClinet] = React.useState([]);
    const [dataForm, setDataForm] = React.useState({});
    const [controler] = useSoftUIController();
    const { listCM } = controler;
    const ref = React.useRef();
    const ref1 = React.useRef();

    const formObject = {
        "description": "",
        "timeStart": "",
        "timeEnd": "",
        "pos": "",
    }

    const handleChangeCmName = async (id, event, value) => {
        const request = await DataService.listActivedClients({ cm: value.label })
        const listActClient = request.map((item) => {
            return { label: item.id }
        });
        // formObject[id] = value.label;
        // console.log(formObject);
        setDataForm(dataForm => ({ ...dataForm, [id]: value.label }));
        // ref.current.value = '';
        setactClinet(listActClient);
    };
    function handleChangeNameClient(id, event, value) {
        setDataForm(dataForm => ({ ...dataForm, [id]: value.label }));
    }
    function handleChangeTime(value) {
        console.log(`${value.$D}-${value.$M}-${value.$y}`);
        setDataForm(dataForm => ({ ...dataForm, ["fecha"]: `${value.$D}-${value.$M + 1}-${value.$y}` }));
    }
    const handleForm = (event) => {
        let key = event.target.id;
        setDataForm({ ...dataForm, [key]: event.target.value, });
    };
    const countUnits = () => {
        const diff = moment.duration(moment(dataForm.timeEnd, 'HH:mm') - moment(dataForm.timeStart, 'HH:mm')).asMinutes() || 0
        switch (true) {
            case diff <= 30:
                return 1;
            case diff > 30 && diff <= 60:
                return 2;
            case diff > 60 && diff <= 90:
                return 3;
            default:
                return 4;
        }
    };
    const duration = () => {
        return moment.duration(moment(dataForm.timeEnd, 'HH:mm') - moment(dataForm.timeStart, 'HH:mm')).asMinutes() || 0
    }
    const submitForm = () => {
        // const request = await DataService.createBilling(dataForm);        
        console.log({ ...dataForm, ['min']: duration(), ['units']: countUnits() });
        setDataForm({ ...formObject });
    };
    return (
        <SoftBox py={py}>
            <SoftBox mb={mb}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">{headTitle}</SoftTypography>
                        <SelectInput data={listCM} onchange={handleChangeCmName} parse hText="Choice CM Name" ref={ref1} id='cm' />
                        <DateTimePicker func={handleChangeTime} value={dataForm.fecha} />
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
                                <SelectInput data={actClinet} sxx={{ width: 200 }} onchange={handleChangeNameClient} hText="Type Name Client" ref={ref} id='cn' />
                            </Grid>
                            <Grid item xs={1} md={1} ml={1} mr={0}>
                                <TextField id="pos" sx={{ width: 50 }} helperText="Pos" onChange={handleForm}
                                    value={dataForm.pos} />
                            </Grid>
                            <Grid item xs={12} md={4} >
                                <TextField id="description" sx={{ width: 255 }} helperText="Service Description" onChange={handleForm}
                                    value={dataForm.description} />
                            </Grid>
                            <Grid item xs={12} md={1.5} ml={1}>
                                <TextField id="timeStart" sx={{ width: 80 }} placeholder="_:__" helperText="Start" onChange={(e) => handleForm(e)}
                                    value={dataForm.timeStart} />
                            </Grid>
                            <Grid item xs={12} md={1.5} ml={1}>
                                <TextField id="timeEnd" sx={{ width: 80 }} placeholder="_:__" helperText="End" onChange={(e) => handleForm(e)}
                                    value={dataForm.timeEnd} />
                            </Grid>
                        </Grid>
                    </SoftBox>

                    <SoftBox mr={2} ml={2} mb={3} mt={3} display="flex" justifyContent="space-between" >
                        <SoftBox display='flex'>
                            <SoftBox display='flex' flexDirection='column' alignItems='center' justifyContent='center' ml={1}>
                                <TextField id="min" sx={{ width: 80 }} helperText='min' disabled classes={'mia'}
                                    value={duration()} />
                            </SoftBox>
                            <SoftBox display='flex' flexDirection='column' alignItems='center' justifyContent='center' ml={1}>
                                <TextField id="doc" sx={{ width: 80 }} helperText='doc' disabled classes={'mia'} value={0} />
                            </SoftBox>
                            <SoftBox display='flex' flexDirection='column' alignItems='center' justifyContent='center' ml={1}>
                                <TextField id="unit" sx={{ width: 80 }} helperText='unit' disabled classes={'mia'} value={countUnits()} />
                            </SoftBox>
                        </SoftBox>
                        <SoftBox mr={0}>
                            <Button variant="gradient" color={"dark"} onClick={submitForm}>
                                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                                &nbsp;Add Service
                            </Button>
                        </SoftBox>
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