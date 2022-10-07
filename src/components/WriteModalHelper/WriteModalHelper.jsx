
import React, { useState } from 'react';
import { Avatar, Col, Divider, Drawer, List, Row } from 'antd';
import PropTypes from 'prop-types';


import "antd/dist/antd.css";
import './style.css';
import SoftBox from 'components/SoftBox';
import TableRender from '../TableHistory/TableRender';


const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{"title"}:</p>
    {"content"}
  </div>
);

const WriteModalHelper = ({open, setOpen, title, id, children}) => {

  return (    
      <Drawer width={640} placement="right" closable={false} onClose={()=>setOpen(id,false)} open={open} >
      <SoftBox mt={15}>
      
      </SoftBox>
        <p className="site-description-item-profile-p" style={{ marginBottom: 24,}}>{title}</p>
        <SoftBox
        sx={{
            "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`
                },
            },
            ".MuiBox-root": {
                lineHeight: 1,
                " & span": {
                    width: "inherit",
                    textAlign: 'justify',
                }
            }, minHeight: 250
        }}
        style={{ fontFamily: 'az_ea_font, "Segoe UI", az_font, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}
    >
        {/*<HistoryTimeLineRender />
        <TableRender />*/}
        {children}

    </SoftBox>       
      </Drawer>
  );
};
export default WriteModalHelper;


DescriptionItem.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
};

WriteModalHelper.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    title: PropTypes.string,  
    children: PropTypes.node,
    id: PropTypes.string, 
};





    // const clientFromRedux = useSelector((state) => state.currentClToNote);
    // const { cm, cn } = clientFromRedux["currentClient"];
    // console.log('cm', cm);
    // const { data, loading, error } = useNotesByCliet({ cmm: cm, client: cn });
    // console.log("cm, cn");
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    // const [formValues, setFormValues] = useState(defaultValues);
    // const [controller, dispatch] = useSoftUIController();
    // const { openModalEditService } = controller;
    // const { open, id, cm } = openModalEditService;
    // const { error, loading, data } = useGetServiceById({ id, cm });
    // const { listServices, error: errorListService, loading: loadingListService } = useListServices();
    // const { error: errorSave, loading: loginSave, saveData } = useSaveNote();
    // const { loading, error, addClient } = useAddClient();

    // const handleClos = () => {
    //     handleClose(false);
    // };

    // function handleSubmit(data) {
        // console.log("dataSubmit", data);
        // saveData({ cm, id, data })
        // if (!error) {
        // dispatchRedux({ type: 'CURRENT_CL_TO_NOTE_SUCCESS', value: {} })
        // setFormData(initialValues);
        // }
    // }
   

// WriteModalHelper.propTypes = {
//     isOpen: PropTypes.bool,
//     handleClose: PropTypes.func,
//     handleOpen: PropTypes.func,
//     cm: PropTypes.string,
//     cn: PropTypes.string
// };