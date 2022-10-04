import React from "react";
import PropTypes from "prop-types";

// Components
import SoftBox from "components/SoftBox";
import SelectInput from "../SelectInput";
import { Autocomplete, TextField } from "@mui/material";


function AutoCompleDescripService({ listServices, handleChangeAutoCompleted, hText, width, id = "description", ...rest }, ref) {
    const handleChange = (event, newValue) => {
        handleChangeAutoCompleted(id, event, newValue);
    };
    return (
        <SoftBox mr={2} sx={{
            width: { width },
            "& .MuiInputBase-root": {
                maxHeight: 'none !important',
                justifyContent: 'start !important',
                // flexWrap: 'nowrap !important',
            },
        }}  >
            <Autocomplete
                // ref={ref}
                disablePortal
                id={id}
                options={listServices}
                sx={{ width: width }}
                renderInput={(params) => <TextField {...params} helperText={hText} />}
                onChange={handleChange}
                // value={currentCM}
                getOptionLabel={(option) => option.label}
                color='#000000'
                style={{ color: '#000000' }}
                // defaultValue={[]}
                multiple
                {...rest}
                isOptionEqualToValue={(option, value) => option.label === value.label}
            />
        </SoftBox>
    );
}

export default AutoCompleDescripService;

AutoCompleDescripService.propTypes = {
    listServices: PropTypes.array,
    handleChangeAutoCompleted: PropTypes.func,
    currentValue: PropTypes.string,
    hText: PropTypes.string,
    width: PropTypes.number,
    id: PropTypes.string,
};