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



export default function Tempprev() {

    const checkstate = useSelector((state) => state.checkmultiplecancreate.isMultipleEnabled);
    const firstspirit = useSelector((state) => state.Characteractionslist.spiritone);
    const secondspirit = useSelector((state) => state.Characteractionslist.spirittwo);
    const [showAlert, setShowAlert] = useState(false);


    const singleAction = useSelector((state) => state.orderlistsingleaction.Actionorderlist);
    const spriteOneActionList = useSelector((state) => state.Mulitpleactionorderlist.ActionEntrieoffirst);
    const spriteTwoActionList = useSelector((state) => state.Mulitpleactionorderlist.ActionEntrieofsecond);
    // console.log(singleAction, spriteOneActionList, spriteTwoActionList)
    const collisoarrayfirst = useSelector((state) => state.Mulitpleactionorderlist.swappedActionListA)
    const collisoarraysecond = useSelector((state) => state.Mulitpleactionorderlist.swappedActionListB)

    // console.log(collisoarraysecond, collisoarrayfirst, 'colliosion')


    const l = useSelector((state) => state.singleconnectivity.x);
    const m = useSelector((state) => state.singleconnectivity.y);
    const n = useSelector((state) => state.singleconnectivity.rotation);
    const [showalertforcolosion, setcollsionalert] = useState(0)
    const [currentPosition0, setCurrentPosition0] = useState({ x: l, y: m, rotation: n, repeat: 0 });
    const [currentPosition1, setCurrentPosition1] = useState({ x: 0, y: 0, rotation: 0, repeat: 0 });

    const controls0 = useAnimation();
    const controls1 = useAnimation();
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
    //collsion detection funciton 
    const detectCollision = (spriteOnePos, spriteTwoPos) => {
        console.log('insde detect , ', spriteOnePos, spriteTwoPos)
        const spriteOneRect = {
            x: spriteOnePos.x,
            y: spriteOnePos.y,
            width: 50,
            height: 50,
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
    if (detectCollision(currentPosition0, currentPosition1)) {
        console.log('inital collsion happen ')
        // return;
    }
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
    let spriteOnePosition = { x: currentPosition0.x, y: currentPosition0.y };
    let spriteTwoPosition = { x: currentPosition1.x, y: currentPosition1.y };

    const onDragHandler = async (event, info, id) => {
        console.log('funxiton runing ')
        console.log('Function running');
        const elementId = id;
        let { x, y } = info.point;

        const { left, top, width, height } = getPreviewBounds();

        x = x - left;
        y = y - top;

        const clampedX = clamp(x, 0, width);
        const clampedY = clamp(y, 0, height);

        // Update local position variables during drag
        if (elementId === 'sprite0') {
            spriteOnePosition = { x: clampedX, y: clampedY };
        } else {
            spriteTwoPosition = { x: clampedX, y: clampedY };
        }
        console.log('spritwo and one ', spriteTwoPosition, spriteOnePosition)
        // Check for collisions during the drag
        if (detectCollision(spriteOnePosition, spriteTwoPosition)) {
            console.log('colln areay first,second', collisoarrayfirst, collisoarraysecond)
            console.log('Collision detected, swapping actions!');
            const obj1 = {
                x: spriteOnePosition.x,
                y: spriteOnePosition.y,
                rotation: currentPosition0.rotation
            }

            const obj2 = {
                x: spriteTwoPosition.x,
                y: spriteTwoPosition.y,
                rotation: currentPosition0.rotation
            }
            await exectuemultipleforcollision(collisoarrayfirst, obj1, collisoarraysecond, obj2)
            // await executeActionsForMultiple(collisoarrayfirst, controls0, currentPosition0, setCurrentPosition0, collisoarraysecond, controls1, currentPosition1, setCurrentPosition1)

        }
    };

    const resetAndStartControls = async (controls, newState) => {
        // Stop any ongoing animations
        controls.stop();

        // Optionally reset the state manually to a default state
        await controls.start({
            x: newState.x || 0,
            y: newState.y || 0,
            rotate: newState.rotation || 0,
            transition: { duration: 0 } // Instant reset
        });

        // Now you can start a new animation with a fresh state
    };

    const exectuemultipleforcollision = async (collisoarrayfirst, obj1, collisoarraysecond, obj2) => {


        // Usage before executing new animations
        await resetAndStartControls(controls0, { x: obj1.x, y: obj1.y, rotation: obj1.rotation });
        await resetAndStartControls(controls1, { x: obj2.x, y: obj2.y, rotation: obj1.rotation });
        await Promise.all[
            exectesinglcollision(collisoarrayfirst, controls0, obj1, setCurrentPosition0),
            exectesinglcollision(collisoarraysecond, controls1, obj2, setCurrentPosition1)
        ]
    }

    const exectesinglcollision = async (actions, controls, obj, setCurrentPosition) => {
        const containerElement = document.getElementById('preview-section');
        const containerBounds = containerElement.getBoundingClientRect();
        let actionSequence = [];
        for (const action of actions) {
            console.log('actions ', action);

            if (action.repeat) {
                console.log('action se ', actionSequence);
                // Create a copy of the actionSequence at this point in time
                const actionsToRepeat = [...actionSequence]; // Shallow copy to prevent modification while repeating
                if (actionSequence.length <= 0) continue;
                // Repeat the stored actions the specified number of times
                for (let repeatCount = 0; repeatCount < Number(action.repeat); repeatCount++) {
                    console.log(repeatCount, 'action repeat count');
                    console.log(actionsToRepeat, 'action sto repeat lik');
                    for (const repeatAction of actionsToRepeat) {
                        console.log('dfakdj', repeatAction);
                        await executeSingleAction(repeatAction, controls, obj, containerBounds);
                    }
                }
                continue;
            }

            // Handle the current action
            await executeSingleAction(action, controls, obj, containerBounds);

            // Store the action in the actionSequence for potential repetition
            actionSequence.push(action);
        }

        // Update the position state after all actions are complete
        setCurrentPosition({
            x: obj.x,
            y: obj.y,
            rotation: obj.rotation
        });
    }

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

        // Collision check after dragging stops
        // const obj3 = {
        //     x: parseFloat(clampedX),
        //     y:parseFloat(clampedY),
        //     rotation:currentPosition0.rotation
        // }
        // const obj4 = {
        //     x: parseFloat(clampedX),
        //     y:parseFloat(clampedY),
        //     rotation:currentPosition0.rotation
        // }
        if (detectCollision({currentPosition0}, currentPosition1)) {
            console.log('collsion detected ')
            // return;
            // executeActionsForMultiple(collisoarrayfirst, controls0, currentPosition0, setCurrentPosition0, collisoarraysecond, controls1, currentPosition1, setCurrentPosition1)
        }

        if (elementId === 'spirit0') {
            dispatch(updateConnectivity({ x: parseFloat(clampedX), y: parseFloat(clampedY), rotation: Number(currentPosition0.rotation) }));
            setCurrentPosition0((prev) => ({ ...prev, x: parseFloat(clampedX), y: parseFloat(clampedY) }));
        } else {
            setCurrentPosition1({ x: parseFloat(clampedX), y: parseFloat(clampedY), rotation: Number(currentPosition1.rotation) });
        }

        if (detectCollision(currentPosition0, currentPosition1)) {
            console.log('collsion detected ')
        }
    };



    const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

    const executeActionsForMultiple = async (collisoarrayfirst, controls0, currentPosition0, setCurrentPosition0, collisoarraysecond, controls1, currentPosition1, setCurrentPosition1) => {
        await Promise.all([
            executeActionsforSingle(collisoarrayfirst, controls0, currentPosition0, setCurrentPosition0),
            executeActionsforSingle(collisoarraysecond, controls1, currentPosition1, setCurrentPosition1)
        ])

    }

    const executeActionsforSingle = async (actions, controls, currentPosition, setCurrentPosition) => {
        const containerElement = document.getElementById('preview-section');
        const containerBounds = containerElement.getBoundingClientRect();

        let actionSequence = []; // To store the sequence of actions that need to be repeated
        let obj = {
            x: currentPosition.x,
            y: currentPosition.y,
            rotation: currentPosition.rotation
        };

        for (const action of actions) {
            console.log('actions ', action);

            if (action.repeat) {
                console.log('action se ', actionSequence);
                // Create a copy of the actionSequence at this point in time
                const actionsToRepeat = [...actionSequence]; // Shallow copy to prevent modification while repeating
                if (actionSequence.length <= 0) continue;
                // Repeat the stored actions the specified number of times
                for (let repeatCount = 0; repeatCount < Number(action.repeat); repeatCount++) {
                    console.log(repeatCount, 'action repeat count');
                    console.log(actionsToRepeat, 'action sto repeat lik');
                    for (const repeatAction of actionsToRepeat) {
                        console.log('dfakdj', repeatAction);
                        await executeSingleAction(repeatAction, controls, obj, containerBounds);
                    }
                }
                continue;
            }

            // Handle the current action
            await executeSingleAction(action, controls, obj, containerBounds);

            // Store the action in the actionSequence for potential repetition
            actionSequence.push(action);
        }

        // Update the position state after all actions are complete
        setCurrentPosition({
            x: obj.x,
            y: obj.y,
            rotation: obj.rotation
        });
    };


    const executeSingleAction = async (action, controls, obj, containerBounds) => {
        let newX = obj.x;
        let newY = obj.y;

        if (action.move_x) {
            newX = parseFloat(obj.x) + parseFloat(action.move_x);
            newX = clamp(newX, 0, containerBounds.width);

            await controls.start({
                x: Number(newX),
                transition: { duration: 1 },
            });
            obj.x = newX;
        }

        if (action.move_y) {
            newY = parseFloat(obj.y) + parseFloat(action.move_y);
            newY = clamp(newY, 0, containerBounds.height);

            await controls.start({
                y: Number(newY),
                transition: { duration: 1 },
            });
            obj.y = newY;
        }

        if (action.move_x_y) {
            newX = parseFloat(obj.x) + parseFloat(action.move_x_y.x);
            newY = parseFloat(obj.y) + parseFloat(action.move_x_y.y);

            newX = clamp(newX, 0, containerBounds.width);
            newY = clamp(newY, 0, containerBounds.height);

            await controls.start({
                x: Number(newX),
                y: Number(newY),
                transition: { duration: 1 },
            });
            obj.x = newX;
            obj.y = newY;
        }

        if (action.rotate_clockwise) {
            const newRotation = Number(obj.rotation) + Number(action.rotate_clockwise);

            await controls.start({
                rotate: Number(newRotation),
                transition: { duration: 1 },
            });
            obj.rotation = newRotation;
        }

        if (action.rotate_anticlockwise) {
            const newRotation = Number(obj.rotation) - Number(action.rotate_anticlockwise);

            await controls.start({
                rotate: Number(newRotation),
                transition: { duration: 1 },
            });
            obj.rotation = newRotation;
        }
    };

    // Helper function to execute a single action

    // const executeSingleAction = async (action, controls, currentPosition, setCurrentPosition, containerBounds) => {
    //     let newX = currentPosition.x;
    //     let newY = currentPosition.y;
    //     console.log('insdie with actions ', action)
    //     // Handle move_x
    //     if (action.move_x) {
    //         newX = parseFloat(currentPosition.x) + parseFloat(action.move_x);
    //         newX = clamp(newX, 0, containerBounds.width);

    //         await controls.start({
    //             x: Number(newX),
    //             transition: { duration: 1 },
    //         });
    //         setCurrentPosition((prev) => ({
    //             ...prev,
    //             x: Number(newX),
    //         }));
    //     }

    //     // Handle move_y
    //     if (action.move_y) {
    //         newY = parseFloat(currentPosition.y) + parseFloat(action.move_y);
    //         newY = clamp(newY, 0, containerBounds.height);

    //         await controls.start({
    //             y: Number(newY),
    //             transition: { duration: 1 },
    //         });
    //         setCurrentPosition((prev) => ({
    //             ...prev,
    //             y: Number(newY),
    //         }));
    //     }

    //     // Handle move_x_y
    //     if (action.move_x_y) {
    //         newX = parseFloat(currentPosition.x) + parseFloat(action.move_x_y.x);
    //         newY = parseFloat(currentPosition.y) + parseFloat(action.move_x_y.y);

    //         newX = clamp(newX, 0, containerBounds.width);
    //         newY = clamp(newY, 0, containerBounds.height);

    //         await controls.start({
    //             x: Number(newX),
    //             y: Number(newY),
    //             transition: { duration: 1 },
    //         });

    //         setCurrentPosition((prev) => ({
    //             x: newX,
    //             y: newY,
    //         }));
    //     }

    //     // Handle rotate_clockwise
    //     if (action.rotate_clockwise) {
    //         const newRotation = Number(currentPosition.rotation) + Number(action.rotate_clockwise);

    //         await controls.start({
    //             rotate: Number(newRotation),
    //             transition: { duration: 1 },
    //         });
    //         setCurrentPosition((prev) => ({
    //             ...prev,
    //             rotation: newRotation,
    //         }));
    //     }

    //     // Handle rotate_anticlockwise
    //     if (action.rotate_anticlockwise) {
    //         const newRotation = Number(currentPosition.rotation) - Number(action.rotate_anticlockwise);

    //         await controls.start({
    //             rotate: Number(newRotation),
    //             transition: { duration: 1 },
    //         });
    //         setCurrentPosition((prev) => ({
    //             ...prev,
    //             rotation: newRotation,
    //         }));
    //     }
    //     // dispatch(updateRunOnOrOff({ onoroff: 0 }));
    // };

    const runonoroff = useSelector((state) => state.runtracker.RunonorOff)
    console.log(runonoroff, 'runonoroff')

    const handleActionExecution = async () => {
        if (runonoroff) {
            if (!checkstate) {
                console.log(singleAction, 'spirite one ');
                dispatch(updateRunOnOrOff({ onoroff: 0 }));
                await executeActionsforSingle(singleAction, controls0, currentPosition0, setCurrentPosition0);
                // dispatch(updateRunOnOrOff({ onoroff: 0 }));
            } else {
                console.log(spriteOneActionList, spriteTwoActionList, "spriteOneActionList")
                await executeActionsForMultiple(
                    spriteOneActionList, controls0, currentPosition0, setCurrentPosition0,
                    spriteTwoActionList, controls1, currentPosition1, setCurrentPosition1
                );
                dispatch(updateRunOnOrOff({ onoroff: 0 }));
            }
        }
    };


    // spriteOneActionList = useSelector((state) => state.Mulitpleactionorderlist.ActionEntrieoffirst);
    // const spriteTwoActionList 
    handleActionExecution();

    const spiritRef = useRef(null)
    const reff = useRef(null);

    const [dragConstraints, setDragConstraints] = useState({
        left: 0,
        right: window.innerWidth,
        top: 0,
        bottom: window.innerHeight,
    });

    useEffect(() => {
        const updateConstraints = () => {
            const spiritWidth = spiritRef.current ? spiritRef.current.offsetWidth : 0;
            const spiritHeight = spiritRef.current ? spiritRef.current.offsetHeight : 0;
            // console.log(spiritWidth, spiritHeight, ' : ', window.innerHeight, window.innerWidth)
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



    return (
        <div className="flex flex-col w-full h-full p-2">
            <div>
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
            </div>
            <div className="relative w-full h-full ">
                <div className="relative w-full h-full bg-green-500" ref={spiritRef} id="preview-section">
                    {!checkstate ? (
                        <motion.div
                            // Attach the ref here
                            drag
                            dragConstraints={dragConstraints}
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
                                dragConstraints={dragConstraints}
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
                                dragConstraints={dragConstraints}
                                dragMomentum={false}
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
        </div>
    );
}
