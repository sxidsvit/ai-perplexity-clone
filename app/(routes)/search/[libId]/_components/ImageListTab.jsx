import Image from 'next/image'
import React from 'react'

function ImageListTab({ chat }) {
    return (
        <div className='flex gap-5 flex-wrap  mt-6 '>
            {chat.searchResult.map((item, index) => (

                <img src={item?.original || item.img} alt={item.title}
                    width={200}
                    height={100}
                    key={index}
                    onClick={() => window.open(item.original, '_blank')}
                    className='bg-accent rounded-xl p-3 text-sm  object-contain cursor-pointer text-center h-[100px]'
                />

            ))}
        </div>
    )
}

export default ImageListTab