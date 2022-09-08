/* eslint-disable react/jsx-filename-extension */
import React, { forwardRef } from "react";

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
    return data.map((item) => {
        for (const key in item) {
            // console.log(item[key]);
            return { label: key };
        }
    });
}

const SelectInput = ({ data, sxx = { width: 250 } }) => {
    const dataParsed = parseData(data);
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dataParsed}
            sx={sxx}
            renderInput={(params) => <TextField {...params} helperText="Choice CM Name" />}
        />
    );
};

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
};
export default SelectInput;
