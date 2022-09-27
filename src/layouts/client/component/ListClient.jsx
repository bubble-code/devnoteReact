import React from "react";
import PropTypes from "prop-types";

// Component
import { Card } from "@mui/material";
import SelectInput from "components/SelectInput";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import AcordeonRender from "./AcordeonRender";

function ListClient({ datas, ...rest }) {
    return (
        <SoftBox borderRadius='md'>
            <SoftBox >
                <SoftBox sx={{
                    "& .MuiTableRow-root:not(:last-child)": {
                        "& td": {
                            borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                `${borderWidth[1]} solid ${borderColor}`,
                        },
                    },
                }}
                >
                    {/*        */}
                    <AcordeonRender data={datas} />
                </SoftBox>
            </SoftBox>
        </SoftBox>
    )
}

export default ListClient

ListClient.propTypes = {
    datas: PropTypes.array,
};