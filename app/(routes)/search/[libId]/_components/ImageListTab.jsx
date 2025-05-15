import Image from 'next/image'
import React from 'react'

function ImageListTab({ chat }) {
    return (
        <div className='flex gap-5 flex-wrap mt-6'>
            {chat.searchResult.map((item, index) => (

                <img src={item?.original} alt={item.title}
                    width={200}
                    height={200}
                    key={index}
                    onClick={() => window.open(item.original, '_blank')}
                    className='bg-accent rounded-xl object-contain w-[200px] h-full cursor-pointer'
                />

            ))}
        </div>
    )
}

export default ImageListTab