const initialState = {
    loading: false,
    data: [],
    error: null,
};

export function listServicesByCMReducer(state = initialState, action) {
    console.log('action', action);
    switch (action.type) {
        case "LIST_BILLING_LOAD":
            return {
                loading: true,
                data: [],
                error: null,
            };
        case "LIST_BILLING_FAIL":
            return {
                loading: false,
                data: [],
                error: action.error,
            };
        case "LIST_BILLING_SUCCESS":
            return {
                loading: false,
                data: action.value,
                error: null,
            };
        default:
            return state;
    }
}