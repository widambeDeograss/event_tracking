import { Card, Table } from 'antd';
import React from 'react'

const EventsListPage = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <div className="flex min-h-screen flex-col  justify-between">
     <Card className='p-1' title="Events List">
     <Table dataSource={dataSource} columns={columns} />
     </Card>
    </div>
  )
}

export default EventsListPage