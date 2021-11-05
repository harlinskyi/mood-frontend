import { CHANGE_USER_PHOTO } from "../actions/types";
import store from "../store";

const initialState = {
};

function profileReducer(state = initialState, action) {
    const {type, data} = action;
    
    switch(type){
        case CHANGE_USER_PHOTO: {
            return {
                userPhoto: data
            }
        }
        default: 
            return state;
    }
}

export default profileReducer;