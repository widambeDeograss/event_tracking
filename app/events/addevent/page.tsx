'use client'
import { Card, Form, Input, Button, DatePicker, Select, message, InputNumber, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { BASE_URL } from '@/constants/baseUrl';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddEditEventPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
 const id = localStorage.getItem("eventToEdit")

  useEffect(() => {
    loadArtists();

    if (id) {
      loadEvent(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const loadArtists = async () => {
    try {
      const response = await axios.get(BASE_URL +'api/auth/user-information?querytype=artists');
      setArtists(response.data);
    } catch (error) {
      console.error('There was an error fetching the artists!', error);
    }
  };

  const loadEvent = async (eventId:any) => {
    try {
      const response = await axios.get(`${BASE_URL}api/events?querytype=single&&eventId=${eventId}`);
      console.log(response)
      const event = response.data;
      form.setFieldsValue({
        ...event,
        date_time: moment(event.date_time),
        artist_ids: event.artists.map((artist:any) => artist.id),
      });
      setLoading(false);
    } catch (error) {
      console.error('There was an error fetching the event details!', error);
      setLoading(false);
    }
  };

  const handleAddEditEvent = async (values:any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('location', values.location);
    formData.append('date_time', values.date_time.format());
    formData.append('artist_ids', values.artist_ids);
    formData.append('type', values.type);
    formData.append('tickets_amount', values.tickets_amount);
    formData.append('price', values.price);

    if (values.profile) {
      formData.append('profile', values.profile.file);
    }
    try {
      const apiCall = id ? axios.put : axios.post;
      const url = id ? `${BASE_URL}api/events/${id}` :  `${BASE_URL}api/events`;

      await apiCall(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success(`Event ${id ? 'updated' : 'added'} successfully`);
      localStorage.removeItem('eventToEdit');
      // router.push('/events');
    } catch (error) {
      console.error(`There was an error ${id ? 'updating' : 'adding'} the event!`, error);
      message.error(`There was an error ${id ? 'updating' : 'adding'} the event`);
    }
  };

  const handleUploadChange = ({ fileList }:any) => {
    setFileList(fileList);
  };

  return (
    <div className="flex min-h-screen flex-col justify-between z-50 mb-5">
      <Card className='p-1' title={`${id ? 'Edit' : 'Add'} Event`}>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleAddEditEvent}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the event name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input the event description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please input the event location!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date & Time"
            name="date_time"
            rules={[{ required: true, message: 'Please input the event date and time!' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="Artists"
            name="artist_ids"
            rules={[{ required: true, message: 'Please select at least one artist!' }]}
          >
            <Select mode="multiple" loading={loading}>
              {artists.map((artist:any) => (
                <Option key={artist.id} value={artist.id}>{artist.username}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Event Type"
            name="type"
            rules={[{ required: true, message: 'Please select the event type!' }]}
          >
            <Select>
              <Option value="BongoFleva">BongoFleva</Option>
              <Option value="Gospel">Gospel</Option>
              <Option value="Culture">Culture</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Tickets Amount"
            name="tickets_amount"
            rules={[{ required: true, message: 'Please input the tickets amount!' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Ticket Price"
            name="price"
            rules={[{ required: true, message: 'Please input the ticket price!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Event Profile Banner"
            name="profile"
            valuePropName="file"
          >
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{id ? 'Update' : 'Add'} Event</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddEditEventPage;
