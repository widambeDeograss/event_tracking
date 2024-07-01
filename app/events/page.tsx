'use client'
import { Card, Table, Button, Popconfirm, message } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import {useRouter} from "next/navigation";
import { BASE_URL, MEDIA_URL } from '@/constants/baseUrl';

const EventsListPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function loadEvents() {
  await  axios.get(BASE_URL +'api/events?querytype=all')
      .then(response => {
        setDataSource(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the events!', error);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = (id:any) => {
    axios.delete(`${BASE_URL}api/events/${id}`)
      .then(() => {
        message.success('Event deleted successfully');
        loadEvents();
      })
      .catch(error => {
        console.error('There was an error deleting the event!', error);
        message.error('There was an error deleting the event');
      });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text:any) => (
        <div>{text && text.length > 50 ? `${text.substring(0, 50)}...` : text}</div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Date & Time',
      dataIndex: 'date_time',
      key: 'date_time',
      render: (text:any) => moment(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
      render: (text:any) => <img src={`${MEDIA_URL}${text}`} alt="profile" style={{ width: 50 }} />,
    },
    {
      title: 'Tickets Amount',
      dataIndex: 'tickets_amount',
      key: 'tickets_amount',
    },
    {
      title: 'Likes Count',
      dataIndex: 'likes_count',
      key: 'likes_count',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Artists',
      dataIndex: 'artists',
      key: 'artists',
      render: (artists:any) => artists.map((artist:any) => artist.username).join(', '),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text:any, record:any) => (
        <div className="flex">
          <Link href={`/events/${record.id}`}>
            <Button type="primary" >View</Button>
          </Link>
          <Popconfirm
            title="Are you sure delete this event?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed">Delete</Button>
          </Popconfirm>
          <Popconfirm
              title="Are you sure edit this event?"
              onConfirm={() => {
                localStorage.setItem("eventToEdit", record.id);
                router.push("/events/addevent");
              }}
              okText="Yes"
              cancelText="No"
          >
            <Button type="dashed">Edit</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Card className='p-1' title="Events List">
        <Link href="/addevent">
         Add Event
        </Link>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          rowKey="id"
          className='overflow-x-scroll'
        />
      </Card>
    </div>
  )
}

export default EventsListPage;
