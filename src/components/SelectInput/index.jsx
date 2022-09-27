/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { forwardRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Box, Autocomplete, TextField } from "@mui/material";



const SelectInput = forwardRef(({ data, sxx = { width: 250 }, onchange, parse, hText, id, currentCM, ...rest }, ref) => {
    const handleChange = (event, newValue) => {
        onchange(id, event, newValue);
    };

    return (
        <Autocomplete
            ref={ref}
            disablePortal
            id={id}
            options={data}
            sx={sxx}
            renderInput={(params) => <TextField {...params} helperText={hText} />}
            onChange={handleChange}
            value={currentCM}
            color='#000000'
            style={{ color: '#000000' }}
            // defaultValue={[]}
            {...rest}
        />
    );
});

// Setting default values for the props of SoftInput
// SelectInput.defaultProps = {
//     size: "medium",
//     icon: {
//         component: false,
//         direction: "none",
//     },
//     error: false,
//     success: false,
//     disabled: false,
// };

// Typechecking props for the SoftInput
// SelectInput.propTypes = {
//     size: PropTypes.oneOf(["small", "medium", "large"]),
//     icon: PropTypes.shape({
//         component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
//         direction: PropTypes.oneOf(["none", "left", "right"]),
//     }),
//     error: PropTypes.bool,
//     success: PropTypes.bool,
//     disabled: PropTypes.bool,
// };

SelectInput.propTypes = {
    data: PropTypes.object,
    sxx: PropTypes.object,
    onchange: PropTypes.func,
    parse: PropTypes.bool,
    hText: PropTypes.string,
    id: PropTypes.string,
};
export default SelectInput;
