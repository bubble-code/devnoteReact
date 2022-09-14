/* eslint-disable react/jsx-filename-extension */
import React from "react";
import Card from '@mui/material/Card';
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import Table from "examples/Tables/Table";
import PropTypes from "prop-types";

// Data
import billiTable from "layouts/tables/data/billingTable";

function ViewTable({ py, mb, headTitle }) {
    const { columns, rows } = billiTable;
    return (
        <SoftBox py={py}>
            <SoftBox mb={mb}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">{headTitle}</SoftTypography>
                    </SoftBox>
                    <SoftBox
                        sx={{
                            "& .MuiTableRow-root:not(:last-child)": {
                                "& td": {
                                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                        `${borderWidth[1]} solid ${borderColor}`,
                                },
                            },
                        }}
                    >
                        <Table columns={columns} rows={rows} /> 
                    </SoftBox>
                </Card>
            </SoftBox>
        </SoftBox>
    );
}
ViewTable.propTypes = {
    py: PropTypes.number,
    mb: PropTypes.number,
    columns: PropTypes.array,
    rows: PropTypes.array,
    headTitle: PropTypes.string
};

export default ViewTable;

