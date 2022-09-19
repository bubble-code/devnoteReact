/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { useSoftUIController } from "../../../../context/index";
import { useNotesByCliet } from '../../../../service/fetchHoo'
import moment from "moment";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './style.css'
import { CircularProgress } from "@mui/material";
// import PropTypes from "prop-types";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableRow from "@mui/material/TableRow";
// import MuiTable from "@mui/material/Table";
// import colors from "assets/theme/base/colors";
// import typography from "assets/theme/base/typography";
// import borders from "assets/theme/base/borders";
// import { v4 as uuidv4 } from "uuid";

// Soft UI Dashboard React components
// import { column } from './colomn'
// import { Chrono } from 'react-chrono';
// import { useEffect } from "react";
// ============================
// import Typography from '@mui/material/Typography';



function TableRender() {
    // const { light } = colors;
    // const { size, fontWeightBold } = typography;
    // const { borderWidth } = borders;
    // const [billingData, setBillingData] = useState([]);
    const [controler] = useSoftUIController();
    const { currentClToNote } = controler;
    const { cn, cm } = currentClToNote;
    const { data, loading, error } = useNotesByCliet({ cmm: cm, client: cn });

    let rows = [];
    const orderData = data.sort((a, b) => {
        // console.log('a, b', moment(a.data().fecha, "DD-MM-YYYY"), moment(b.data().fecha, "DD-MM-YYYY"));
        return moment(b.data().fecha, "DD-MM-YYYY") - moment(a.data().fecha, "DD-MM-YYYY");
    });
    orderData.map((item, index) => {
        const { fecha, cm, cn, sNote, description } = item.data();
        rows.push(
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={index}
                >
                    <SoftBox bgColor='grey-200' borderRadius='md' px={2} display='flex' justifyContent='space-between' sx={{ width: '550px' }} >
                        <SoftTypography variant="h6" color='black'>{fecha.slice(0, -5)}</SoftTypography>
                        <SoftTypography variant="h6" color='black'>{Object.values(description).join(' / ')}</SoftTypography>
                    </SoftBox>
                </AccordionSummary>
                <AccordionDetails>
                    <SoftBox container>
                        <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth'  >
                            {sNote}
                        </SoftTypography>
                    </SoftBox>
                </AccordionDetails>
            </Accordion>

        );
    });

    // const renderColumns = column.map(({ name, align, width }, key) => {
    //     let pl;
    //     let pr;

    //     if (key === 0) {
    //         pl = 3;
    //         pr = 3;
    //     } else if (key === columns.length - 1) {
    //         pl = 3;
    //         pr = 3;
    //     } else {
    //         pl = 1;
    //         pr = 1;
    //     }

    //     return (
    //         <SoftBox
    //             key={name}
    //             component="th"
    //             width={width || "auto"}
    //             pt={1.5}
    //             pb={1.25}
    //             pl={align === "left" ? pl : 3}
    //             pr={align === "right" ? pr : 3}
    //             textAlign={align}
    //             fontSize={size.xxs}
    //             fontWeight={fontWeightBold}
    //             color="secondary"
    //             opacity={1}
    //             borderBottom={`${borderWidth[1]} solid ${light.main}`}
    //         >
    //             {name.toUpperCase()}
    //         </SoftBox>
    //     );
    // });

    // console.log(orderData);
    // orderData.forEach((item) => {
    //     rows.push({
    //         description: (
    //             <SoftBox bgColor='grey-400' borderRadius='md' px={2} display='flex' justifyContent='space-between' sx={{ width: '550px' }} >
    //                 <SoftTypography variant="h6" color='black'>{item.data().fecha}</SoftTypography>
    //                 <SoftTypography variant="h6" color='black'>{Object.values(item.data().description).join(' / ')}</SoftTypography>
    //             </SoftBox>
    //         ),
    //     });
    //     rows.push({
    //         description: (
    //             <SoftBox container>
    //                 <SoftTypography variant="caption" color="secondary" fontWeight="small" alignItems='rigth' >
    //                     {item.data().sNote}
    //                 </SoftTypography>
    //             </SoftBox>
    //         ),
    //     });
    // });

    // const renderRows = rows.map((row, key) => {
    //     const rowKey = row['key'];
    //     const caseM = row['CM'];
    //     // const rowKey = `row-${key}`;

    //     const tableRow = column.map(({ name, align }) => {
    //         let template;
    //         template = (
    //             <SoftBox
    //                 key={uuidv4()}
    //                 component="td"
    //                 p={1}
    //                 textAlign={align}
    //                 borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
    //             >
    //                 <SoftTypography
    //                     variant="button"
    //                     fontWeight="regular"
    //                     color="secondary"
    //                     sx={{ display: "inline-block", width: "max-content" }}
    //                 >
    //                     {row[name]}
    //                 </SoftTypography>
    //             </SoftBox>
    //         );

    //         return template;
    //     });

    //     return <TableRow key={rowKey}>{tableRow}</TableRow>;
    // });



    return (
        <SoftBox display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
            {/* <TableContainer sx={{ minHeight: 200 }}>
                <MuiTable>
                    <SoftBox component="thead">
                        <TableRow>{renderColumns}</TableRow>
                    </SoftBox>
                    <TableBody>{renderRows}</TableBody>
                </MuiTable>
    </TableContainer>*/}
            {loading ? <SoftBox><CircularProgress /></SoftBox> : rows}
        </SoftBox>
    );
}

