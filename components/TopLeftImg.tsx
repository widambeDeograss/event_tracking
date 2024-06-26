import React from 'react';
import Image from 'next/image';

const TopLeftImg = () => {
  return (
    <div className='absolute left-0 top-0 mix-blend-lighten z-10 xl:w-[400px] opacity-50'>
   <Image src='/top-left-img.png' width={400} height={400} alt='top'/>
    </div>
  )
}

export default TopLeftImg;  