import React from "react";
import PropTypes from "prop-types";

// Components
import SoftBox from "components/SoftBox";
import SelectInput from "../SelectInput";


function AutoCompleDescripService({ listServices, handleChangeAutoCompleted, currentValue, hText, width, id = "description" }) {
    return (
        <SoftBox mr={2} >
            <SelectInput data={listServices} sx={{
                width: { width },
                "& .MuiInputBase-root": {
                    maxHeight: 'none !important',
                    justifyContent: 'start !important',
                    flexWrap: 'nowrap !important',
                },
            }} onchange={handleChangeAutoCompleted} hText={hText} multiple={true} id={id} value={currentValue} />
        </SoftBox>
    );
}

export default AutoCompleDescripService;

AutoCompleDescripService.propTypes = {
    listServices: PropTypes.array,
    handleChangeAutoCompleted: PropTypes.func,
    currentValue: PropTypes.string,
    hText: PropTypes.string,
    width: PropTypes.number,
    id: PropTypes.string,
};