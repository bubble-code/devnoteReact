import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useSearchHelperNotes } from '../../../../service/fetchHoo'
import { PropTypes } from 'prop-types';
import { CircularProgress } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import TableRender from "./TableSearcRender";

function LoadSearch({ value }) {
    const dispatch = useDispatch();
    const { data, loading, error } = useSearchHelperNotes(value);
    useEffect(() => {
        // console.log(value);
        dispatch({ type: 'success', payload: data });
    }, [data, dispatch, value]);

    return (
        <SoftBox
            sx={{
                minHeight: 250, width: 'auto', height: 'auto', overflow: 'auto',
                "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                            `${borderWidth[1]} solid ${borderColor}`
                    },
                },
                ".MuiBox-root": {
                    " & span": {
                        width: "inherit",
                        textAlign: 'justify',
                    }
                }
            }}
        >
            <SoftTypography>{value}</SoftTypography>
            {loading && <CircularProgress />}
            {error && <SoftTypography>{error.message}</SoftTypography>}
            {data && < TableRender />}
        </SoftBox>
    );
}

export default LoadSearch;

LoadSearch.propTypes = {
    value: PropTypes.string,
}