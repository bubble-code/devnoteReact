/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import Table from "examples/Tables/Table";
import PropTypes from "prop-types";
// bilingData
import DataService from "../../service/services";

// Data
import billiTable from "layouts/tables/data/billingTable";
import { columns } from "./colunmHead";

function TableBillingService({ py, mb, headTitle }) {
    const caseManagement = "Raulito";
    const [billingData, setBillingData] = useState([]);
    const loadBillingData = async () => {
        const response = await DataService.listBilling({ cm: caseManagement });
        setBillingData(response.length);

        // console.log(response.values.length);
    };

    useEffect(() => {
        loadBillingData();
    }, []);
    const { rows } = billiTable;
    return (
        <SoftBox py={py}>
            <SoftBox mb={mb}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Billing Service {billingData} {caseManagement}</SoftTypography>
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
TableBillingService.propTypes = {
    py: PropTypes.number,
    mb: PropTypes.number,
    columns: PropTypes.array,
    rows: PropTypes.array,
    headTitle: PropTypes.string
};

export default TableBillingService;

