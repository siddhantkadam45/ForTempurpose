import React, { useState } from "react";
import Store from "../Redux/Store";
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import Movex from "./Sidebareach/Movex";
import Movey from "./Sidebareach/Movey";
import Clockwise from "./Sidebareach/Clockwise";
import Anticlockwise from "./Sidebareach/Anticlockwise";
import Reapt from "./Sidebareach/Reapt";
import Cardhold from "./Cardholder";
import Movexy from "./Sidebareach/Movexy";
import multipleaction from "../Redux/ReduxmidArea/Reduxmultipleaction/multipleaction";
import { updateAction } from '../Redux/ReduxmidArea/Actionorder'
import {updateactionlistmulitple} from '../Redux/ReduxmidArea/Reduxmultipleaction/Actionformultiple'
import { updateCanCreateMultipleSpirit } from "../Redux/ReduxmidArea/Previewarea/maintain";
import { updateRunOnOrOff } from "../Redux/ReduxmidArea/Previewarea/globalruntracker";


export default function MidArea() {
  const tt = useSelector((state) => state.toshowxory.checkxory)
  console.log('fot te ', tt)
  const [tracksingleornot, settracksingleornot] = useState(0)
  const dispatch = useDispatch();
  
  return (
    <div>
      <div>
        <div className="flex  gap-16 px-4 text-2xl  mt-3">
          <div className="py-1">
            MidArea
          </div>
          <div>
            
          </div>
        </div>
        <div>
          <div className="flex gap-4 mt-5 px-4 ">
            <div><button className="bg-green-300 border-1 p-1 border-black rounded-2xl px-3" onClick={() => {
              settracksingleornot(0);
              dispatch(updateCanCreateMultipleSpirit({id:0}))
            }}>Create Single List</button> </div>
            <div> <button className="bg-green-300 border rounded-2xl p-1 px-3" onClick={() => {
              settracksingleornot(1)
              dispatch(updateCanCreateMultipleSpirit({id:1}))

            }}>Create Mulitple List</button></div>
          </div>
        </div>
        <div className=" ml-3 mt-9">
          {!tracksingleornot && !tt ? <div><Cardhold Createindividuallist={<SingleComponent />} /></div> : <div><Cardhold Createindividuallist={<Mulitplelist />} /></div>}
        </div>
      </div>

    </div>
  )
}


