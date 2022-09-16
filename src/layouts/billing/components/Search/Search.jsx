import React, { useEffect, useState } from "react";
import { useSearchHelperNotes } from '../../../../service/fetchHoo'

import SoftInput from "components/SoftInput";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { CircularProgress } from "@mui/material";


function SearchHelperNotes() {
    const [criteria, setCriteria] = useState('');
    const { setValue, data, loading, error } = useSearchHelperNotes();

    useEffect(() => {
        if (criteria.length > 4) {
            setValue(criteria);
        }
    }, [criteria, setValue]);
    return (
        <SoftBox>
            <SoftInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
                onChange={(e) => setCriteria(e.target.value)}
                value={criteria}
            />
            <SoftBox>
                <SoftTypography>{criteria}</SoftTypography>
                {loading && <CircularProgress />}
            </SoftBox>
        </SoftBox>
    )
}

export default SearchHelperNotes