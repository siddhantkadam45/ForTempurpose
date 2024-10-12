import React from 'react'
import Icon from "../Icon";

export default function Anticlockwise({handleChange,value,id}) {
    return (
        <div>
            <div className="flex flex-col flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer gap-2 border rounded-md">

                <div className=" flex gap-3 ">
                    <p>Rotate By: </p>
                    <input type="number" placeholder='0' id={id} onChange={handleChange}
                        className="w-20 mx-2 px-2 border rounded-md text-black" />
                </div>

                <div className="flex flex-row gap-2 border-1 bg-blue-600 p-1 items-center mb-1 rounded-md">
                    {"Turn "}
                    <Icon name="undo" size={15} className="text-white mx-2" />
                    {"15 degrees"}
                </div>
            </div>
        </div>
    )
}
