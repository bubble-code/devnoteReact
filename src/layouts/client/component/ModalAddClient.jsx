import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import FormAdd from './FormAdd';
import SoftBox from 'components/SoftBox';


const defaultValues = {
    name: "",
    lastName: "",
    age: 0,
    os: "",
    gender: '',
    favoriteNumber: 0,
};

export default function ModalAddClient({ open, handleClose }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [formValues, setFormValues] = useState(defaultValues);
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        handleClose();
    };

    return (
        <SoftBox sx={{ height: '1200px' }}>
            <Dialog
                fullScreen={fullScreen}
                open={open}
            // onClose={handleClose}
            // aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle >
                    {"Add New Client?"}
                </DialogTitle>
                <DialogContent>
                    <FormAdd handleClose={handleClose} submit={handleSubmit} values={formValues} setValue={setFormValues} />
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </SoftBox>
    );
}

ModalAddClient.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
};