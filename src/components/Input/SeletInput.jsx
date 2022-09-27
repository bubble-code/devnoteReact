import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
// Material UI
import Select from '@mui/material/Select';
import { MenuItem } from "@mui/material";
import './style.css';


function BoSeletInput({ list }) {
    return (
        <div id="esta">
            <Select id={'men'} sx={{
                width: '180px !important'
            }} >{list.map((val, inde) => <MenuItem value={inde} key={uuidv4()}>{val}</MenuItem>)}
            </Select>
        </div>
    );
};

export default BoSeletInput;

BoSeletInput.propTypes = {
    list: PropTypes.array
}

