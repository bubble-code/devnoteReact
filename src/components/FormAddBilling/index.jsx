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
import { async } from "@firebase/util";


const formObject = {
    "description": "",
    "timeStart": "",
    "timeEnd": "",
    "pos": "",
}
function FormAddBilling({ py, mb, headTitle }) {
    const [actClinet, setactClinet] = React.useState([]);
    const [dataForm, setDataForm] = React.useState(formObject);
    const [buttonIsActive, setButtonIsActive] = React.useState(true);
    const [controler] = useSoftUIController();
    const { listCM } = controler;
    const ref = React.useRef();
    const ref1 = React.useRef();


    const handleChangeCmName = async (id, event, value) => {
        // console.log(value);
        const request = await DataService.listActivedClients({ cm: value.label })
        const listActClient = request.map((item) => {
            return { label: item.id, cnumb: item.data().cnumb }
        });
        setDataForm(dataForm => ({ ...dataForm, [id]: value.label, ['pNumber']: value.pNumber, ['sCode']: value.sCode }));
        setactClinet(listActClient);
        setButtonIsActive(!buttonActive())
    };
    function handleChangeNameClient(id, event, value) {
        setDataForm(dataForm => ({ ...dataForm, [id]: value.label, ['cnumb']: value.cnumb }));
        setButtonIsActive(!buttonActive())
    }
    function handleChangeTime(value) {
        // console.log(`${value.$D}-${value.$M}-${value.$y}`);
        setDataForm(dataForm => ({ ...dataForm, ["fecha"]: `${value.$D}-${value.$M + 1}-${value.$y}` }));
        setButtonIsActive(!buttonActive())
    }
    const handleForm = (event) => {
        let key = event.target.id;
        setDataForm({ ...dataForm, [key]: event.target.value, });
        setButtonIsActive(buttonActive())
    };
    const countUnits = () => {
        const diff = moment.duration(moment(dataForm.timeEnd, 'HH:mm') - moment(dataForm.timeStart, 'HH:mm')).asMinutes() || 0
        switch (true) {
            case diff >= 8 && diff <= 22:
                return 1;
            case diff >= 23 && diff <= 37:
                return 2;
            case diff >= 38 && diff <= 52:
                return 3;
            case diff >= 53 && diff <= 67:
                return 4;
            case diff >= 68 && diff <= 82:
                return 5;
            case diff >= 83 && diff <= 97:
                return 6;
            case diff >= 98 && diff <= 112:
                return 7;
            case diff >= 113 && diff <= 127:
                return 8;
            case diff >= 128 && diff <= 142:
                return 9;
            default:
                return 10;
        }
    };
    const duration = () => {
        return moment.duration(moment(dataForm.timeEnd, 'HH:mm') - moment(dataForm.timeStart, 'HH:mm')).asMinutes() || 0
    }
    const submitForm = async () => {
        const descriptionSplit = dataForm.description.split("/").map((item) => item.trim());
        const descriptionObject = Object.assign({}, descriptionSplit);
        await DataService.createBilling({ data: { ...dataForm, ['description']: descriptionObject, ['min']: duration(), ['units']: countUnits(), ['status']: 'open' } });
        setDataForm({ ...dataForm, ...formObject });
        setButtonIsActive(false)
    };
    function buttonActive() { 
        return (!!dataForm.description.length && !!dataForm.timeStart.length)
    }
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
                            <Grid item xs={1} md={2.7} ml={1} mr={0}>
                                <SelectInput data={actClinet} sxx={{ width: 230 }} onchange={handleChangeNameClient} hText="Type Name Client" ref={ref} id='cn' />
                            </Grid>
                            <Grid item xs={0} md={0.7} ml={0} mr={0}>
                                <TextField id="pos" sx={{ width: 60 }} helperText="Pos" onChange={handleForm}
                                    value={dataForm.pos} />
                            </Grid>
                            <Grid item  >
                                <TextField id="description" sx={{ width: 455 }} helperText="Service Description" onChange={handleForm}
                                    value={dataForm.description} />
                            </Grid>
                            <Grid item xs={12} md={1} ml={1}>
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
                            <Button variant="gradient" color={"dark"} onClick={submitForm} disabled={!buttonIsActive}>
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