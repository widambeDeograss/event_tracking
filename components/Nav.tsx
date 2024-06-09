"use client";
import React from 'react';
import {
    VideoCameraAddOutlined,
    VideoCameraOutlined, 
    TeamOutlined,
    HomeOutlined
  } from "@ant-design/icons";
  import Link from 'next/link';
  import {  usePathname } from 'next/navigation';
import { Colors } from '@/constants/colors';
  
  // nav data
  export const navData = [
    { name: 'home', path: '/', icon: <HomeOutlined /> },
    { name: 'events', path: '/events', icon: <VideoCameraOutlined /> },
    { name: 'users', path: '/users', icon: <TeamOutlined /> },
    { name: 'addEvent', path: '/events/addevent', icon: <VideoCameraAddOutlined /> }
  ];



const Nav = () => {
    const path = usePathname();
    console.log('====================================');
    console.log(path);
    console.log('====================================');

  return (
    <nav className='flex flex-col p items-center xl:justify-center gap-y-4 fixed h-max bottom-0  mt-auto  xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen'>
        <div className='flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-8  h-[80px] xl:h-80 bg-white/10 backdrop-blur-sm text-3xl xl:text-xl
     rounded-xl '>
        {navData.map((link, index) => {
           return <Link
           className={`${link.path === path && `text-red-600`} relative flex items-center group hover:text-red-500  `}
            href={link.path }
            key={index}
            >
                <div className='absolute pr-14 right-0 hidden xl:group-hover:flex'>
                    <div className='bg-white relative flex text-black p-1 rounded-[3px] '>
                        <div className='text-[8px] leading-none font-semibold capitalize'>{link.name}</div>
                        <div className='border-solid border-l-white border-l-8 border-y-transparent absolute right-2'> </div>
                        </div>
                </div>
            <div>{link.icon }</div>
           </Link>  
        })} 
    </div>
    </nav>
  )
}

export default Nav