import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { PropTypes } from 'prop-types';


export default function DateTimePicker({ func }) {

    const [value, setValue] = React.useState(dayjs());

    const handleChange = (newValue) => {
        func(newValue);
        setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <DesktopDatePicker
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} helperText="Date of Service" />}
                />
            </Stack>
        </LocalizationProvider>
    );
}


DateTimePicker.propTypes = {
    func: PropTypes.func.isRequired,
};