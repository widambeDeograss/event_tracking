"use client"
import { Colors } from "@/constants/colors";
import Image from "next/image";
import { Card, Col, Row, Statistic, Table } from "antd";
import {WalletOutlined, CreditCardFilled, } from "@ant-design/icons";
import withAuth from "@/middleware/protectroutes";

function Home() {
  

  return (
    <main className="flex flex-col justify-between  "
    style={{backgroundColor:Colors.secondary}}
    >
      <div className="grid grid-cols-1 mt-3 gap-10 xl:grid-cols-4  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 px-5 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Card style={{ minHeight: "125px", minWidth: "83x" }}>
          <Row gutter={16} align="middle">
            <Col span={12}>
              <Statistic
                  title="Total Users"
                  value="4"
                  valueStyle={{
                    fontSize: "xx-small",
                    fontWeight: "bold",
                    // color: textColor,
                  }}
              />
            </Col>
            <Col span={12}>
              <div
                  style={{
                    borderRadius: "50%",
                    height: "45px",
                    maxWidth: "45px",
                    minWidth:"43px",
                    backgroundColor: Colors.secondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "40px",
                    // padding:"10px"
                    // boxShadow: '200px rgba(0, 0, 0, 0.1)'
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
                        title="Total artists"
                        value="3,897"
                        valueStyle={{
                            fontSize: "smaller",
                            fontWeight: "bold",
                            // color: textColor,
                        }}
                    />
                </Col>
                <Col span={12}>
                    <div
                        style={{
                            borderRadius: "50%",
                            height: "45px",
                            maxWidth: "45px",
                            minWidth:"43px",
                            backgroundColor: Colors.secondary,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "40px",
                            // padding:"10px"
                            // boxShadow: '200px rgba(0, 0, 0, 0.1)'
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
                        title="Total events"
                        value="897"
                        valueStyle={{
                            fontSize: "smaller",
                            fontWeight: "bold",
                            // color: textColor,
                        }}
                    />
                </Col>
                <Col span={12}>
                    <div
                        style={{
                            borderRadius: "50%",
                            height: "45px",
                            maxWidth: "45px",
                            minWidth:"43px",
                            backgroundColor: Colors.secondary,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "40px",
                            // padding:"10px"
                            // boxShadow: '200px rgba(0, 0, 0, 0.1)'
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
                        title="Total amout this week"
                        value="97"
                        valueStyle={{
                            fontSize: "smaller",
                            fontWeight: "bold",
                            // color: textColor,
                        }}
                    />
                </Col>
                <Col span={12}>
                    <div
                        style={{
                            borderRadius: "50%",
                            height: "45px",
                            maxWidth: "45px",
                            minWidth:"43px",
                            backgroundColor: Colors.secondary,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "40px",
                            // padding:"10px"
                            // boxShadow: '200px rgba(0, 0, 0, 0.1)'
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
       
    </main>
  );
}

export default withAuth(Home);