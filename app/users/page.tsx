'use client'
import React, { useEffect, useState } from 'react';
import { Table, Card, Avatar } from 'antd';
import axios from 'axios';
import { BASE_URL, MEDIA_URL } from '@/constants/baseUrl';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(BASE_URL +'api/auth/user-information?querytype=all'); 
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the users!', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
      render: (profile:any) => (
        <Avatar src={profile ? `${MEDIA_URL}/uploads/${profile}` : '/default-avatar.png'} />
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender:any) => (gender === 'M' ? 'Male' : 'Female'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role:number) => {
        switch (role) {
          case 1:
            return 'Admin';
          case 2:
            return 'Artist';
          case 3:
            return 'Normal User';
          default:
            return 'Unknown';
        }
      },
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Biography',
      dataIndex: 'biography',
      key: 'biography',
      render: (biography:string) => biography ? `${biography.substring(0, 50)}${biography.length > 50 ? '...' : ''}` : '',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at:any) => new Date(created_at).toLocaleString(),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Card className='p-1' title="Users List">
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default UsersPage;
