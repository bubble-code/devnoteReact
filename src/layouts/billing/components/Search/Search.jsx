import React, { useState } from "react";
import SoftInput from "components/SoftInput";
import SoftBox from "components/SoftBox";
import LoadSearch from "./LoadSearch";


function SearchHelperNotes() {
    const [criteria, setCriteria] = useState('');
    return (
        <SoftBox>
            <SoftInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
                onChange={(e) => setCriteria(e.target.value)}
                value={criteria}
            />
            <LoadSearch value={criteria} />
        </SoftBox>
    )
}

export default SearchHelperNotes