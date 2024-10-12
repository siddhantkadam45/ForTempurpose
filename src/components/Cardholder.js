import React from 'react'

export default function Cardhold({ Createindividuallist }) {
    return (
        <div className='border-2 min-w-72	shrink-0'>
            <div className='border-2 p-2 flex flex-row gap-2 m-3 justify-center items-center'>
                {Createindividuallist}
            </div>
        </div>
    )
}
