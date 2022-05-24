import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

export const store = configureStore({ reducer: rootReducer}, (applyMiddleware(thunk))) 