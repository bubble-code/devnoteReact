import { combineReducers } from 'redux'
import { listServicesByCMReducer, listNotesReducer, listServicesByCMReducer2, currentClToNoteReducer, listCMReducer, listClientsByCMReducer } from './reducers/reducer'

const rootReducer = combineReducers({
    listSbyCM: listServicesByCMReducer,
    search: listNotesReducer,
    listServiByCM: listServicesByCMReducer2,
    currentClToNote: currentClToNoteReducer,
    listCM: listCMReducer,
    listClientsByCM: listClientsByCMReducer,
});

export default rootReducer;