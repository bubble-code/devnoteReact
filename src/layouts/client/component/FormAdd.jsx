import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";



// Components
import { Grid, TextField, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Select, MenuItem, Slider, Button } from "@mui/material";
import SelectInput from "@mui/material/Select/SelectInput";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";





export default function FormAdd({ handleClose, submit, setValue, values }) {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValue(Object.assign({}, values, { [name]: value }))
    }
    const handleSliderChange = (name) => (e, value) => {
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
                        name="clientNumber"
                        // label="Client Number"
                        type="text"
                        value={values.clientNumber}
                        onChange={handleInputChange}
                        helperText="Client Number"
                    />
                </SoftBox>
            </SoftBox>
            <SoftBox display='flex' mt={2}>
                <SoftBox width='50%'>
                    <TextField
                        name="dob"
                        // label="Age"
                        type="date"
                        value={values.dob}
                        onChange={handleInputChange}
                        helperText="Enter DOB"
                    />
                </SoftBox>
                <SoftBox width='50%'>
                    <TextField
                        name="dataAssigned"
                        // label="Age"
                        type="date"
                        value={values.dataAssigned}
                        onChange={handleInputChange}
                        helperText="Data Assigned"
                    />
                    <SoftBox>
                        <Select
                            labelId="demo-simple-select-label"
                            value={values.dxCode}
                            label="Age"
                            name="dxCode"
                            onChange={handleInputChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </SoftBox>
                </SoftBox>
            </SoftBox>
            <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                    name="gender"
                    value={values.gender}
                    onChange={handleInputChange}
                    row
                >
                    <FormControlLabel
                        key="male"
                        value="male"
                        control={<Radio size="small" />}
                        label="Male"
                    />
                    <FormControlLabel
                        key="female"
                        value="female"
                        control={<Radio size="small" />}
                        label="Female"
                    />
                    <FormControlLabel
                        key="other"
                        value="other"
                        control={<Radio size="small" />}
                        label="Other"
                    />
                </RadioGroup>
            </FormControl>
            {/* <FormControl>
                <Select name="os" value={values.os} onChange={handleInputChange}>
                    <MenuItem key="mac" value="mac">Mac</MenuItem>
                    <MenuItem key="windows" value="windows">Windows</MenuItem>
                    <MenuItem key="linux" value="linux">Linux</MenuItem>
                </Select>
    </FormControl>
            <div style={{ width: "400px" }}>
                Favorite Number
                <Slider
                    value={values.favoriteNumber}
                    onChange={handleSliderChange("favoriteNumber")}
                    defaultValue={1}
                    step={1}
                    min={1}
                    max={3}
                    marks={[
                        {
                            value: 1,
                            label: "1",
                        },
                        {
                            value: 2,
                            label: "2",
                        },
                        {
                            value: 3,
                            label: "3",
                        },
                    ]}
                    valueLabelDisplay="off"
                />
            </div>*/}
            <SoftBox display='flex' flexDirection='column'>
                <SoftTypography key={'001'} id="ll">{values.name}</SoftTypography>
                <SoftTypography key={'002'} id={'mm'}>{values.age}</SoftTypography>
            </SoftBox>
            <SoftButton autoFocus onClick={handleClose} >
                Cancel
            </SoftButton>

            <SoftButton onClick={handleClose} variant="contained" color="primary" type="submit">
                Save
            </SoftButton>
        </form>
    )
}


FormAdd.propTypes = {
    handleClose: PropTypes.func,
    submit: PropTypes.func,
    setValue: PropTypes.func,
    values: PropTypes.object
};