import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fectSearchHelper } from "../../redux/actions/actions";

// Component
import SoftInput from "components/SoftInput";
import SoftBox from "components/SoftBox";
import ResnderResult from "./ResnderResult";


function SearchHelperNotes() {
    const dispatchRedux = useDispatch();

    function handleSearch(query) {
        if (query.length > 2) {
            dispatchRedux(fectSearchHelper(query));
        }
    }
    return (
        <SoftBox >
            <SoftInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
                onChange={(e) => handleSearch(e.target.value)}
            // value={criteria}
            />
            <ResnderResult />
        </SoftBox>
    )
}

export default SearchHelperNotes