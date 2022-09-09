/* eslint-disable react/jsx-filename-extension */
import React, { forwardRef, useEffect, useRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for SoftInput
import { Box, Autocomplete, TextField } from "@mui/material";


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: 'The Shawshank Redemption' },
    { label: 'The Godfather' },
    { label: 'The Godfather: Part II' },

];

const parseData = (data) => {
    // console.log("data", data);
    return data.map((item) => {
        for (const key in item) {
            return { label: key };
        }
    });
}

const SelectInput = forwardRef(({ data, sxx = { width: 250 }, onchange, parse, hText, id }, ref) => {
    const dataParsed = parse ? parseData(data) : data;
    // console.log(ref);
    const [value, setValue] = React.useState({ label: '' });
    const handleChange = (event, newValue) => {
        setValue(newValue);
        onchange(id, event, newValue);
    }
    useEffect(() => {
        setValue('');
    }, [data]);
    // const [value, setValue] = React.useState(null);    
    return (
        <Autocomplete
            ref={ref}
            disablePortal
            id={id}
            options={dataParsed}
            sx={sxx}
            renderInput={(params) => <TextField {...params} helperText={hText} />}
            onChange={handleChange}
            value={value}
        // defaultValue={[]}
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
    data: PropTypes.array,
    sxx: PropTypes.object,
    onchange: PropTypes.func,
    parse: PropTypes.bool,
    hText: PropTypes.string,
    id: PropTypes.string,
};
export default SelectInput;