function SingleComponent() {
  const dispatch = useDispatch();
  const actions = useSelector(state => state.Singleaction.Singleactionlist);
  const actionsorderlist = useSelector(state=> state.orderlistsingleaction.Actionorderlist)
  console.log(actionsorderlist,'acjdoijfadifjadsi fidfjdifjad;')
  const runtracker = useSelector((state) => state.runtracker.RunonorOff)
  console.log('run tracker ', runtracker)
  console.log(actions)
  function handleChange(e) {
    const { id, value } = e.target;

    let actionType = '';
    let index = 0;
    let subAction = '';

    if (id.startsWith('move_x_y')) {
      if (id.endsWith('Y')) {
        actionType = 'move_x_y';
        subAction = 'y';
        index = parseInt(id.slice('move_x_y'.length, -1), 10);
        console.log(index)
        dispatch(updateAction({ index: index, actionType, newValue: value, checkyorx: 0 }))
        return;
      } else {
        // This is the 'x' action
        actionType = 'move_x_y';
        subAction = 'x';
        index = parseInt(id.slice('move_x_y'.length), 10);
        dispatch(updateAction({ index: index, actionType, newValue: value, checkyorx: 1 }))
        return;
      }

    } else {
      // Handling for other cases (move_x, move_y, rotate_clockwise, rotate_anticlockwise, repeat)
      const match = id.match(/([a-z_]+)(\d+)$/);
      if (match) {
        actionType = match[1];
        index = parseInt(match[2], 10);
      }
    }
    console.log('Action Type:', actionType);
    console.log('Index:', index);
    console.log('Value:', value);
    if (actionType === 'move_x' || actionType === 'move_y' || actionType === 'rotate_clockwise' || actionType === 'rotate_anticlockwise' || actionType ==='repeat') {
      // Dispatch an action to update move_x or move_y
      dispatch(updateAction({ index, actionType, newValue: value }));
      return;
    }

  }
  // 
  return (
    <div>
      <div>
        <div className='flex flex-col  justify-center items-center  '>
          <div >
            <button className=' border-slate-400 px-2 w-20 py-1 rounded-md flex items-center justify-center gap-1 bg-purple-400' onClick={() => dispatch(updateRunOnOrOff({onoroff:1}))}>
              <IoMdArrowDroprightCircle />
              Run
            </button>
          </div>
          <div className="overflow-y-scroll max-h-96 mt-5">
            <Droppable droppableId="singleaction">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppabelProps}>
                  {actions.length > 0 ? (
                    actions.map((item, index) => (
                      <Draggable draggableId={`${item}${index}`} index={index} key={index}>
                        {(provided) => (
                          <div key={index} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                            {item === "rotate_clockwise" ? <Clockwise value={0} handleChange={handleChange} id={`${item}${index}`} /> : null}
                            {item === 'rotate_anticlockwise' ? <Anticlockwise value={0} handleChange={handleChange} id={`${item}${index}`} /> : null}
                            {item === "move_x" ? <Movex value={0} handleChange={handleChange} id={`${item}${index}`} /> : null}
                            {item === "move_y" ? <Movey value={0} handleChange={handleChange} id={`${item}${index}`} /> : null}
                            {item === "repeat" ? <Reapt value={0} handleChange={handleChange} id={`${item}${index}`} /> : null}
                            {item === "move_x_y" ? <Movexy value={0} handleChange={handleChange} id={`${item}${index}`} /> : null}
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 font-semibold">
                      No actions available. Drag items here.
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </div>
  )
}


function Mulitplelist() {
  const mulitpleactionlistsecond = useSelector(state => state.Mulitpleactionlist.Entriesofsecond);
  const mulitpleactionlistfirst = useSelector(state => state.Mulitpleactionlist.Entriesoffirst);
  const runtracker = useSelector((state) => state.runtracker.RunonorOff)

  const dispatch = useDispatch();
  console.log(mulitpleactionlistsecond)
  function handleChange(e) {
    // console.log('hi')
    // // // console.log()
    // console.log(e.target.id)
    // console.log(e.target.value)
    const { id, value } = e.target;
    if (id.startsWith('move_x_y')) {
      let actionType = 'move_x_y';
      let subAction = '';
      let index = 0;
      let firstOrSecond = true; // true for first, false for second
      let suffixLength = 0;

      // Determine if it's 'first' or 'second' and calculate suffix length accordingly
      if (id.includes('first')) {
        firstOrSecond = true;  // It's the first list
        suffixLength = 'firstY'.length;  // 6 characters for 'firstY'
      } else if (id.includes('second')) {
        firstOrSecond = false;  // It's the second list
        suffixLength = 'secondY'.length;  // 7 characters for 'secondY'
      }

      // Check if it's 'x' or 'y' based on the presence of 'Y' at the end
      if (id.endsWith('Y')) {
        subAction = 'y';
        index = parseInt(id.slice('move_x_y'.length, -suffixLength), 10); // Extract the number
        console.log('Index:', index, 'Updating Y for', firstOrSecond ? 'first' : 'second');
        dispatch(updateactionlistmulitple({
          index: index,
          actionType: actionType,
          newValue: value,
          checkyorx: 0, // Indicates 'y'
          firstorsecond: firstOrSecond
        }));
        return;
      } else {
        // This is the 'x' action
        subAction = 'x';
        index = parseInt(id.slice('move_x_y'.length, -suffixLength + 1), 10); // Extract the number
        console.log('Index:', index, 'Updating X for', firstOrSecond ? 'first' : 'second');
        dispatch(updateactionlistmulitple({
          index: index,
          actionType: actionType,
          newValue: value,
          checkyorx: 1, // Indicates 'x'
          firstorsecond: firstOrSecond
        }));
        return;
      }
    } else {
      // Handling for other cases (move_x, move_y, rotate_clockwise, etc.)
      const match = id.match(/([a-z_]+)(\d+)(first|second)$/);
      if (match) {
        let actionType = match[1]; // Extract action (move_x, rotate_clockwise, etc.)
        let index = parseInt(match[2], 10); // Extract the index
        let firstOrSecond = match[3] === 'first'; // Determine if it's first or second

        console.log('Action Type:', actionType);
        console.log('Index:', index);
        console.log('List:', firstOrSecond ? 'first' : 'second');

        // Dispatch an action to update move_x or move_y for first or second list
        dispatch(updateactionlistmulitple({
          index,
          actionType,
          newValue: value,
          firstorsecond: firstOrSecond
        }));
        return;
      }
    }

  }
  return <div>
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex justify-center items-center flex-col">
          <button className=' border-slate-400 px-2 w-20 py-1 rounded-md flex items-center justify-center gap-1 bg-purple-400' onClick={() => dispatch(updateRunOnOrOff({onoroff:1}))}>
            <IoMdArrowDroprightCircle />
            Run
          </button>
        </div>
      </div>
      <div className="">
        <div className=" flex justify-between gap-16 overflow-y-scroll max-h-96 mt-5">
          <div className=" ">
            <Droppable droppableId="Firstmulitpleactionlist">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppabelProps}>
                  {mulitpleactionlistfirst.length > 0 ? (
                    mulitpleactionlistfirst.map((item, index) => (
                      <Draggable draggableId={`${item}${index}-first`} index={index} key={`first-${index}`}>
                        {(provided) => (
                          <div key={index} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                            {item === "rotate_clockwise" ? <Clockwise value={0} handleChange={handleChange} id={`${item}${index}first`} /> : null}
                            {item === 'rotate_anticlockwise' ? <Anticlockwise value={0} handleChange={handleChange} id={`${item}${index}first`} /> : null}
                            {item === "move_x" ? <Movex value={0} handleChange={handleChange} id={`${item}${index}first`} /> : null}
                            {item === "move_y" ? <Movey value={0} handleChange={handleChange} id={`${item}${index}first`} /> : null}
                            {item === "repeat" ? <Reapt value={0} handleChange={handleChange} iid={`${item}${index}first`} /> : null}
                            {item === "move_x_y" ? <Movexy value={0} handleChange={handleChange} id={`${item}${index}first`} /> : null}
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 font-semibold border-2 rounded border-black ">
                      No actions available. Drag items here.
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className=" ">
            <Droppable droppableId="Secondmulitpleactionlist">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppabelProps}>
                  {mulitpleactionlistsecond.length > 0 ? (
                    mulitpleactionlistsecond.map((item, index) => (
                      <Draggable draggableId={`${item}${index}-second`} index={index} key={`second-${index}`}>
                        {(provided) => (
                          <div key={index} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                            {item === "rotate_clockwise" ? <Clockwise value={0} handleChange={handleChange} id={`${item}${index}second`} /> : null}
                            {item === 'rotate_anticlockwise' ? <Anticlockwise value={0} handleChange={handleChange} id={`${item}${index}second`} /> : null}
                            {item === "move_x" ? <Movex value={0} handleChange={handleChange} id={`${item}${index}second`} /> : null}
                            {item === "move_y" ? <Movey value={0} handleChange={handleChange} id={`${item}${index}second`} /> : null}
                            {item === "repeat" ? <Reapt value={0} handleChange={handleChange} id={`${item}${index}second`} /> : null}
                            {item === "move_x_y" ? <Movexy value={0} handleChange={handleChange} id={`${item}${index}second`} /> : null}
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 font-semibold border-2 rounded border-black">
                      No actions available. Drag items here.
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>

    </div>
  </div>
}