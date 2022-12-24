//import React from 'react'
import {
  Button,
  Card,
  Table,
  Tabs,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Collapse,
  Space,
  TreeSelect,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getListpayoneerActions } from "../../actions/payoneerActions";
import { HuongDanPayoneer_table } from "./Payoneer_list";
const Payoneer_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { payoneers } = useSelector((state) => state.payoneer);
  const class_name = urlParams.get("class");
  const dispatch = useDispatch();
  const history = useHistory();

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "#",
      dataIndex: "payoneer_id",
      key: "payoneer_id",
      render: (text, record) => (
        
        <a 
        style={{
          borderRadius: "6px",
          padding: "8px 8px",
          background: "#1c84c6",
          color: "white",
        }}
        
          onClick={() =>
            history.push(`table/${encodeURIComponent(record.payoneer_id)}`)
          }
        >
          {text}
        </a>
        
      ),
      sorter: (a, b) => {
        return a.payoneer_id.localeCompare(b.payoneer_id);
      },
    },
    {
      title: "TÀI KHOẢN",
      dataIndex: "payoneer_user",
      key: "payoneer_user",
      sorter: (a, b) => {
        return a.payoneer_user.localeCompare(b.payoneer_user);
      },
    },
    {
      title: "TIẾN TRÌNH",
      dataIndex: "payoneer_processing",
      key: "payoneer_processing",
      render: (record) => {
        let list = record?.split(",");
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            {list?.map((item) => {
              if (item == "Buyer" || item == "Seller") {
                return (
                  <div
                    style={{
                      borderRadius: "6px",
                      padding: "2px 2px",
                      background: "#1c84c6",
                      color: "white",
                    }}
                  >
                    {item}
                  </div>
                );
              } else if (item == "Verify" || item == "Verify Bank") {
                return (
                  <div
                    style={{
                      borderRadius: "6px",
                      padding: "2px 6px",
                      background: "#1ab394",
                      color: "white",
                    }}
                  >
                    {item}
                  </div>
                );
              } else if (item == "Restrict" || item == "Suspended") {
                return (
                  <div
                    style={{
                      textAlign: "center",
                      borderRadius: "6px",
                      padding: "2px 6px",
                      background: "#ed5565",
                      color: "white",
                    }}
                  >
                    {item}
                  </div>
                );
              } else {
                return (
                  <div
                    style={{
                      textAlign: "center",
                      borderRadius: "6px",
                      padding: "2px 2px",
                      background: "#23c6c8",
                      color: "white",
                    }}
                  >
                    {item}
                  </div>
                );
              }
            })}
          </div>
        );
      },
      sorter: (a, b) => {
        return a.payoneer_user.localeCompare(b.payoneer_device);
      },
    },
    {
      title: "PHÁT SINH",
      dataIndex: "payoneer_error",
      key: "payoneer_error",
      render: (record) => {
        if (!record){
         
          return
        }
       
        let list = record?.split(",");
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            {list?.map((item) => {
              return (
                <div
                  style={{
                    borderRadius: "6px",
                    padding: "2px 2px",
                    background: "gold",
                    color: "red",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        );
      },
      sorter: (a, b) => {
        return a.payoneer_user.localeCompare(b.payoneer_class);
      },
    },

    {
      title: "NHÂN VIÊN",
      dataIndex: "payoneer_employee",
      key: "payoneer_employee",
      render: (record) => {
        if (!record){
         
          return
        }
       
        let list = record?.split(",");
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            {list?.map((item) => {
              return (
                <div
                  style={{
                    borderRadius: "6px",
                    padding: "6px 6px",
                    background: "#18a689",
                    color: "white",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        );
      },
      sorter: (a, b) => {
        return a.payoneer_user.localeCompare(b.payoneer_employee);
      },
    },

    {
      title: "GHI CHÚ",
      dataIndex: "payoneer_note",
      key: "payoneer_note",
      sorter: (a, b) => {
        return a.payoneer_user.localeCompare(b.payoneer_note);
      },
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(",");
    dispatch(
      getListpayoneerActions({
        payoneer_employee: newValue,
      })
    );
  };

  const getListPayoneer = () => {
    dispatch(
      getListpayoneerActions({
        payoneer_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListPayoneer();
  }, [class_name]);

  return (
    <div>
      <Card>
        <Form.Item label="Lọc eBay">
          <TreeSelect
            mode="multiple"
            onChange={handleChangeFilter}
            multiple
            optionLabelProp="label"
            treeData={[
              {
                title: "Lớp",
                value: "payoneer_class",
                children: [
                  { title: "Lớp 1", value: "Lớp 1" },
                  { title: "Lớp 2", value: "Lớp 2" },
                ],
              },
              {
                title: "Thiết bị",
                value: "payoneer_device",
                children: [
                  { title: "PC06", value: "PC06" },
                  { title: "PC07", value: "PC07" },
                ],
              },
              {
                title: "Nhân viên",
                value: "payoneer_employee",
                children: [
                  { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                  { title: "Khắc Liêm", value: "Khắc Liêm" },
                ],
              },
            ]}
          />
        </Form.Item>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={"BẢNG LỚP PAYONEER : " + class_name.toUpperCase()}
            key="1"
          >
            <Card type="inner">
              <Table
                columns={columns}
                dataSource={payoneers}
                pagination={{
                  pageSizeOptions: [
                    "10",
                    "20",
                    "30",
                    "50",
                    "100",
                    "200",
                    "300",
                    "500",
                    "1000",
                    "2000",
                  ],
                  position: ["bottomRight", "topRight"],
                  showSizeChanger: true,
                  defaultPageSize: 100,
                }}
              ></Table>
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="HƯỚNG DẪN" key="2">
            <HuongDanPayoneer_table />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Payoneer_table;
