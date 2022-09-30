import { grey } from '@mui/material/colors';

export function stylesCard() {
    return {
        minHeight: 250, width: '20%', overflow: 'auto', border: `1px solid ${grey[400]}`, aligthItems: 'center', justifyContent: 'space-around', display: 'flex', paddingLeft: 1, paddingRight: 1, borderRadius: 1,
        // "& .MuiTableRow-root:not(:last-child)": {
        //     "& td": {
        //         borderBottom: ({ borders: { borderWidth, borderColor } }) =>
        //             `${borderWidth[1]} solid ${borderColor}`
        //     },
        // },
        "div.MuiInputBase-root:nth-child(1)": {
            padding: '0 1',
            width: '100% !important',
        },
        "div.MuiInputBase-root:nth-child(2)": {
            padding: '0 1',
            width: '100% !important',
        },
        ".MuiBox-root": {
            " & span": {
                width: "inherit",
                textAlign: 'justify',
            }
        },
        ".css-dukcob-MuiInputBase-root-MuiOutlinedInput-root": {
            width: "100% !important",
        },
        ".css-1thpukx": {
            height: 'auto',
            width: "100% !important",
        },
        "form": {
            width: "100% !important",
        },
        "input": {
            width: "100% !important",
        }
    }
}