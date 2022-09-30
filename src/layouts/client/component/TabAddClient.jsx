import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { useAddClient } from '../../../service/fetchHoo';
import { useSelector } from 'react-redux';

// Components
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, Divider, TextField, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import FormAdd from './FormAdd';
import SoftBox from 'components/SoftBox';
import SelectInput from '../../../components/SelectInput';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';


const defaultValues = {
    name: "",
    lastName: "",
    cnumb: "",
    dob: "",
    dxCode: "",
    dataAssigned: "",
    gender: ''
};

export default function TabAddClient() {
    const theme = useTheme();
    const { listCMs } = useSelector(state => state.listCM);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [cm, setCm] = useState('');
    const [formValues, setFormValues] = useState(defaultValues);
    const { loading, error, addClient } = useAddClient();

    const handleSubmit = (event) => {
        event.preventDefault();
        addClient({ cm: cm, data: formValues });
        setFormValues(defaultValues);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues(Object.assign({}, formValues, { [name]: value }))
    };
    const handleChangeCM = (id, event, value) => {
        event === null ? setCm('') : setCm(event.label);
    };
    return (
        <SoftBox >
            <form onSubmit={handleSubmit}>
                <SoftBox display='flex' flexWrap='auto'>
                    <SoftBox mr={1}>
                        <SelectInput data={listCMs} sxx={{ width: 160, height: 30 }} onChange={handleChangeCM} value={cm} />
                    </SoftBox>
                    <SoftBox mr={1} >
                        <TextField
                            sx={{ width: '140px' }}
                            name="name"
                            // label="Name"
                            type="text"
                            value={formValues.name}
                            onChange={handleInputChange}
                            helperText="Firts Name"
                        />
                    </SoftBox>
                    <SoftBox mr={1}>
                        <TextField
                            name="lastName"
                            // label="Last Name"
                            type="text"
                            value={formValues.lastName}
                            onChange={handleInputChange}
                            helperText="Last Name"
                        />
                    </SoftBox>
                    <SoftBox mr={1}>
                        <TextField
                            sx={{ width: '130px' }}
                            name="cnumb"
                            // label="Client Number"
                            type="text"
                            value={formValues.cnumb}
                            onChange={handleInputChange}
                            helperText="Client Number"
                        />
                    </SoftBox>
                    <SoftBox mr={1} sx={{ flexShrink: 5 }}>
                        <TextField
                            name="dob"
                            // label="Age"
                            type="date"
                            value={formValues.dob}
                            onChange={handleInputChange}
                            helperText="Enter DOB"
                            format="MM/dd/yyyy"

                        />
                    </SoftBox>
                    <SoftBox mr={1} sx={{ flexShrink: 1 }}>
                        <SelectInput hText="DxCode" data={[]} sxx={{ width: '100%' }} />
                    </SoftBox>
                    <SoftBox sx={{ flexShrink: 5 }} mr={1} >
                        <TextField
                            name="dataAssigned"
                            // label="Age"
                            type="date"
                            value={formValues.dataAssigned}
                            onChange={handleInputChange}
                            helperText="Data Assigned"
                        />
                    </SoftBox>
                    <SoftBox display='flex' justifyContent='space-between'>
                        <FormControl>
                            <SoftTypography variant='caption'>Gender</SoftTypography>
                            <RadioGroup
                                name="gender"
                                value={formValues.gender}
                                onChange={handleInputChange}
                                row
                            >
                                <SoftBox display='flex' ml={1}>
                                    <FormControlLabel
                                        key="male"
                                        value="male"
                                        control={<Radio size="small" style={{ border: 'solid 1px grey' }} />}
                                        label=<SoftTypography variant='caption'>Male</SoftTypography>
                                    />
                                    <FormControlLabel
                                        key="female"
                                        value="female"
                                        control={<Radio size="small" style={{ border: 'solid 1px grey' }} />}
                                        label=<SoftTypography variant='caption'>Female</SoftTypography>
                                    />
                                </SoftBox>
                            </RadioGroup>
                        </FormControl>
                    </SoftBox>
                </SoftBox>
                <Divider color='grey' />
                <SoftBox display='flex' mt={2} justifyContent='end' >
                    <SoftButton autoFocus onClick={() => { }} >
                        Cancel
                    </SoftButton>

                    <SoftButton onClick={() => { }} variant="contained" color="primary" type="submit">
                        Save
                    </SoftButton>
                </SoftBox>
            </form>
        </SoftBox>
    );
}

TabAddClient.propTypes = {
    listCMs: PropTypes.array.isRequired
};