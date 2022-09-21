import React from "react";
import PropTypes from "prop-types";
import { useSoftUIController } from "context";
import "./style.css";
import SoftBox from "../../../components/SoftBox";
import SelectInput from "../../../components/SelectInput";
import SoftTypography from "../../../components/SoftTypography";
import Icon from "@mui/material/Icon";
import DateTimePicker from "components/DateTimePicker";
import DataService from '../../../service/services'
import { Button, TextField } from "@mui/material";
import { countUnits, duration, formInitialData } from '../data/funt';



function FormAddBilling({ headTitle }) {
    const [actClinet, setactClinet] = React.useState([]);
    const [dataForm, setDataForm] = React.useState(formInitialData);
    const [controler] = useSoftUIController();
    const { listCM } = controler;
    const ref = React.useRef();
    const ref1 = React.useRef();


    const handleChangeCmName = async (id, event, value) => {
        const request = await DataService.listActivedClients({ cm: value.label })
        const listActClient = request.map((item) => {
            return { label: item.id, cnumb: item.data().cnumb }
        });
        setDataForm(dataForm => ({ ...dataForm, [id]: value.label, ['pNumber']: value.pNumber, ['sCode']: value.sCode }));
        setactClinet(listActClient);
    };
    function handleChangeNameClient(id, event, value) {
        setDataForm(dataForm => ({ ...dataForm, [id]: value.label, ['cnumb']: value.cnumb }));
    }
    function handleChangeTime(value) {
        setDataForm(dataForm => ({ ...dataForm, ["fecha"]: `${value.$D}-${value.$M + 1}-${value.$y}` }));
    }
    const handleForm = (event) => {
        let key = event.target.id;
        setDataForm({ ...dataForm, [key]: event.target.value, });
    };
    const submitForm = async () => {
        const descriptionSplit = dataForm.description.split("/").map((item) => item.trim());
        const descriptionObject = Object.assign({}, descriptionSplit);
        await DataService.createBilling({ data: { ...dataForm, ['description']: descriptionObject, ['min']: duration(), ['units']: countUnits(), ['status']: 'open' } });
        setDataForm({ ...dataForm, ...formInitialData });
    };

    return (
        <SoftBox display='flex' flexDirection='column' py={2} px={2} >
            <SoftBox ml={1}>
                <SoftTypography variant="h6" sx={{ fontWeight: '300', fontFamily: "Amethysta" }}>{headTitle}</SoftTypography>
            </SoftBox>
            <SoftBox display="flex" alignItems="center" mt={2} flexWrap='wrap'>
                <SoftBox mr={2}>
                    <SelectInput data={listCM} onchange={handleChangeCmName} parse hText="Choice CM Name" ref={ref1} id='cm' />
                </SoftBox>
                <SoftBox mr={2}>
                    <SelectInput data={actClinet} sxx={{ width: 230 }} onchange={handleChangeNameClient} hText="Type Name Client" ref={ref} id='cn' />
                </SoftBox>
                <SoftBox mr={2}>
                    <DateTimePicker func={handleChangeTime} value={dataForm.fecha} />
                </SoftBox>
                <SoftBox mr={2}>
                    <TextField id="pos" sx={{ width: 60 }} helperText="Pos" onChange={handleForm}
                        value={dataForm.pos} />
                </SoftBox>
                <SoftBox ml={3} display='flex' flexDirection='column' justifyContent="center" alignItems="center" >
                    <SoftTypography variant="h6" sx={{ fontWeight: '300', fontFamily: "Amethysta", fontSize: '1.4rem' }}>{0}</SoftTypography>
                    <p style={{ fontSize: '0.7rem' }}>doc</p>
                </SoftBox>
                <SoftBox ml={3} display='flex' flexDirection='column' justifyContent="center" alignItems="center">
                    <SoftTypography variant="h6" sx={{ fontWeight: '300', fontFamily: "Amethysta", fontSize: '1.4rem' }}>{duration({ tEnd: dataForm.timeEnd, tStart: dataForm.timeStart })}</SoftTypography>
                    <p style={{ fontSize: '0.7rem' }}>min</p>
                </SoftBox>
                <SoftBox ml={3} display='flex' flexDirection='column' justifyContent="center" alignItems="center">
                    <SoftTypography variant="h6" sx={{ fontWeight: '300', fontFamily: "Amethysta", fontSize: '1.4rem' }}>{countUnits({ tEnd: dataForm.timeEnd, tStart: dataForm.timeStart })}</SoftTypography>
                    <p style={{ fontSize: '0.7rem' }}>units</p>
                </SoftBox>
            </SoftBox>
            <SoftBox  >
                <SoftBox display="flex" alignItems="center" mt={2}>
                    <SoftBox mr={2}>
                        <TextField id="description" sx={{ width: 455 }} helperText="Service Description" onChange={handleForm}
                            value={dataForm.description} />
                    </SoftBox>
                    <SoftBox mr={2}>
                        <TextField id="timeStart" sx={{ width: 80 }} placeholder="_:__" helperText="Start" onChange={handleForm}
                            value={dataForm.timeStart} />
                    </SoftBox>
                    <SoftBox mr={2}>
                        <TextField id="timeEnd" sx={{ width: 80 }} placeholder="_:__" helperText="End" onChange={handleForm}
                            value={dataForm.timeEnd} />
                    </SoftBox>
                </SoftBox>
            </SoftBox>

            <SoftBox mr={2} ml={2} mb={3} mt={3} display="flex" justifyContent="space-between" >
                <Button variant="gradient" color={"dark"} onClick={submitForm}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Add Service
                </Button>
            </SoftBox>
        </SoftBox>
    );
}


FormAddBilling.propTypes = {
    headTitle: PropTypes.string,
};

export default FormAddBilling;