// Setting default values for the props of Table
// TableRender.defaultProps = {
//     columns: [],
//     rows: [{}],
// };

// Typechecking props for the Table
// TableRender.propTypes = {
//     columns: PropTypes.node,
//     rows: PropTypes.arrayOf(PropTypes.object),
// }

export default TableRender;


// const items = [
//     {
//         title: "13/14 February 1945",
//         cardTitle: "Dresden",
//         cardSubtitle: `Dresden under incendiary bomb attack`,
//         cardDetailedText: `At Yalta, an Allied plan to bomb the hitherto untouched city of Dresden was discussed. The reason for attacking the city was due principally to its strategic importance as a communications centre in the rear of the German retreat that followed the Soviet winter offensive of January 1945. It was also believed that Dresden might be used as an alternative to Berlin as the Reich capital.
//         The attack was part of a plan codenamed ‘Thunderclap’, designed to convince the Germans that the war was lost. It was drawn up in January 1945, when Hitler’s Ardennes offensive, V2 rocket attacks on Britain and the deployment of snorkel-equipped U-boats clearly demonstrated that Germany was still capable of offering stubborn resistance. Strategic bombing attacks had previously failed to break Germany, although they had proved valuable in reducing its capacity to wage war.
//         Now, on the night of 13/14 February 1945, Dresden was attacked by 800 RAF bombers, followed by 400 bombers of the United States Army Air Force. The bombing created a firestorm that destroyed 1,600 acres of Dresden. Even today it is still uncertain as to how many died and estimates have ranged from 25,000 to 135,000. Most authorities now put the death toll at around 35,000. The scale of destruction, the enormous death toll, and its timing at such a late stage in the war, have all ensured that the bombing of Dresden still remains highly controversial.`
//     },
//     {
//         title: "8 May 1945",
//         cardTitle: "VE Day",
//         cardSubtitle: `millions of people rejoice in the news that Germany has surrendered – the war in Europe was finally over`,
//         cardDetailedText: `On the afternoon of 8 May 1945, the British prime minister Winston Churchill made the radio announcement that the world had long been waiting for.
//         “Yesterday morning,” he declared, “at 2.41 a.m., at General Eisenhower’s headquarters, General Jodl, the representative of the German High Command, and Grand Admiral Dönitz, the designated head of the German State, signed the act of unconditional surrender of all German land, sea and air forces in Europe.”
//         After nearly six years, the war in Europe was finally over.`
//     },
//     {
//         title: "9 August 1945",
//         cardTitle: "Nagasaki",
//         cardSubtitle: `Atomic bomb mushroom cloud over the Japanese city of Nagasaki`,
//         cardDetailedText: `The Second World War began at dawn on Friday 1 September 1939, when Adolf Hitler launched his invasion of Poland.
//         The Poles fought bravely, but they were heavily outnumbered in both men and machines, and especially in the air. Britain and France declared war on Germany on 3 September 1939, but gave no real assistance to Poland. Two weeks later, Stalin invaded eastern Poland, and on 27 September Warsaw surrendered. Organised Polish resistance ceased after another week’s fighting. Poland was divided up between Hitler and Stalin.
//         In Poland the Nazis unleashed a reign of terror that was eventually to claim six million victims, half of whom were Polish Jews murdered in extermination camps. The Soviet regime was no less harsh. In March and April 1940, Stalin ordered the murder of over 20,000 Polish officers and others who had been captured in September 1939. Tens of thousands of Poles were also forcibly deported to Siberia.
//         By May 1945, and despite his promises to Churchill and Roosevelt, Stalin had installed a subservient communist regime in Poland.
//         Back in 1939, Poland’s then-leader Marshal Eduard Smigly-Rydz had warned, “With the Germans we risk losing our liberty, but with the Russians we lose our soul.”`
//     }
// ];


// export function HistoryTimeLineRender() {
//     const [itemsData, setItemsData] = useState([])
//     const [controler, dispatch] = useSoftUIController();
//     const { currentClToNote } = controler;
//     const { cn, cm } = currentClToNote;
//     const { data, loading, error } = useNotesByCliet({ cmm: cm, client: cn });
//     const orderData = data.sort((a, b) => {
//         return moment(a.data().fecha, "DD-MM-YYYY") - moment(b.data().fecha, "DD-MM-YYYY");
//     });
//     const itemsRenders = [];
//     orderData.forEach((item) => {
//         const { fecha, description, snote, cm } = item.data();
//         itemsRenders.push({
//             title: "8 May 1945",
//             cardTitle: "VE Day",
//             cardSubtitle: `millions of people rejoice in the news that Germany has surrendered – the war in Europe was finally over`,
//             cardDetailedText: `On the afternoon of 8 May 1945, the British prime minister Winston Churchill made the radio announcement that the world had long been waiting for.
//         “Yesterday morning,” he declared, “at 2.41 a.m., at General Eisenhower’s headquarters, General Jodl, the representative of the German High Command, and Grand Admiral Dönitz, the designated head of the German State, signed the act of unconditional surrender of all German land, sea and air forces in Europe.”
//         After nearly six years, the war in Europe was finally over.`
//         });
//     });
//     console.log('itemsRenders', itemsRenders);
//     useEffect(() => {
//         setItemsData(itemsRenders)
//     }, [data])

//     return (
//         <div style={{ width: "100%", height: "90vh" }}>
//             {itemsData && <Chrono items={itemsData} mode="VERTICAL" />}
//         </div>
//     );
// }
