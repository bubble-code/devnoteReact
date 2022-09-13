/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import Table from "../../examples/Tables/Table";
import PropTypes from "prop-types";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import SoftBadge from "components/SoftBadge";
// bilingData
import DataService from "../../service/services";
import { useSoftUIController, setListBilling, setCurrentClToNote } from "../../context";
import SelectInput from "../../components/SelectInput";

// Data
import billiTable from "layouts/tables/data/billingTable";
import { columns } from "./colunmHead";
import { TagClientName, Pos } from './TagClientName'
import { async } from "@firebase/util";

function TableBillingService({ py, mb, headTitle }) {
    const [billingData, setBillingData] = useState([]);
    const [controler, dispatch] = useSoftUIController();
    const { listCM, listBilling } = controler;
    const ref1 = React.useRef();

    const loadBillingData = async (id, event, value) => {
        const cM = value.label;
        const response = await DataService.listBillingOpenByCm({ cm: value.label });
        setListBilling(dispatch, { [cM]: response });
        const rows = listBilling[cM]?.map((item) => {
            const data = item.data();
            const row = {
                key: item.id,
                ClientName: <TagClientName name={data.cn} email=" " shapeColor={data.status === 'completed' ? 'green' : '#80808047'} />,
                Pos: <Pos job={data.pos} org="" />,
                ServiceDescription: (
                    <SoftBadge variant="contained" badgeContent={Object.values(data.description).join('/')} color="secondary" size="sm" container />
                ),
                StartTime: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'>
                        {data.timeStart}
                    </SoftTypography>
                ),
                EndTime: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'>
                        {data.timeEnd}
                    </SoftTypography>
                ),
                Units: (
                    <SoftBadge variant="gradient" badgeContent={data.units} color="light" size="xl" container />
                ),
                Min: (
                    <SoftBadge variant="gradient" badgeContent={data.min} color="success" size="xs" container />
                ),
                CM: cM,
            }
            return row;
        });

        setBillingData([...rows]);

    };

    async function setCurrentClForNote({ id, cmm }) {
        const res = await DataService.getServiceById({ cm: cmm, id: id });
        setCurrentClToNote(dispatch, res);
    }

    const { rows } = billiTable;
    return (
        <SoftBox py={py}>
            <SoftBox mb={mb}>
                <Card sx={{ minHeight: 250 }}>
                    <SoftBox display="flex" justifyContent="start" alignItems="center" p={3}>
                        <SoftTypography variant="h6" mr={5}>{headTitle} </SoftTypography>
                        <SelectInput data={listCM} onchange={loadBillingData} parse hText="Choice CM Name" ref={ref1} id='cm' />
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
                        <Table columns={columns} rows={billingData} onClientClick={setCurrentClForNote} />
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

