import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useSoftUIController, setOpenModalEditService } from "context";
import { useGetServiceById } from '../../service/fetchHoo';
import { useListServices } from "../../service/fetchHoo";
import PropTypes from "prop-types";
import moment from "moment/moment";


// Components
import { Grid, TextField, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Select, MenuItem, Slider, Button, Divider } from "@mui/material";
// import SelectInput from '../../../components/SelectInput'
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import AutoCompleDescripService from "../AutoCompleDescripService/AutoCompleDescripService";
import SelectInput from "../SelectInput";



const defaultValues = {
    name: "",
    lastName: "",
    cnumb: "",
    dob: "",
    dxCode: "",
    dataAssigned: "",
    gender: '',
    description: [],
};


export default function FormAdd({ id, cm, handleClose, data }) {
    const [formValues, setFormValues] = useState({ ...defaultValues });
    const { listServices, error, loading } = useListServices();
    const ListClientsByCm = useSelector((state) => state.listClientsByCM);
    const { loading: loadingListClients, listClients } = ListClientsByCm;
    let fecha = moment(formValues.fecha, "DD/MM/YYYY").format("YYYY-MM-DD");
    // let description = [];
    const refInput = React.createRef();


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // console.log("dob", name, value);
        setFormValues(Object.assign({}, formValues, { [name]: value }))
    };
    function handleChangeAutoCompleted(id, __, value) {
        // const { value } = data;
        // const cnumb = listClients.find(client => client.id === formValues.cn).cnumb;
        // console.log(listClients);
        // console.log(cnumb);
        // console.log(formValues.cn);
        // console.log(value)
        setFormValues(formValues => ({ ...formValues, [id]: value.label, cnumb: value.cnumb }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // addClient({ cm: 'Lia', data: formValues });
        handleClose();
    }

    useEffect(() => {
        if (data) {
            setFormValues(data);
            // description = data.description.map((item) => item) 
        }
    }, [data])
    return (
        <form onSubmit={handleSubmit}>
            <SoftBox display='flex'>
                <SoftBox width='50%' mr={1}>
                    <TextField
                        name="cm"
                        // label="Name"
                        type="text"
                        value={formValues.cm}
                        onChange={handleInputChange}
                        helperText="Case Manager"
                        disabled
                    />
                </SoftBox>
                <SoftBox width='50%' mr={1}>
                    <SelectInput data={listClients} sxx={{ width: 220 }} onchange={handleChangeAutoCompleted} hText="Name Client" id='cn' currentCM={formValues.cn || null} ref={refInput} />
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
                        value={fecha}
                        onChange={handleInputChange}
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
                        value={formValues.min}
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
                <AutoCompleDescripService currentValue={formValues.description || []} handleChangeAutoCompleted={handleChangeAutoCompleted} listServices={listServices} hText="Service Description" width={355} />
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
    data: PropTypes.object
};