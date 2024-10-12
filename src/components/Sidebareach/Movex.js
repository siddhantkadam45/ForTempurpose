import React from 'react'
import Icon from "../Icon";

export default function Movex({ handleChange, value, id }) {
    // console.log(id, 'id')
    return (
        <div>
            <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2  mb-1 text-sm cursor-pointer rounded-md">
                <div className='flex flex-rwo p-2 pl-1'>
                    <p className='text-md'>Move X</p>
                    <input type="number" placeholder='0' id={id}
                        onChange={handleChange} className="w-20 mx-2 px-2 border rounded-md text-black" />
                    <p className='text-md'>steps</p>
                </div>
            </div>
        </div>
    )
}
