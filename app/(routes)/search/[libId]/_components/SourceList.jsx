import Image from 'next/image'
import React from 'react'

function SourceList({ webResult, loadingSearch }) {
    return (
        <div className='flex gap-2 flex-wrap mt-5'>
            {webResult?.map((item, index) => (
                <div key={index} className='p-3 bg-accent rounded-lg
                    w-[200px] cursor-pointer hover:bg-[#e1e3da]'
                    onClick={() => window.open(item.url, '_blank')}
                >
                    <div className='flex gap-2 items-center'>
                        <Image src={item?.img}
                            alt={item?.name}
                            width={20}
                            height={20}
                        />
                        <h2 className='text-xs text-gray-500'>{item?.long_name}</h2>
                    </div>
                    <h2 className='line-clamp-2 text-black text-xs'>{item?.title}</h2>
                </div>
            ))}
            {webResult?.length == 0 || !webResult && <div className='flex flex-wrap gap-2'>
                {[1, 2, 3, 4].map((item, index) => (
                    <div className='w-[200px] h-[100px] rounded-2xl bg-accent animate-pulse' key={index}>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default SourceList