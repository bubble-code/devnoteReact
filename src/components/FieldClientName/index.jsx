import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';
import SoftBox from 'components/SoftBox';

export default function InputClientName({ icon, textHelper }) {
    return (
        <SoftBox sx={{ '& > :not(style)': { m: 1 } }}>
            <FormControl variant="standard">
                {textHelper && <InputLabel htmlFor="input-with-icon-adornment">
                    {textHelper}
                </InputLabel>}
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={icon ? (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>) : null
                    }
                />
            </FormControl>

        </SoftBox>
    );
}

InputClientName.propTypes = {
    icon: PropTypes.bool,
    textHelper: PropTypes.string,
}