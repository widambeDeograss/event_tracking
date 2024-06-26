"use client"
import { useEffect, useState } from "react";
import { Colors } from "@/constants/colors";
import { Card, Col, Row, Statistic, Table } from "antd";
import { WalletOutlined, CreditCardFilled } from "@ant-design/icons";
import withAuth from "@/middleware/protectroutes";
import axios from "axios";
import { BASE_URL } from "@/constants/baseUrl";
import { useRouter } from "next/navigation";

function Home() {
  const [stats, setStats] = useState<any>(null);
  const [ticketHistory, setTicketHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsResponse = await axios.get(BASE_URL + 'api/system-stats');
        setStats(statsResponse.data);
      } catch (error) {
        console.error("Error fetching system stats", error);
      }
    };

    const fetchTicketHistory = async () => {
      try {
        const ticketHistoryResponse = await axios.get(`${BASE_URL}api/tickets?querytype=all`);
        setTicketHistory(ticketHistoryResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ticket history", error);
        setLoading(false);
      }
    };

    fetchStats();
    fetchTicketHistory();
  }, []);

  useEffect(() => {
    if (token) {
        return;
    }{
     router.push("/login");
    }
  }, [])
  

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user:any) => `${user.username}`,
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      render: (event:any) => event.name,
    },
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at:any) => new Date(created_at).toLocaleString(),
    },
  ];

  return (
    <main className="flex flex-col justify-between" style={{ backgroundColor: Colors.secondary }}>
      <div className="grid grid-cols-1 mt-3 gap-10 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 px-5 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Card style={{ minHeight: "125px", minWidth: "83x" }}>
          <Row gutter={16} align="middle">
            <Col span={12}>
              <Statistic
                title="Total Users"
                value={stats ? stats.total_users : 0}
                valueStyle={{
                  fontSize: "xx-small",
                  fontWeight: "bold",
                }}
              />
            </Col>
            <Col span={12}>
              <div
                style={{
                  borderRadius: "50%",
                  height: "45px",
                  maxWidth: "45px",
                  minWidth: "43px",
                  backgroundColor: Colors.secondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "40px",
                }}
                className="min"
              >
                <WalletOutlined className="text-white font-bold" />
              </div>
            </Col>
          </Row>
          <p
            style={{
              color: "gray.400",
              fontSize: "xx-small",
              display: "inline-flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <span style={{ color: "green", fontWeight: "bold" }}>
              +3.48%{" "}
            </span>
            <span className="ml-10">Of total Identities</span>
          </p>
        </Card>

        <Card style={{ minHeight: "125px", minWidth: "83x" }}>
          <Row gutter={16} align="middle">
            <Col span={12}>
              <Statistic
                title="Total Artists"
                value={stats ? stats.total_artists : 0}
                valueStyle={{
                  fontSize: "smaller",
                  fontWeight: "bold",
                }}
              />
            </Col>
            <Col span={12}>
              <div
                style={{
                  borderRadius: "50%",
                  height: "45px",
                  maxWidth: "45px",
                  minWidth: "43px",
                  backgroundColor: Colors.secondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "40px",
                }}
                className="min"
              >
                <CreditCardFilled className="text-white font-bold" />
              </div>
            </Col>
          </Row>
          <p
            style={{
              color: "gray.400",
              fontSize: "xx-small",
              display: "inline-flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <span style={{ color: "green", fontWeight: "bold" }}>
              +3.48%{" "}
            </span>
            <span className="ml-10">Since last month</span>
          </p>
        </Card>

        <Card style={{ minHeight: "125px", minWidth: "83x" }}>
          <Row gutter={16} align="middle">
            <Col span={12}>
              <Statistic
                title="Total Events"
                value={stats ? stats.total_events : 0}
                valueStyle={{
                  fontSize: "smaller",
                  fontWeight: "bold",
                }}
              />
            </Col>
            <Col span={12}>
              <div
                style={{
                  borderRadius: "50%",
                  height: "45px",
                  maxWidth: "45px",
                  minWidth: "43px",
                  backgroundColor: Colors.secondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "40px",
                }}
                className="min"
              >
                <CreditCardFilled className="text-white font-bold" />
              </div>
            </Col>
          </Row>
          <p
            style={{
              color: "gray.400",
              fontSize: "xx-small",
              display: "inline-flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <span style={{ color: "green", fontWeight: "bold" }}>
              +3.48%{" "}
            </span>
            <span className="ml-10">Since last month</span>
          </p>
        </Card>

        <Card style={{ minHeight: "125px", minWidth: "83x" }}>
          <Row gutter={16} align="middle">
            <Col span={12}>
              <Statistic
                title="Total Amount This Week"
                value={stats ? stats.total_tickets_sold : 0}
                valueStyle={{
                  fontSize: "smaller",
                  fontWeight: "bold",
                }}
              />
            </Col>
            <Col span={12}>
              <div
                style={{
                  borderRadius: "50%",
                  height: "45px",
                  maxWidth: "45px",
                  minWidth: "43px",
                  backgroundColor: Colors.secondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "40px",
                }}
                className="min"
              >
                <WalletOutlined className="text-white font-bold" />
              </div>
            </Col>
          </Row>
          <p
            style={{
              color: "gray.400",
              fontSize: "xx-small",
              display: "inline-flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <span style={{ color: "green", fontWeight: "bold" }}>
              +3.48%{" "}
            </span>
            <span className="ml-10">Since last month</span>
          </p>
        </Card>
      </div>

      <div className="mt-5 px-5">
        <Card title="Ticket History">
          <Table
            dataSource={ticketHistory}
            columns={columns}
            rowKey="id"
            loading={loading}
          />
        </Card>
      </div>
    </main>
  );
}

export default Home;
