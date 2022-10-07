import DataService from '../../service/services';

const _pathCM = "/CM/cm/cm";

export function setListBillingLoad(loading) {
    return { type: "LIST_BILLING_LOAD", loading };
}
export function setListBillingFail(error) {
    return { type: "LIST_BILLING_FAIL", error: error }
};
export function setListBillingSuccess(value) {
    return { type: "LIST_BILLING_SUCCESS", value }
};

export function fectListBilling({ cm }) {
    return async (dispatch) => {
        dispatch(setListBillingLoad());
        const res = await DataService.listBillingOpenByCm({ cm })
        dispatch(setListBillingSuccess(res));

    }
}
// Call from input in billing Services List
export function fectListServsByCM({ cm }) {
    return async (dispatch) => {
        dispatch({ type: "LIST_SERVICES_BY_CM_LOAD", cm });
        const res = await DataService.listBillingOpenByCm({ cm });
        // console.log(res);
        dispatch({ type: 'LIST_SERVICES_BY_CM_SUCCESS', value: res });
    }
}

export function clearListServicesByCM() {
    return async (dispatch) => {
        dispatch({ type: 'LIST_SERVICES_BY_CM_CLEAR' });
    }
}

export function fectCurrentClToNote({ cm, id }) {
    return async (dispatch) => {
        dispatch({ type: "CURRENT_CL_TO_NOTE_LOAD" });
        const res = await DataService.getServiceById({ cm, id });
        dispatch({ type: 'CURRENT_CL_TO_NOTE_SUCCESS', value: res });
    }
}

export function fectListCM() {
    return async (dispatch) => {
        dispatch({ type: "LIST_CM_LOAD" });
        const res = await DataService.listCM();
        dispatch({ type: 'LIST_CM_SUCCESS', value: res });
    }
}

export function fectListClientsByCM({ cm }) {
    return async (dispatch) => {
        dispatch({ type: "LIST_CLIENTS_BY_CM_LOAD" });
        const res = await DataService.listClient({ cm });
        dispatch({ type: 'LIST_CLIENTS_BY_CM_SUCCESS', value: res });
    }
}

export function fectHistoryByClient({ cm, cn }) {
    return async (dispatch) => {
        dispatch({ type: "HISTORY_CLIENT_LOAD" });
        const res = await DataService.listNoteByClient({ cm, name: cn });
        dispatch({ type: 'HISTORY_CLIENT_SUCCESS', value: res });
    }
}
export function fectSearchHelper(query) {
    return async (dispatch) => {
        dispatch({ type: "SEARCH_LOAD" });
        const res = await DataService.searchHelper({ value: query });
        dispatch({ type: 'SEARCH_SUCCESS', value: res });
    }
}