import { combineReducers } from 'redux'
import { listServicesByCMReducer, listNotesReducer, listServicesByCMReducer2, currentClToNoteReducer, listCMReducer } from './reducers/reducer'

const rootReducer = combineReducers({
    listSbyCM: listServicesByCMReducer,
    search: listNotesReducer,
    listServiByCM: listServicesByCMReducer2,
    currentClToNote: currentClToNoteReducer,
    listCM: listCMReducer,
});

export default rootReducer;