'use client'
import React, { useEffect, useState } from 'react';
import { Table, Spin, Card } from 'antd';
import axios from 'axios';
import { BASE_URL } from '@/constants/baseUrl';

const EventSetupRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + 'api/event-setup');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Artist',
      dataIndex: 'artist',
      key: 'artist',
      render: (artist:any) => artist.username, // assuming artist is an object with a username field
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text:any) => new Date(text).toLocaleString(),
    },
  ];

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1></h1>
      <Card title="Event Setup Requests">
      <Table columns={columns} dataSource={data} rowKey="id" />
      </Card>
    </div>
  );
};

export default EventSetupRequests;
