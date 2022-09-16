import { combineReducers } from 'redux'
import { listServicesByCMReducer } from './reducers/reducer'

const rootReducer = combineReducers({
    listSbyCM: listServicesByCMReducer,
});

export default rootReducer;