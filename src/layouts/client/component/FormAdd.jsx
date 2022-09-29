import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";



// Components
import { Grid, TextField, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Select, MenuItem, Slider, Button, Divider } from "@mui/material";
import SelectInput from '../../../components/SelectInput'
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";





export default function FormAdd({ handleClose, submit, setValue, values }) {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValue(Object.assign({}, values, { [name]: value }))
    };
    return (
        <form onSubmit={submit}>
            <SoftBox display='flex'>
                <SoftBox width='50%' mr={1}>
                    <TextField
                        name="name"
                        // label="Name"
                        type="text"
                        value={values.name}
                        onChange={handleInputChange}
                        helperText="Firts Name"
                    />
                </SoftBox>
                <SoftBox width='50%' mr={1}>
                    <TextField
                        name="lastName"
                        // label="Last Name"
                        type="text"
                        value={values.lastName}
                        onChange={handleInputChange}
                        helperText="Last Name"
                    />
                </SoftBox>
                <SoftBox width='50%' mr={1}>
                    <TextField
                        name="cnumb"
                        // label="Client Number"
                        type="text"
                        value={values.cnumb}
                        onChange={handleInputChange}
                        helperText="Client Number"
                    />
                </SoftBox>
            </SoftBox>
            <SoftBox display='flex' mt={2} sx={{ width: '100%' }} justifyContent='space-between'>
                <SoftBox width='50%' mr={1} sx={{ flexShrink: 5 }}>
                    <TextField
                        name="dob"
                        // label="Age"
                        type="date"
                        value={values.dob}
                        onChange={handleInputChange}
                        helperText="Enter DOB"
                        format="MM/dd/yyyy"

                    />
                </SoftBox>
                <SoftBox width='50%' mr={1} sx={{ flexShrink: 1 }}>
                    <SelectInput hText="DxCode" data={[]} sxx={{ width: '100%' }} />
                </SoftBox>
                <SoftBox width='100%' sx={{ flexShrink: 5 }} mr={0} >
                    <TextField
                        name="dataAssigned"
                        // label="Age"
                        type="date"
                        value={values.dataAssigned}
                        onChange={handleInputChange}
                        helperText="Data Assigned"
                    />
                </SoftBox>
            </SoftBox>
            <SoftBox display='flex' mt={2} ml={1} sx={{ width: '100%' }} justifyContent='space-between'>
                <FormControl>
                    <SoftTypography variant='caption'>Gender</SoftTypography>
                    <RadioGroup
                        name="gender"
                        value={values.gender}
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
            <Divider color='grey' />
            <SoftBox display='flex' mt={2} justifyContent='end' >
                <SoftButton autoFocus onClick={handleClose} >
                    Cancel
                </SoftButton>

                <SoftButton onClick={handleClose} variant="contained" color="primary" type="submit">
                    Save
                </SoftButton>
            </SoftBox>
        </form>
    )
}


FormAdd.propTypes = {
    handleClose: PropTypes.func,
    submit: PropTypes.func,
    setValue: PropTypes.func,
    values: PropTypes.object,
    reff: PropTypes.object
};