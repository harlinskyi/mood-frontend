import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth";
// import usersReducer from "./reducers/users";


const initialState = {
};

const middleware = [thunk];

const rootReducer = combineReducers({
    auth: authReducer
    // users: usersReducer
});

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;