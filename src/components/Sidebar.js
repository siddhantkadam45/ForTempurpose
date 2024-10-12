import React, { useState } from "react";
import Icon from "./Icon";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Clockwise from "./Sidebareach/Clockwise";
import Anticlockwise from "./Sidebareach/Anticlockwise";
import Movex from "./Sidebareach/Movex";
import Movey from "./Sidebareach/Movey";
import Reapt from "./Sidebareach/Reapt";
import Movexy from "./Sidebareach/Movexy";
// import { useState } from "react";
export default function Sidebar() {

	const [Sidebaritems, SetSidebaritems] = useState([
		'move_x',
		'move_y',
		'rotate_clockwise',
		'rotate_anticlockwise',
		'move_x_y',
		'repeat'
	])
	let cnt =0;
	function handleChange() {
		console.log('hi inside ')
		console.log(cnt++)
	}
	// console.log('ite', items)/
	return (
		<div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
			<div className="font-bold mb-5 text-center  border-2 rounded text-white bg-green-400 p-2 w-auto">
				Side Bar
			</div>

			<div className="font-bold border py-1 px-2 bg-red-400 rounded-md"> {"Events"} </div>
			<div className="flex flex-row flex-wrap bg-yellow-500 text-white  my-2 text-sm cursor-pointer border rounded-md px-2 py-2">
				{"When "}
				<Icon name="flag" size={15} className="text-green-600 mx-2" />
				{"clicked"}
			</div>

			<div className="flex flex-row flex-wrap bg-yellow-500 text-white  my-2 text-sm cursor-pointer px-2 py-2 rounded-md">
				{"When this sprite clicked"}
			</div>

			<div className="font-bold"> {"Motion"} </div>

			<div>
				<Droppable droppableId="sidebar">
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppabelProps}>
							{Sidebaritems.map((item, index) =>
								<Draggable draggableId={String(item)} index={index} key={index}>
									{(provided) => (
										<div key={index} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} >
											{item == "rotate_clockwise" ? <Clockwise value={0} handleChange={handleChange} /> : null}
											{item == 'rotate_anticlockwise' ? <Anticlockwise value={0} handleChange={handleChange} /> : null}
											{item == "move_x" ? <Movex value={0} handleChange={handleChange} /> : null}
											{item == "move_y" ? <Movey value={0} handleChange={handleChange} /> : null}
											{item == "repeat" ? <Reapt value={0} handleChange={handleChange} /> : null}
											{item == "move_x_y" ? <Movexy value={0} handleChange={handleChange} /> : null}
										</div>
									)}
								</Draggable>
							)}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</div>
	);
}
