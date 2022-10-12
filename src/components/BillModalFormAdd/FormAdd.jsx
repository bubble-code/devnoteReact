import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import moment from "moment/moment";
import { updateNotes } from "../../redux/actions/actions";
import { countUnits, duration } from '../../funcTime/funt';
import { useSaveNote, useListServices } from "../../service/fetchHoo";


// Components
import { TextField, Divider } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import AutoCompleDescripService from "../AutoCompleDescripService/AutoCompleDescripService";
import SelectInput from "../SelectInput";


export default function FormAdd({ handleClose, data }) {
    const dispatchRedux = useDispatch();
    const { description = {} } = data;
    const [formValues, setFormValues] = useState({ ...data, description: Object.values(description).map((desc) => ({ label: desc })) });
    const ListClientsByCm = useSelector((state) => state.listClientsByCM);
    const { listClients } = ListClientsByCm;
    const { listServices } = useListServices();
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
    const handleSubmit = (event) => {
        event.preventDefault();
        const description = { ...formValues.description.map((item) => item.label) };
        dispatchRedux(updateNotes({ value: { ...formValues, description: description, ['min']: durationTime, ['units']: countUnitsTime } }))
        handleClose();
    }

    return (
        <form onSubmit={handleSubmit}>
            <SoftBox display='flex'>
                <SoftBox width='50%' mr={1}>
                    <TextField
                        name="cm"
                        type="text"
                        value={formValues.cm}
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
                        type="date"
                        value={moment(formValues.fecha, "DD/MM/YYYY").format("YYYY-MM-DD")}
                        onChange={handleChangeDate}
                        helperText="Fecha"

                    />
                </SoftBox>
                <SoftBox width='100%' sx={{ flexShrink: 5 }} mr={0} >
                    <TextField
                        name="timeStart"
                        type="time"
                        value={moment(formValues.timeStart, "HH:mm").format("HH:mm")}
                        onChange={handleInputChange}
                        helperText="Start Time"
                    />
                </SoftBox>
                <SoftBox width='100%' sx={{ flexShrink: 5 }} mr={0} >
                    <TextField
                        name="timeEnd"
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