import { configureStore } from '@reduxjs/toolkit';
import actionReducer from './ReduxmidArea/MidAction';
import actionorderlist from './ReduxmidArea/Actionorder'
import multipleActionReducer from './ReduxmidArea/Reduxmultipleaction/multipleaction';
import MulitpleActionorderlistReducer from './ReduxmidArea/Reduxmultipleaction/Actionformultiple'
import characterReducer from './ReduxmidArea/Previewarea/Charater'
import CheckmultipleReducer from './ReduxmidArea/Previewarea/maintain'
import singleConnectivityReducer from './ReduxmidArea/Previewarea/Singleactiosconnectivity'
import GlobalRunCheckerReducer from './ReduxmidArea/Previewarea/globalruntracker'
import showxoryreducer from './ReduxmidArea/Previewarea/toshowxory'
const Store = configureStore({
    reducer: {
        Singleaction: actionReducer,
        orderlistsingleaction: actionorderlist,
        Mulitpleactionlist: multipleActionReducer,
        Mulitpleactionorderlist: MulitpleActionorderlistReducer,
        Characteractionslist: characterReducer,
        checkmultiplecancreate: CheckmultipleReducer,
        singleconnectivity: singleConnectivityReducer,
        runtracker : GlobalRunCheckerReducer,
        toshowxory : showxoryreducer 
    }
})

export default Store;