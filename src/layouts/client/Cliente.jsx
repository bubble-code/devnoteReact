import React from 'react';

// Components
import SoftBox from 'components/SoftBox';
import HeadBotons from './component/HeadBotons';
import AssignedToBar from './component/AssignedToBar';

function ClientContainer() {
    return (
        <SoftBox mb={3} mt={3}>
            <HeadBotons />
            <AssignedToBar />
        </SoftBox>
    )
}

export default ClientContainer