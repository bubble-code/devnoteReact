import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { useAddClient } from '../../../service/fetchHoo';

// Components
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, Divider } from '@mui/material';
import FormAdd from './FormAdd';
import SoftBox from 'components/SoftBox';


const defaultValues = {
    name: "",
    lastName: "",
    cnumb: "",
    dob: "",
    dxCode: "",
    dataAssigned: "",
    gender: ''
};

export default function ModalAddClient({ open, handleClose }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [formValues, setFormValues] = useState(defaultValues);
    const { loading, error, addClient } = useAddClient();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        addClient({ cm: 'Lia', data: formValues });
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
                    <Divider color='grey' />
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