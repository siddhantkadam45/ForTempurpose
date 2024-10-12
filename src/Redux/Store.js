import { configureStore } from '@reduxjs/toolkit';
import actionReducer from './ReduxmidArea/MidAction';
import actionorderlist from './ReduxmidArea/Actionorder'
import    multipleActionReducer from './ReduxmidArea/Reduxmultipleaction/multipleaction';
import MulitpleActionorderlistReducer from './ReduxmidArea/Reduxmultipleaction/Actionformultiple'
const Store = configureStore({
    reducer: {
        Singleaction: actionReducer,
        orderlistsingleaction:actionorderlist ,
        Mulitpleactionlist: multipleActionReducer,
        Mulitpleactionorderlist : MulitpleActionorderlistReducer
    }
})

export default  Store ;