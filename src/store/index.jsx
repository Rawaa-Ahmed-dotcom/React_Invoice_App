import {configureStore} from "@reduxjs/toolkit";
import invoice from "./invoice.jsx";
const store = configureStore({reducer : {invoice}});

export default store;