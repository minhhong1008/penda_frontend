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
import { getListproxyActions } from "../../actions/proxyActions";
import { HuongDanProxy_table } from "./Proxy_list";
const Proxy_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { proxys } = useSelector((state) => state.proxy);
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
      dataIndex: "proxy_id",
      key: "proxy_id",
      render: (text, record) => (
        
        <a 
        style={{
          borderRadius: "6px",
          padding: "8px 8px",
          background: "#1c84c6",
          color: "white",
        }}
        
          onClick={() =>
            history.push(`table/${encodeURIComponent(record.proxy_id)}`)
          }
        >
          {text}
        </a>
        
      ),
      sorter: (a, b) => {
        return a.proxy_id.localeCompare(b.proxy_id);
      },
    },
    {
      title: "TÀI KHOẢN",
      dataIndex: "proxy_user",
      key: "proxy_user",
      sorter: (a, b) => {
        return a.proxy_user.localeCompare(b.proxy_user);
      },
    },
    {
      title: "TIẾN TRÌNH",
      dataIndex: "proxy_processing",
      key: "proxy_processing",
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
        return a.proxy_user.localeCompare(b.proxy_device);
      },
    },
    {
      title: "PHÁT SINH",
      dataIndex: "proxy_error",
      key: "proxy_error",
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
        return a.proxy_user.localeCompare(b.proxy_class);
      },
    },

    {
      title: "NHÂN VIÊN",
      dataIndex: "proxy_employee",
      key: "proxy_employee",
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
        return a.proxy_user.localeCompare(b.proxy_employee);
      },
    },

    {
      title: "GHI CHÚ",
      dataIndex: "proxy_note",
      key: "proxy_note",
      sorter: (a, b) => {
        return a.proxy_user.localeCompare(b.proxy_note);
      },
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(",");
    dispatch(
      getListproxyActions({
        proxy_employee: newValue,
      })
    );
  };

  const getListProxy = () => {
    dispatch(
      getListproxyActions({
        proxy_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListProxy();
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
                value: "proxy_class",
                children: [
                  { title: "Lớp 1", value: "Lớp 1" },
                  { title: "Lớp 2", value: "Lớp 2" },
                ],
              },
              {
                title: "Thiết bị",
                value: "proxy_device",
                children: [
                  { title: "PC06", value: "PC06" },
                  { title: "PC07", value: "PC07" },
                ],
              },
              {
                title: "Nhân viên",
                value: "proxy_employee",
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
            tab={"BẢNG LỚP PROXY : " + class_name.toUpperCase()}
            key="1"
          >
            <Card type="inner">
              <Table
                columns={columns}
                dataSource={proxys}
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
            <HuongDanProxy_table />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Proxy_table;
