import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useSearchHelperNotes } from '../../../../service/fetchHoo'
import { PropTypes } from 'prop-types';
import { CircularProgress } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import TableRender from "./TableSearcRender";

function LoadSearch({ value }) {
    const { data, loading, error } = useSearchHelperNotes(value);
    return (
        <SoftBox
            sx={{
                minHeight: 250, width: '100%', height: 'auto', overflow: 'auto',
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
            <SoftBox style={{ minHeight: '50px' }}>{loading && <CircularProgress />}</SoftBox>
            {error && <SoftTypography>{error.message}</SoftTypography>}
            {data && < TableRender respData={data} />}
        </SoftBox>
    );
}

export default LoadSearch;

LoadSearch.propTypes = {
    value: PropTypes.string,
}