import React from 'react';
import { useSoftUIController, setOpenModalEditService } from 'context';

// Components
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import FormAdd from '../BillModalFormAdd/FormAdd';


export default function BillModalEditService() {
    const [controller, dispatch] = useSoftUIController();
    const { openModalEditService } = controller;
    const { open, service } = openModalEditService;

    const handleClose = () => {
        setOpenModalEditService(dispatch, { open: false, service: {}, });
    };

    return (
        <Dialog open={open} onClose={handleClose}            >
            <DialogTitle >
                {"Edit Service"}
                <Divider color='grey' />
            </DialogTitle>
            <DialogContent>
                <FormAdd id={service.id} cm={service.cm} handleClose={handleClose} data={service} />
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}
