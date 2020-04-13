import { createStore, combineReducers, applyMiddleware } from "redux";
import articleReducer from "./Reducers/articleReducer";
import tagsReducer from "./Reducers/tagsReducer";
// import logger from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "./Reducers/userReducer";

const rootReducer = combineReducers({
  articles: articleReducer,
  tags: tagsReducer,
  user: userReducer
});

let logger = store => next => action => {
  return next(action);
};

export let store = createStore(rootReducer, applyMiddleware(logger, thunk));
