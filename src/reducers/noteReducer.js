import { types } from '../types/types';

const initialState = {
    notes: [],
    active: null
}

export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActiveEntry:
            return{
                ...state,
                active:{
                    ...action.payload
                }
            };

        default:
            return state;
    }
}