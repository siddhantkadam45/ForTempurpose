import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from "react-redux";
import { updatesinglelist } from './Redux/ReduxmidArea/MidAction'
import { updateAction, UpdateActionsfordrag } from "./Redux/ReduxmidArea/Actionorder";
import { updatemulipleorderlist } from "./Redux/ReduxmidArea/Reduxmultipleaction/Actionformultiple";
import { updatemultipleaction } from './Redux/ReduxmidArea/Reduxmultipleaction/multipleaction'

export default function App() {
  const actions = useSelector(state => state.Singleaction.Singleactionlist);
  const mulitpleactionlistsecond = useSelector(state => state.Mulitpleactionlist.Entriesofsecond);
  const mulitpleactionlistfirst = useSelector(state => state.Mulitpleactionlist.Entriesoffirst);

  const dispatch = useDispatch();

  function Dragin_same_component(tempArray, result, updateActionList, updateOrderList, firstKey, firstActionKey, listIndex) {
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Create a copy of the array and remove the dragged item
    let updatedActions = [...tempArray];
    const [movedElement] = updatedActions.splice(sourceIndex, 1);

    // Insert the dragged item at the new position
    updatedActions.splice(destinationIndex, 0, movedElement);

    // Dispatch the updates
    dispatch(updateActionList({ [firstKey]: updatedActions, x: listIndex }));
    dispatch(updateOrderList({ [firstActionKey]: updatedActions, x: listIndex }));
  }

  
function Drag_out_ofcomponent(result, tempArray, entriesKey, actiontype, updatesinglelist, UpdateActionsfordrag, listIndex) {
  let updatedActions = [...tempArray];

  // Remove the item from the original array
  updatedActions.splice(result.source.index, 1);
  
  // Dispatch updates to the reducers
  dispatch(updatesinglelist({ [entriesKey]: updatedActions, x: listIndex }));
  dispatch(UpdateActionsfordrag({ [actiontype]: updatedActions, x: listIndex }));
  
  return;
}

  const handledragend = (result) => {
    const source = result.source.droppableId ;
    // console.log(result)
    if(!result.destination){
      if(source == 'Firstmulitpleactionlist'  ) {
        // console.log("insdier")
        Drag_out_ofcomponent(result ,mulitpleactionlistfirst,'Entriesoffirst', 'ActionEntrieoffirst',updatemultipleaction, updatemulipleorderlist,1 )
        // console.log('done ')
        return;
      }
      else if (source == 'Secondmulitpleactionlist') {
        Drag_out_ofcomponent(result ,mulitpleactionlistsecond,'Entriesofsecond', 'ActionEntrieofsecond',updatemultipleaction, updatemulipleorderlist,0 )
        return ;
      }

      if (result.source.droppableId === 'singleaction') {
        if (!result.destination) {
          // Removing the element if dropped outside any droppable zone
          // console.log('remove')
          let updatedActions = [...actions];
          updatedActions.splice(result.source.index, 1);
          dispatch(updatesinglelist({ updatedActions: updatedActions }));
          dispatch(UpdateActionsfordrag({ actiontype: updatedActions }))
          return;
        }
      }
      return ;
    }
    const destionation = result.destination.droppableId ;
    if (source === 'Secondmulitpleactionlist' && destionation === 'Secondmulitpleactionlist') {
      Dragin_same_component(mulitpleactionlistsecond, result, updatemultipleaction, updatemulipleorderlist, 'Entriesofsecond', 'ActionEntrieofsecond', 0);
      console.log(mulitpleactionlistsecond, 'after re-order');
      return;
    }
    if (source === 'Firstmulitpleactionlist' && destionation === 'Firstmulitpleactionlist') {
      Dragin_same_component(mulitpleactionlistfirst, result, updatemultipleaction, updatemulipleorderlist, 'Entriesoffirst', 'ActionEntrieoffirst', 1);
      console.log(mulitpleactionlistsecond, 'after re-order');
      return;
    }
    

    if (source == 'sidebar') {
      if (destionation == 'Firstmulitpleactionlist' && source == 'sidebar') {

        const destinationIndex = result.destination.index;
        const sourceIndex = result.source.index;
        let updatedActions = [...mulitpleactionlistfirst];
        let newAction = '';
        switch (sourceIndex) {
          case 0: newAction = 'move_x'; break;
          case 1: newAction = 'move_y'; break;
          case 2: newAction = 'rotate_clockwise'; break;
          case 3: newAction = 'rotate_anticlockwise'; break;
          case 4: newAction = 'move_x_y'; break;
          case 5: newAction = 'repeat'; break;
          default: newAction = 'move_x';
        }
        updatedActions.splice(destinationIndex, 0, newAction);
        dispatch(updatemultipleaction({ Entriesoffirst: updatedActions, x: 1 }));
        dispatch(updatemulipleorderlist({ ActionEntrieoffirst: updatedActions, x: 1 }))
        return;
      }
      if (destionation == 'Secondmulitpleactionlist') {
        const destinationIndex = result.destination.index;
        const sourceIndex = result.source.index;
        let updatedActions = [...mulitpleactionlistsecond];
        let newAction = '';
        switch (sourceIndex) {
          case 0: newAction = 'move_x'; break;
          case 1: newAction = 'move_y'; break;
          case 2: newAction = 'rotate_clockwise'; break;
          case 3: newAction = 'rotate_anticlockwise'; break;
          case 4: newAction = 'move_x_y'; break;
          case 5: newAction = 'repeat'; break;
          default: newAction = 'move_x';
        }
        updatedActions.splice(destinationIndex, 0, newAction);
        dispatch(updatemultipleaction({ Entriesofsecond: updatedActions, x: 0 }));
        dispatch(updatemulipleorderlist({ ActionEntrieofsecond: updatedActions, x: 0 }))
        console.log(updatedActions)
        return;
      }
    }

    console.log(source, destionation)
    if (result.source.droppableId === 'singleaction') {
      if (!result.destination) {
        // Removing the element if dropped outside any droppable zone
        // console.log('remove')
        let updatedActions = [...actions];
        updatedActions.splice(result.source.index, 1);
        dispatch(updatesinglelist({ updatedActions: updatedActions }));
        dispatch(UpdateActionsfordrag({ actiontype: updatedActions }))
        return;
      }

      if (result.destination.droppableId === 'singleaction') {
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        // handling drag and in same region/area
        let updatedActions = [...actions];

        const [movedElement] = updatedActions.splice(sourceIndex, 1);

        updatedActions.splice(destinationIndex, 0, movedElement);

        dispatch(updatesinglelist({ updatedActions }));
        dispatch(UpdateActionsfordrag({ actiontype: updatedActions }))

        return;
      }
      return;
    }

    // handling drop from side bar to singlearea of mid area 
    if (!result.destination) return;
    const destinationIndex = result.destination.index;
    const sourceIndex = result.source.index;
    if (result.destination.droppableId === 'sidebar' && result.source.droppableId === 'sidebar') return;

    if (result.destination.droppableId === 'singleaction' && result.source.droppableId === 'sidebar') {
      let updatedActions = [...actions];
      let newAction = '';
      switch (sourceIndex) {
        case 0: newAction = 'move_x'; break;
        case 1: newAction = 'move_y'; break;
        case 2: newAction = 'rotate_clockwise'; break;
        case 3: newAction = 'rotate_anticlockwise'; break;
        case 4: newAction = 'move_x_y'; break;
        case 5: newAction = 'repeat'; break;
        default: newAction = 'move_x';
      }
      updatedActions.splice(destinationIndex, 0, newAction);
      dispatch(updatesinglelist({ updatedActions }));
      dispatch(UpdateActionsfordrag({ actiontype: updatedActions }))

    }
  }
  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <DragDropContext onDragEnd={handledragend} >
            <Sidebar /> <MidArea />
          </DragDropContext>
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea />
        </div>
      </div>
    </div>
  );
}
