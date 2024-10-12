import { configureStore } from '@reduxjs/toolkit';
import actionReducer from './ReduxmidArea/MidAction';
import actionorderlist from './ReduxmidArea/Actionorder'
import multipleActionReducer from './ReduxmidArea/Reduxmultipleaction/multipleaction';
import MulitpleActionorderlistReducer from './ReduxmidArea/Reduxmultipleaction/Actionformultiple'
import characterReducer from './ReduxmidArea/Previewarea/Charater'
import CheckmultipleReducer from './ReduxmidArea/Previewarea/maintain'
const Store = configureStore({
    reducer: {
        Singleaction: actionReducer,
        orderlistsingleaction: actionorderlist,
        Mulitpleactionlist: multipleActionReducer,
        Mulitpleactionorderlist: MulitpleActionorderlistReducer,
        Characteractionslist: characterReducer,
        checkmultiplecancreate: CheckmultipleReducer
    }
})

export default Store;