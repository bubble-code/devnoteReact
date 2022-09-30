import React, { useState, useRef, useEffect } from 'react';
import { initialValClients } from '../initialValues';
import { useAddDxCode } from '../../../service/fetchHoo';

// Components
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import { TextField, Divider } from '@mui/material';
// Styles
import { stylesCard } from '../styles';

function ClientAdmin() {
    const [formValues, setFormValues] = useState(initialValClients());
    const { loading, error, addDxCode } = useAddDxCode();

    function handleSubmit(e) {
        e.preventDefault();
        addDxCode({ dxCode: formValues });
        setFormValues(initialValClients());
    }
    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormValues(Object.assign({}, formValues, { [name]: value }));
    }

    return (
        <SoftBox sx={stylesCard()}>
            <form onSubmit={handleSubmit} style={{width:'100%'}}>
                <SoftBox display='flex' flexDirection='column'   >
                    <SoftBox mt={4} >
                        <TextField
                            sx={{ width: '100%' }}
                            name="dxCode"
                            // label="Name"
                            type="text"
                            value={formValues.dxCode}
                            onChange={handleInputChange}
                            helperText="Dx Code"
                            autoFocus
                        />
                    </SoftBox>
                    <SoftBox mt={4}>
                        <TextField
                            name="dxDesx"
                            sx={{ width: '100%' }}
                            // label="Last Name"
                            type="text"
                            value={formValues.dxDesx}
                            onChange={handleInputChange}
                            helperText="Description Dx Code"
                        />
                    </SoftBox>
                    <SoftBox display='flex' mt={4} justifyContent='end' >
                        <SoftButton onClick={() => { }} variant="contained" color="primary" type="submit">
                            Save
                        </SoftButton>
                    </SoftBox>
                </SoftBox>
            </form>
        </SoftBox>
    )
}
export default ClientAdmin