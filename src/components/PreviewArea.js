import React, { useState, useEffect, useRef } from "react";
import CatSprite from "./CatSprite";
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { updatespiritone, updatespirittwo } from '../Redux/ReduxmidArea/Previewarea/Charater';
import { updateCanCreateMultipleSpirit } from '../Redux/ReduxmidArea/Previewarea/maintain';
import { motion, useAnimation } from "framer-motion";
import { updateRunOnOrOff } from "../Redux/ReduxmidArea/Previewarea/globalruntracker";
import { updateConnectivity } from "../Redux/ReduxmidArea/Previewarea/Singleactiosconnectivity";
import { updatexory } from "../Redux/ReduxmidArea/Previewarea/toshowxory";




export default function PreviewArea() {
  const checkstate = useSelector((state) => state.checkmultiplecancreate.isMultipleEnabled);
  const firstspirit = useSelector((state) => state.Characteractionslist.spiritone);
  const secondspirit = useSelector((state) => state.Characteractionslist.spirittwo);
  const [showAlert, setShowAlert] = useState(false);

  // Redux selectors for fetching action data
  const singleAction = useSelector((state) => state.orderlistsingleaction.Actionorderlist);
  const spriteOneActionList = useSelector((state) => state.Mulitpleactionorderlist.ActionEntrieoffirst);
  const spriteTwoActionList = useSelector((state) => state.Mulitpleactionorderlist.ActionEntrieofsecond);
  console.log(singleAction, spriteOneActionList, spriteTwoActionList)
  // Local state to hold actions for both sprites
  const [spriteOneActions, setSpriteOneActions] = useState(spriteOneActionList);
  const [spriteTwoActions, setSpriteTwoActions] = useState(spriteTwoActionList);
  const [singleSpriteAction, setSingleSpriteAction] = useState(singleAction);

  useEffect(() => {
    setSingleSpriteAction(singleAction);
  }, [singleAction]);

  useEffect(() => {
    setSpriteOneActions(spriteOneActionList);
  }, [spriteOneActionList]);

  useEffect(() => {
    setSpriteTwoActions(spriteTwoActionList);
  }, [spriteTwoActionList]);

  // console.log('sindldakdfjout sid e', singleSpriteAction, singleAction)

  const l = useSelector((state) => state.singleconnectivity.x);
  const m = useSelector((state) => state.singleconnectivity.y);
  const n = useSelector((state) => state.singleconnectivity.rotation);
  const [showalertforcolosion, setcollsionalert] = useState(0)
  const [currentPosition0, setCurrentPosition0] = useState({ x: l, y: m, rotation: n, repeat: 0 });
  const [currentPosition1, setCurrentPosition1] = useState({ x: 0, y: 0, rotation: 0, repeat: 0 });

  const controls0 = useAnimation(); // Separate controls for spirit 0
  const controls1 = useAnimation(); // Separate controls for spirit 1
  const dispatch = useDispatch();

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
      setShowAlert(true);
      dispatch(updatexory({ xory: 0 }))
    } else {
      dispatch(updateCanCreateMultipleSpirit({ id: 1 }));
      dispatch(updatexory({ xory: 1 }))
      setShowAlert(false);
    }
  };

  const checkCollisionDuringAnimation = () => {
    if (detectCollision(currentPosition0, currentPosition1)) {
      console.log('collison  detection found ')
      setcollsionalert(1);
      setTimeout(() => {
        setcollsionalert(0)
      }, 5000);
      const temp = spriteOneActions;
      setSpriteOneActions(spriteTwoActions);
      setSpriteTwoActions(temp);
      console.log("Collision detected, swapping properties!");
    }
  };

  useEffect(() => {
    // Only start the interval if checkstate is true
    if (checkstate) {
      const interval = setInterval(() => {
        checkCollisionDuringAnimation();
      }, 50); // Adjust the interval as needed

      // Cleanup interval when component unmounts or when checkstate changes
      return () => clearInterval(interval);
    }
    // Cleanup immediately if checkstate is false (don't start the interval)
    return () => { };
  }, [checkstate, currentPosition0, currentPosition1, spriteOneActions, spriteTwoActions]);


  const detectCollision = (spriteOnePos, spriteTwoPos) => {
    console.log('insde detect , ', spriteOnePos, spriteTwoPos)
    const spriteOneRect = {
      x: spriteOnePos.x,
      y: spriteOnePos.y,
      width: 50, // width of the sprite (estimate based on image)
      height: 50, // height of the sprite
    };
    const spriteTwoRect = {
      x: spriteTwoPos.x,
      y: spriteTwoPos.y,
      width: 50,
      height: 50,
    };

    return !(
      spriteOneRect.x > spriteTwoRect.x + spriteTwoRect.width ||
      spriteOneRect.x + spriteOneRect.width < spriteTwoRect.x ||
      spriteOneRect.y > spriteTwoRect.y + spriteTwoRect.height ||
      spriteOneRect.y + spriteOneRect.height < spriteTwoRect.y
    );
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  const getPreviewBounds = () => {
    const previewElement = document.getElementById('preview-section');
    const rect = previewElement.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
  };

  const onDragHandler = (event, info, id) => {
    console.log('funxiton runing ')
    const elementId = id;
    let { x, y } = info.point;

    const { left, top, width, height } = getPreviewBounds();

    x = x - left;
    y = y - top;

    const clampedX = clamp(x, 0, width);
    const clampedY = clamp(y, 0, height);

    if (elementId === 'spirit0') {
      setCurrentPosition0((prev) => ({ ...prev, x: clampedX, y: clampedY }));
    } else {
      setCurrentPosition1((prev) => ({ ...prev, x: clampedX, y: clampedY }));
    }

    // Check for collisions during the drag
    if (detectCollision(currentPosition0, currentPosition1)) {
      const temp = spriteOneActions;
      console.log('collison happen ', temp, spriteTwoActionList)
      setSpriteOneActions(spriteTwoActions);
      setSpriteTwoActions(temp);
      console.log('Collision detected, swapping actions!');
    }
  };
  const onDragStopHandler = (event, info, id) => {
    const elementId = id;
    let { x, y } = info.point;

    const { left, top, width, height } = getPreviewBounds();

    x = x - left;
    y = y - top;

    const clampedX = clamp(x, 0, width);
    const clampedY = clamp(y, 0, height);


    console.log('Dragged Element ID:', elementId);
    console.log('Transformed X Position:', clampedX);
    console.log('Transformed Y Position:', clampedY);
    console.log('Clamped Rotation:', currentPosition0.rotation);

    if (elementId === 'spirit0') {
      dispatch(updateConnectivity({ x: clampedX, y: clampedY, rotation: currentPosition0.rotation }));
      setCurrentPosition0((prev) => ({ ...prev, x: clampedX, y: clampedY }));
    } else {
      setCurrentPosition1({ x: clampedX, y: clampedY, rotation: currentPosition1.rotation });
    }

    // Collision check after dragging stops
    if (detectCollision(currentPosition0, currentPosition1)) {
      const temp = spriteOneActions;
      setSpriteOneActions(spriteTwoActions);
      setSpriteTwoActions(temp);
    }
  };



  const executeActionsforSingle = async (actions, controls, currentPosition, setCurrentPosition) => {
    const containerElement = document.getElementById('preview-section');
    const containerBounds = containerElement.getBoundingClientRect();
    console.log(containerBounds.width, 'width')
    for (const action of actions) {
      let newX = currentPosition.x;
      let newY = currentPosition.y;

      // Handle move_x
      if (action.move_x) {
        newX = parseFloat(currentPosition.x) + parseFloat(action.move_x);
        newX = clamp(newX, 0, containerBounds.width);

        await controls.start({
          x: Number(newX),
          transition: { duration: 1 },
        });
        setCurrentPosition((prev) => ({
          ...prev,
          x: Number(newX),
        }));
      }

      if (action.move_y) {
        newY = parseFloat(currentPosition.y) + parseFloat(action.move_y);
        // Clamp the new Y value within the bounds of the container
        newY = clamp(newY, 0, containerBounds.height);

        await controls.start({
          y: Number(newY),
          transition: { duration: 1 },
        });
        setCurrentPosition((prev) => ({
          ...prev,
          y: Number(newY),
        }));
      }

      // Handle move_x_y (combined x and y movement)
      if (action.move_x_y) {
        newX = parseFloat(currentPosition.x) + parseFloat(action.move_x_y.x);
        newY = parseFloat(currentPosition.y) + parseFloat(action.move_x_y.y);

        // Clamp the new X and Y values within the bounds of the container
        newX = clamp(newX, 0, containerBounds.width);
        newY = clamp(newY, 0, containerBounds.height);

        await controls.start({
          x: Number(newX),
          y: Number(newY),
          transition: { duration: 1 },
        });

        setCurrentPosition((prev) => ({
          x: clamp(parseFloat(prev.x) + parseFloat(action.move_x_y.x), 0, containerBounds.width),
          y: clamp(parseFloat(prev.y) + parseFloat(action.move_x_y.y), 0, containerBounds.height),
        }));
      }

      // Handle rotate_clockwise (no boundary check necessary for rotation)
      if (action.rotate_clockwise) {
        const newRotation = Number(currentPosition.rotation) + Number(action.rotate_clockwise);
        console.log(action.rotate_clockwise, newRotation, 'clajdodfjadij')
        await controls.start({
          rotate: Number(newRotation),
          transition: { duration: 2 },
        });
        setCurrentPosition((prev) => ({
          ...prev,
          rotation: Number(newRotation),
        }));
      }

      // Handle rotate_anticlockwise (no boundary check necessary for rotation)
      if (action.rotate_anticlockwise) {
        console.log(action.rotate_anticlockwise)
        const newRotation = Number(currentPosition.rotation) - Number(action.rotate_anticlockwise);
        console.log(newRotation, 'new rotatoio')
        await controls.start({
          rotate: Number(newRotation),
          transition: { duration: 2 },
        });
        setCurrentPosition((prev) => ({
          ...prev,
          rotation: Number(newRotation),
        }));
      }
    }
  };

  const executeActionsForMultiple = async (
    actions0, controls0, currentPosition0, setCurrentPosition0,
    actions1, controls1, currentPosition1, setCurrentPosition1
  ) => {
    const containerElement = document.getElementById('preview-section');
    const containerBounds = containerElement.getBoundingClientRect();

    // Helper function to execute actions for a single set of animations
    const executeActionsForSingle = async (actions, controls, currentPosition, setCurrentPosition) => {
      for (const action of actions) {
        let newX = currentPosition.x;
        let newY = currentPosition.y;

        // Handle move_x
        if (action.move_x) {
          newX = parseFloat(currentPosition.x) + parseFloat(action.move_x);
          newX = clamp(newX, 0, containerBounds.width);
          await controls.start({ x: Number(newX), transition: { duration: 1 } });
          setCurrentPosition((prev) => ({ ...prev, x: Number(newX) }));
        }

        // Handle move_y
        if (action.move_y) {
          newY = parseFloat(currentPosition.y) + parseFloat(action.move_y);
          newY = clamp(newY, 0, containerBounds.height);
          await controls.start({ y: Number(newY), transition: { duration: 1 } });
          setCurrentPosition((prev) => ({ ...prev, y: Number(newY) }));
        }

        // Handle move_x_y
        if (action.move_x_y) {
          newX = parseFloat(currentPosition.x) + parseFloat(action.move_x_y.x);
          newY = parseFloat(currentPosition.y) + parseFloat(action.move_x_y.y);
          newX = clamp(newX, 0, containerBounds.width);
          newY = clamp(newY, 0, containerBounds.height);
          await controls.start({ x: Number(newX), y: Number(newY), transition: { duration: 1 } });
          setCurrentPosition((prev) => ({
            x: clamp(parseFloat(prev.x) + parseFloat(action.move_x_y.x), 0, containerBounds.width),
            y: clamp(parseFloat(prev.y) + parseFloat(action.move_x_y.y), 0, containerBounds.height),
          }));
        }

        // Handle rotate_clockwise
        if (action.rotate_clockwise) {
          const newRotation = Number(currentPosition.rotation) + Number(action.rotate_clockwise);
          await controls.start({ rotate: Number(newRotation), transition: { duration: 2 } });
          setCurrentPosition((prev) => ({ ...prev, rotation: Number(newRotation) }));
        }

        // Handle rotate_anticlockwise
        if (action.rotate_anticlockwise) {
          const newRotation = Number(currentPosition.rotation) - Number(action.rotate_anticlockwise);
          await controls.start({ rotate: Number(newRotation), transition: { duration: 2 } });
          setCurrentPosition((prev) => ({ ...prev, rotation: Number(newRotation) }));
        }
      }
    };

    // Run both sets of actions simultaneously using Promise.all
    await Promise.all([
      executeActionsForSingle(actions0, controls0, currentPosition0, setCurrentPosition0),
      executeActionsForSingle(actions1, controls1, currentPosition1, setCurrentPosition1),
    ]);
  };


  const runonoroff = useSelector((state) => state.runtracker.RunonorOff)
  console.log("runonoroff", runonoroff)

  const handleActionExecution = async () => {
    if (runonoroff) {
      if (!checkstate) {
        console.log(singleSpriteAction, 'singlespirer');

        await executeActionsforSingle(singleSpriteAction, controls0, currentPosition0, setCurrentPosition0);

        dispatch(updateRunOnOrOff({ onoroff: 0 }));

      } else {

        await executeActionsForMultiple(
          spriteOneActions, controls0, currentPosition0, setCurrentPosition0,
          spriteTwoActions, controls1, currentPosition1, setCurrentPosition1
        );
        dispatch(updateRunOnOrOff({ onoroff: 0 }));
      }
    }
  };

  handleActionExecution();


  const spiritRef = useRef(null);

  const [dragConstraints, setDragConstraints] = useState({
    left: 0,
    right: window.innerWidth,
    top: 0,
    bottom: window.innerHeight,
  });

  // Update drag constraints based on the spirit's dimensions
  useEffect(() => {
    const updateConstraints = () => {
      const spiritWidth = spiritRef.current ? spiritRef.current.offsetWidth : 0;
      const spiritHeight = spiritRef.current ? spiritRef.current.offsetHeight : 0;

      setDragConstraints({
        left: 0,
        right: window.innerWidth - spiritWidth,
        top: 0,
        bottom: window.innerHeight - spiritHeight,
      });
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);
  const reff = useRef(null);
  //showalertforcolosion
  return (
    <div className="flex-none h-full p-2">
      <div className="">
      {showalertforcolosion ? <Alert severity="warning" >Collision has occured .</Alert>
        : null}
      </div>
      <div className="flex justify-between gap-10 px-2 text-xl mb-3 items-center">
        <div className="border px-1 rounded-lg py-">Preview Section</div>
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
          <button className="border px-3 py-1 bg-red-300 rounded-2xl" onClick={handleClick}>+ CREATE NEW</button>
        </div>
      </div>
      {showAlert && (
        <div className="mr-9">
          <Alert severity="warning">Go in Create single list mode to create multiple lists.</Alert>
        </div>
      )}
      <div className="relative w-fit h-full bg-red-500" ref={reff} id="preview-section">
        {!checkstate ? (
          <motion.div
            // Attach the ref here
            drag
            dragConstraints={reff}
            dragMomentum={false}// Use state for constraints
            onDragEnd={(event, info) => onDragStopHandler(event, info, "spirit0")}
            animate={controls0}
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
            }}
            className="absolute top-0 left-0"
            id="spirit0"
          >
            <CatSprite />
            <div>Spirit 0</div>
          </motion.div>
        ) : (
          <>
            <motion.div
              drag
              dragConstraints={reff}
              dragMomentum={false}
              onDrag={(event, info) => onDragHandler(event, info, "spirit0")}
              onDragEnd={(event, info) => onDragStopHandler(event, info, "spirit0")}
              animate={controls0}
              initial={{
                x: 0,
                y: 0,
                rotate: 0,
              }}
              className="absolute top-0 left-0"
              id="spirit0"
            >
              <CatSprite />
              <div>Spirit 0</div>
            </motion.div>

            <motion.div
              // Attach the ref here
              drag
              dragConstraints={reff}
              dragMomentum={false}// Use state for constraints
              onDrag={(event, info) => onDragHandler(event, info, "spirit1")}
              onDragEnd={(event, info) => onDragStopHandler(event, info, "spirit1")}
              animate={controls1}
              initial={{
                x: 0,
                y: 0,
                rotate: 0,
              }}
              className="absolute top-0 left-0"
              id="spirit1"
            >
              <CatSprite />
              <div>Spirit 1</div>
            </motion.div>

          </>
        )}
      </div>
    </div>
  );
}
