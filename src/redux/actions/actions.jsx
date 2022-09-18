import DataService from '../../service/services'
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../service/firebase';
import axios from 'axios'

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
        dispatch({ type: "LIST_BILLING_SUCCESS", value: res });

    }
}
