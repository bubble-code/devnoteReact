/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useCallback } from "react";
import Card from '@mui/material/Card';
import SoftBox from "components/SoftBox";
import TableRender from "./TableRender";
// bilingData
// Data
// import billiTable from "layouts/tables/data/billingTable";
import SoftTypography from "components/SoftTypography";
// import { TagClientName, Pos } from './TagClientName'

function TableHistory() {

    return (
        <SoftBox >
            <SoftBox >
                <Card sx={{ minHeight: 250 }}>
                    <SoftBox
                        sx={{
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
                        <TableRender />
                    </SoftBox>
                </Card>
            </SoftBox>
        </SoftBox>
    );
}
// TableHistory.propTypes = {
//     py: PropTypes.number,
//     mb: PropTypes.number,
//     columns: PropTypes.array,
//     rows: PropTypes.array,
//     headTitle: PropTypes.string
// };

export default TableHistory;

