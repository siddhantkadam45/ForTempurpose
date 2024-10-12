import React from "react";
import CatSprite from "./CatSprite";
import Draggable from 'react-draggable';
import Alert from '@mui/material/Alert';
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatespiritone, updatespirittwo } from '../Redux/ReduxmidArea/Previewarea/Charater'
import {updateCanCreateMultipleSpirit} from '../Redux/ReduxmidArea/Previewarea/maintain'
export default function PreviewArea() {
  const checkstate = useSelector((state) => state.checkmultiplecancreate.isMultipleEnabled)
  const firstspirit = useSelector((state) => state.Characteractionslist.spiritone)
  const Secondspirit = useSelector((state) => state.Characteractionslist.spirittwo)
  const [showAlert, setShowAlert] = useState(false);

  console.log(firstspirit, Secondspirit)
  console.log('checkstate', checkstate)
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight });


  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleClick = () => {
    if (checkstate) {
      setShowAlert(true); // Show the alert if checkstate is true
    } else {
      // Dispatch action if checkstate is false
      console.log('insede')
      dispatch(updateCanCreateMultipleSpirit({ id: 1 }));
      setShowAlert(false);
    }
  };

  const dispatch = useDispatch();
  const eventHandler = (e, data) => {
    const elementId = data.node.id;

    console.log('Event Type:', e.type);
    console.log('Dragged Element ID:', elementId);
    console.log('Position Data:', data);
    const x = data.x;
    const y = data.y;
    if (elementId == 'spirit0') {
      dispatch(updatespiritone({ move_x: x, move_y: y }))
    }
    else {
      dispatch(updatespirittwo({ move_x: x, move_y: y }))

    }
    // console.log(x,y)
  }

  return (
    <div className="flex-none h-full  p-2">

      <div className="flex justify-between gap-10 px-2  text-xl mb-3 items-center">
        <div className="border px-1 rounded-lg py-">
          Preview Section
        </div>
        <div>
          <select className="border rounded-xl px-1 py-1 border-black">
            {checkstate ? (
              <>
                <option>Spirit 0</option>
                <option>Spirit 1</option>
              </>
            ) : (
              <option>Spirit One</option>
            )}
          </select>
        </div>
        <div>
          <button
            className="border px-3 py-1 bg-red-300 rounded-2xl"
            onClick={handleClick}
          >
            + CREATE NEW
          </button>

        </div>
      </div>
      <div> {showAlert && (
        <div className="mr-9">
          <Alert severity="warning" >
            Go in Create single list mode to create multiple lists.
          </Alert>
        </div>
      )}</div>
      <div>
        <div className="relative w-full h-full"> {/* Container is relatively positioned */}
          {!checkstate ? (
            <div>
              <Draggable onStop={eventHandler} defaultPosition={{ x: 0, y: 0 }} bounds={bounds} id={'spirit0'}>
                <div className="absolute top-0 left-0" id={'spirit0'}> {/* Absolute positioning for overlapping */}
                  <CatSprite />
                  <div>Spirit0</div>
                </div>
              </Draggable>
            </div>
          ) : (
            <div>
              <Draggable onStop={eventHandler} defaultPosition={{ x: 0, y: 0 }} bounds={bounds} >
                <div className="absolute top-0 left-0" id={'spirit0'}> {/* Overlap position */}
                  <CatSprite />
                  <div>Spirit0</div>
                </div>
              </Draggable>
              <Draggable onStop={eventHandler} defaultPosition={{ x: 0, y: 0 }} bounds={bounds} >
                <div className="absolute top-0 left-0" id={'spirit1'}> {/* Overlap position */}
                  <CatSprite />
                  <div>Spirit1</div>
                </div>
              </Draggable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
