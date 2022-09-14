/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import SoftBox from "components/SoftBox";
import Table from "../../../../examples/Tables/Table";
import PropTypes from "prop-types";
// bilingData
import DataService from "../../../../service/services";
import { useSoftUIController, setListBilling, setCurrentClToNote } from "../../../../context/index";
// import SelectInput from "../../components/SelectInput";

// Data
// import billiTable from "layouts/tables/data/billingTable";
import { column } from './colomn'
import SoftTypography from "components/SoftTypography";
// import { TagClientName, Pos } from './TagClientName'

function TableHistory() {
    const [billingData, setBillingData] = useState([]);
    const [controler, dispatch] = useSoftUIController();
    const { currentClToNote } = controler;
    const rows = [
    ]
    const loadBillingData = async ({ context }) => {
        const res = await DataService.listNoteByClient({ cm: context.cm, name: context.cn });
        res.forEach((item) => {
            console.log(item.data());
            rows.push({
                description: (
                    <SoftBox bgColor='grey-400' borderRadius='md' px={2} display='flex' justifyContent='space-between' sx={{ width: '550px' }} >
                        <SoftTypography variant="h6" color='black'>{item.data().fecha}</SoftTypography>
                        <SoftTypography variant="h6" color='black'>{Object.values(item.data().description).join(' / ')}</SoftTypography>
                    </SoftBox>
                ),
            });
            rows.push({
                description: (
                    <SoftBox container>
                        <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth' >
                            {item.data().sNote}
                        </SoftTypography>
                    </SoftBox>
                ),
            });
        });
        setBillingData(rows);
    };
    useEffect(() => {
        loadBillingData({ context: currentClToNote });
    }, [currentClToNote]);

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
                        <Table columns={column} rows={billingData} />
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

