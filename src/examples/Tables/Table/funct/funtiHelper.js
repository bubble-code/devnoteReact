/* eslint-disable react/jsx-filename-extension */
import SoftBox from "components/SoftBox";
import { columns } from "../../../../components/TableBillingService/colunmHead";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import { TagClientName } from "components/TableBillingService/TagClientName";
import { Pos } from "components/TableBillingService/TagClientName";
import SoftBadge from "components/SoftBadge";
import SoftTypography from "components/SoftTypography";
import moment from "moment";



const { light } = colors;
const { size, fontWeightBold } = typography;
const { borderWidth } = borders;

export const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
        pl = 3;
        pr = 3;
    } else if (key === columns.length - 1) {
        pl = 3;
        pr = 3;
    } else {
        pl = 1;
        pr = 1;
    }

    return (
        <SoftBox
            key={name}
            component="th"
            width={width || "100%"}
            // pt={1.5}
            // pb={1.25}
            pl={align === "left" ? pl : 3}
            // pr={align === "right" ? pr : 3}
            textAlign={align}
            fontSize={size.xxs}
            fontWeight={fontWeightBold}
            color="secondary"
            opacity={1}
            borderBottom={`${borderWidth[1]} solid ${light.main}`}
        >
            {name.toUpperCase()}
        </SoftBox>
    );
});

function groupByDate(data) {
    return data.reduce((acc, cur) => {
        const id = cur.id;
        const { fecha } = cur.data();
        if (!acc[fecha]) {
            acc[fecha] = [];
        }
        acc[fecha].push({ id, ...cur.data() });
        return acc;
    }, {});
}

function sortByTime(data) {
    const objectSort = {};
    Object.keys(data).forEach((key) => {
        objectSort[key] = data[key].sort((a, b) => moment(a.timeStart, "HHmm").diff(moment(b.timeStart, "HHmm")));
    });
    return objectSort;

}


export default function renderByDate(data) {
    const group = groupByDate(data);
    const groupSort = sortByTime(group);
    const rows = [];
    Object.keys(groupSort).forEach((fecha) => {
        if (!rows[fecha]) {
            rows[fecha] = [];
        }
        // console.log('fecha', fecha);
        groupSort[fecha].map(servicio => {
            // console.log("servicio", servicio);
            const { id, pos, description, timeEnd, timeStart, units, min, cm, cn } = servicio;
            rows[fecha].push({
                key: id,
                ClientName: <TagClientName name={cn} id={id} opacity={1} />,
                Pos: <Pos job={pos} />,
                ServiceDescription: (
                    <SoftBadge variant="contained" badgeContent={Object.values(description).join(' / ')}
                        color="palettePastel" size="sm" container wordSpacing='0.1rem' />
                ),
                StartTime: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'>
                        {timeStart}
                    </SoftTypography>
                ),
                EndTime: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'>
                        {timeEnd}
                    </SoftTypography>
                ),
                Units: (
                    <SoftBadge variant="gradient" badgeContent={units} color="light" size="xl" container />
                ),
                Min: (
                    <SoftBadge variant="gradient" badgeContent={min} color="success" size="xs" container />
                ),
                CM: cm,
            });

        });
    });
    return rows;
}
