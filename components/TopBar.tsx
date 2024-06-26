'use client';

import React from 'react';
import { Layout, Menu, Dropdown, Avatar, Typography, Space, Badge, MenuProps } from 'antd';
import { BellOutlined, UserOutlined, LogoutOutlined, ExclamationCircleOutlined, StarOutlined } from '@ant-design/icons';
import modal from 'antd/es/modal';
import { useAuth } from '@/context';

const { Header } = Layout;
const { Title } = Typography;

const TopBar = () => {
  const token =localStorage.getItem('authToken');
  const {user} = useAuth();
    const items: MenuProps["items"] = [
        {
          key: "1",
          label: (
              <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/profile"

              >
                Event Tracking
              </a>
          ),
        },
        {
          key: "2",
          label: (
              <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.aliyun.com"
              >
               Sytem Admin
              </a>
          ),
          icon: <StarOutlined />,
          disabled: true,
        },
        {
          key: "4",
          danger: true,
          icon: <LogoutOutlined />,
          label: "Log out",
          onClick:() => {
            modal.confirm({
              title: 'Confirm',
              icon: <ExclamationCircleOutlined />,
              content: 'Log out from EventTracking system',
              okText: 'OK',
              okType:"danger",
              cancelText: 'cancel',
              onOk:() => {
                localStorage.clear();
                window.location.reload()
              }
            });
          }
        },
      ];
    
      
 const itemsNot:any = [
  {
      key: 'Edit your information in a swipe',
      label:
        'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
   
    },
    {
    
      key: 'It is a long established fact',
      label: 'that a reader will be distracted by the readable.',
    },
    {
      key: 'There are many variations',
      label: 'of passages of Lorem Ipsum available, but the majority have suffered',
    },
   
]
      
  
    return (
    <>
     {token &&  <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='mx-2 rounded-2xl my-5 bg-white/20 xl:mx-20 sm:mx-2'>
        <p  className='text-sm leading-none font-bold text-white'>Event Tracking System</p>
        
        <Space size="middle">
          <span  className="flex flex-col text-white">
            <p className='text-xs font-semibold'>{user?.email}</p>
            <p className='text-xs'>system admin</p>
          </span>
          <Dropdown menu={{ items }} >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
              <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon={<UserOutlined />}  size={40}/>
              </Space>
            </a>
          </Dropdown>
        </Space>
      </Header>}
    </>
    );
  };
  
  export default TopBar;