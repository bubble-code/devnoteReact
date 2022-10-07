/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useCallback } from "react";
import Card from '@mui/material/Card';
import SoftBox from "components/SoftBox";
import TableRender, { HistoryTimeLineRender } from "./TableRender";
// bilingData
// Data
// import billiTable from "layouts/tables/data/billingTable";
import SoftTypography from "components/SoftTypography";
// import { TagClientName, Pos } from './TagClientName'

function ResnderResult() {
    return (
        <SoftBox
            sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                            `${borderWidth[1]} solid ${borderColor}`
                    },
                },
                ".MuiBox-root": {
                    lineHeight: 1,
                    " & span": {
                        width: "inherit",
                        textAlign: 'justify',
                    }
                }, minHeight: 250
            }}
            style={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}
        >
            {/*<HistoryTimeLineRender />*/}
            <TableRender />

        </SoftBox>
    );
}
// ResnderResult.propTypes = {
//     py: PropTypes.number,
//     mb: PropTypes.number,
//     columns: PropTypes.array,
//     rows: PropTypes.array,
//     headTitle: PropTypes.string
// };

export default ResnderResult;

