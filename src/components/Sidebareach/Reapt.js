import React from 'react'
import Icon from "../Icon";

export default function Reapt({handleChange,value,id}) {
    return (
        <div>
            <div className="flex flex-col flex-wrap bg-blue-500 text-white px-2 py-2 my-2 text-sm cursor-pointer gap-2 border rounded-md">
                <div className=" flex ">
                    <p>Repeat : </p>
                    <input type="number" placeholder='0' id={id}
                        onChange={handleChange} className="w-20 mx-2 px-2 border rounded-md text-black" />
                </div>
            </div>
        </div>
    )
}
