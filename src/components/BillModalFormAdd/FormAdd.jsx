import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import moment from "moment/moment";
import { countUnits, duration, formInitialData } from '../../funcTime/funt';


// Components
import { TextField, Divider } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import AutoCompleDescripService from "../AutoCompleDescripService/AutoCompleDescripService";
import SelectInput from "../SelectInput";



const defaultValues = {
    cn: '',
    name: "",
    lastName: "",
    cnumb: "",
    dob: "",
    dxCode: "",
    dataAssigned: "",
    gender: '',
    description: [],
};


export default function FormAdd({ id, listServices, handleClose, data, handleSubmit }) {
    const [formValues, setFormValues] = useState({ ...defaultValues });
    const ListClientsByCm = useSelector((state) => state.listClientsByCM);
    const { loading: loadingListClients, listClients } = ListClientsByCm;
    const refInput = React.createRef();

    const durationTime = duration({ tEnd: formValues.timeEnd, tStart: formValues.timeStart });
    const countUnitsTime = countUnits({ tEnd: formValues.timeEnd, tStart: formValues.timeStart });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(event.target);
        setFormValues(Object.assign({}, formValues, { [name]: value }))
    };
    function handleChangeDate(value) {
        setFormValues(formValues => ({ ...formValues, ["fecha"]: `${value.$D}-${value.$M + 1}-${value.$y}` }));
    }
    function handleChangeAutoCompleted(id, eve, value) {
        setFormValues(formValues => ({ ...formValues, [id]: value }));
    }

    function handleClientName(id, eve, value) {
        setFormValues(formValues => ({ ...formValues, [id]: value.label, cnumb: value.cnumb }));
    }
    const handleSubmitt = () => {
        event.preventDefault();
        const description = { ...formValues.description.map((item) => item.label) };
        handleSubmit({ ...formValues, description: description, ['min']: durationTime, ['units']: countUnitsTime, });
        handleClose();
    }


    useEffect(() => {
        if (data.description !== undefined) {
            let description = Object.keys(data.description).map((key) => ({ label: data.description[key] }));
            setFormValues(Object.assign({}, { ...data }, { description: description }));
        }
        return () => {
            setFormValues({ ...defaultValues });
        };
    }, [data])
    return (
        <form onSubmit={handleSubmitt}>
            <SoftBox display='flex'>
                <SoftBox width='50%' mr={1}>
                    <TextField
                        name="cm"
                        // label="Name"
                        type="text"
                        value={formValues.cm}
                        // onChange={handleInputChange}
                        helperText="Case Manager"
                        disabled
                    />
                </SoftBox>
                <SoftBox width='50%' mr={1}>
                    <SelectInput data={listClients} sxx={{ width: 220 }} onchange={handleClientName} hText="Name Client" id='cn' value={formValues.cn || null} ref={refInput} />
                </SoftBox>
                <SoftBox mr={1}>
                    <TextField sx={{ width: 120 }}
                        name="cnumb"
                        // label="Client Number"
                        type="text"
                        value={formValues.cnumb}
                        onChange={handleInputChange}
                        helperText="Client Number"
                        disabled
                    />
                </SoftBox>
            </SoftBox>
            <SoftBox display='flex' mt={2} sx={{ width: '100%' }} justifyContent='space-between'>
                <SoftBox width='50%' mr={1} sx={{ flexShrink: 5 }}>
                    <TextField
                        name="fecha"
                        // label="Age"
                        type="date"
                        value={moment(formValues.fecha, "DD/MM/YYYY").format("YYYY-MM-DD")}
                        onChange={handleChangeDate}
                        // onBlur={handleInputChange}
                        helperText="Fecha"
                    // format="MM/dd/yyyy"

                    />
                </SoftBox>
                <SoftBox width='100%' sx={{ flexShrink: 5 }} mr={0} >
                    <TextField
                        name="timeStart"
                        // label="Age"
                        type="time"
                        value={moment(formValues.timeStart, "HH:mm").format("HH:mm")}
                        onChange={handleInputChange}
                        helperText="Start Time"
                    />
                </SoftBox>
                <SoftBox width='100%' sx={{ flexShrink: 5 }} mr={0} >
                    <TextField
                        name="timeEnd"
                        // label="Age"
                        type="time"
                        value={moment(formValues.timeEnd, "HH:mm").format("HH:mm")}
                        onChange={handleInputChange}
                        helperText="End Time"
                    />
                </SoftBox>
                <SoftBox width='100%' mr={0} >
                    <TextField
                        sx={{ width: '100px' }}
                        name="min"
                        // label="Age"
                        type="number"
                        value={durationTime}
                        onChange={handleInputChange}
                        helperText="Minutes"
                    />
                </SoftBox>
            </SoftBox>
            <SoftBox display='flex' mt={2} ml={1} sx={{ width: '100%' }} justifyContent='space-between'>
                <SoftBox width='100%' mr={0} >
                    <TextField
                        sx={{ width: '100px' }}
                        name="pos"
                        // label="Age"
                        type="number"
                        value={formValues.pos}
                        onChange={handleInputChange}
                        helperText="Pos"
                    />
                </SoftBox>
                <AutoCompleDescripService handleChangeAutoCompleted={handleChangeAutoCompleted} listServices={listServices} hText="Service Description" width={355} id='description'
                    value={formValues.description}
                />
            </SoftBox>
            <Divider color='grey' />
            <SoftBox display='flex' mt={2} justifyContent='end' >
                <SoftButton autoFocus onClick={handleClose} >
                    Cancel
                </SoftButton>

                <SoftButton variant="contained" color="primary" type="submit">
                    Save
                </SoftButton>
            </SoftBox>
        </form>
    )
}


FormAdd.propTypes = {
    id: PropTypes.string,
    cm: PropTypes.string,
    handleClose: PropTypes.func,
    data: PropTypes.object,
    listServices: PropTypes.array,
    handleSubmit: PropTypes.func,
};