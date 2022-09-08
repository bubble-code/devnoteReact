/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import Table from "examples/Tables/Table";
import PropTypes from "prop-types";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import SoftBadge from "components/SoftBadge";
// bilingData
import DataService from "../../service/services";

// Data
import billiTable from "layouts/tables/data/billingTable";
import { columns } from "./colunmHead";
import { TagClientName, Pos } from './TagClientName'

function TableBillingService({ py, mb, headTitle }) {
    const caseManagement = "Raulito";
    const [billingData, setBillingData] = useState([]);

    const loadBillingData = async () => {
        const response = await DataService.listBilling({ cm: caseManagement });
        // console.log(response);
        const rows = response.map((item) => {
            const row = {
                ClientName: <TagClientName  name={item.Client_Name} email=" " />,
                Pos: <Pos job={item.pos} org="" />,
                ServiceDescription: (
                    <SoftBadge variant="contained" badgeContent={item.sd} color="secondary" size="sm" container />
                ),
                StartTime: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'>
                        {item.start}
                    </SoftTypography>
                ),
                EndTime: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'>
                        {item.end}
                    </SoftTypography>
                ),
                Units: (
                    <SoftBadge variant="gradient" badgeContent={item.u} color="light" size="xl" container />
                ),
                Min: (
                    <SoftBadge variant="gradient" badgeContent={item.min} color="success" size="xs" container />
                )
            }
            return row;
        });
        setBillingData([...rows]);

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
                        <SoftTypography variant="h6">Billing Service  {caseManagement}</SoftTypography>
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
                        <Table columns={columns} rows={billingData} />
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

