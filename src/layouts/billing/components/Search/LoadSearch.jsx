import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useSearchHelperNotes } from '../../../../service/fetchHoo'
import { PropTypes } from 'prop-types';
import { CircularProgress } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import TableSearch from "./TableSearch";

function LoadSearch({ value }) {
    const dispatch = useDispatch();
    const { data, loading, error } = useSearchHelperNotes(value);
    useEffect(() => {
        // console.log(value);
        dispatch({ type: 'success', payload: data });
    }, [data, dispatch, value]);

    return (
        <SoftBox>
            <SoftTypography>{value}</SoftTypography>
            {loading && <CircularProgress />}
            {error && <SoftTypography>{error.message}</SoftTypography>}
            {data && <TableSearch />}
        </SoftBox>
    );
}

export default LoadSearch;

LoadSearch.propTypes = {
    value: PropTypes.string,
}