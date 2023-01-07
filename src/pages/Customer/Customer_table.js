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
    Tag,
  } from "antd";
  import React, { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useHistory, useParams } from "react-router-dom";
  import { getListcustomerActions } from "../../actions/customerActions";
  import { HuongDanCustomer_table } from "./Customer_list";
  const Customer_table = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const { customers } = useSelector((state) => state.customer);
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
        dataIndex: "customer_id",
        key: "customer_id",
        render: (text, record) => (
          
          <a 
          style={{
            borderRadius: "6px",
            padding: "8px 8px",
            background: "#1c84c6",
            color: "white",
          }}
          
           
          >
            {text}
          </a>
          
        ),
        sorter: (a, b) => {
          return a.customer_id?.localeCompare(b.customer_id);
        },
      },
      {
        title: "TÊN",
        dataIndex: "customer_user",
        key: "customer_user",
        sorter: (a, b) => {
          return a.customer_user?.localeCompare(b.customer_user);
        },
      },
      {
        title: "DI ĐỘNG",
        dataIndex: "customer_phone1",
        key: "customer_phone1",
        sorter: (a, b) => {
          return a.customer_phone1?.localeCompare(b.customer_phone1);
        },
      },
      {
        title: "TIẾN TRÌNH",
        dataIndex: "customer_processing",
        key: "customer_processing",
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
                } else if (item == "Verify Full" || item == "Verify Customer") {
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
          return a.customer_processing?.localeCompare(b.customer_processing);
        },
      },
      {
        title: "PHÁT SINH",
        dataIndex: "customer_error",
        key: "customer_error",
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
          return a.customer_error?.localeCompare(b.customer_error);
        },
      },
  
      {
        title: "NHÂN VIÊN",
        dataIndex: "customer_employee",
        key: "customer_employee",
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
          return a.customer_employee?.localeCompare(b.customer_employee);
        },
      },
  
      {
        title: "GHI CHÚ",
        dataIndex: "customer_note",
        key: "customer_note",
        sorter: (a, b) => {
          return a.customer_note?.localeCompare(b.customer_note);
        },
      },
    ];
  
    const handleChangeFilter = (values) => {
      let newValue = values.join(",");
      dispatch(
        getListcustomerActions({
          customer_employee: newValue,
        })
      );
    };
  
    const getListCustomer = () => {
      dispatch(
        getListcustomerActions({
          customer_class: class_name,
        })
      );
    };
  
    useEffect(() => {
      getListCustomer();
    }, [class_name]);
  
    return (
      <div>
        <Card>
          <Form.Item label="Lọc eBay">
            <TreeSelect
              mode="multiple"
              onChange={handleChangeFilter}
              multiple
              optionlabelprop="label"
              treeData={[
                {
                  title: "Lớp",
                  value: "customer_class",
                  item: [
                    { title: "Lớp 1", value: "Lớp 1" },
                    { title: "Lớp 2", value: "Lớp 2" },
                  ],
                },
                {
                  title: "Thiết bị",
                  value: "customer_device",
                  item: [
                    { title: "PC06", value: "PC06" },
                    { title: "PC07", value: "PC07" },
                  ],
                },
                {
                  title: "Nhân viên",
                  value: "customer_employee",
                  item: [
                    { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                    { title: "Khắc Liêm", value: "Khắc Liêm" },
                  ],
                },
              ]}
            />
          </Form.Item>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              tab={"BẢNG LỚP CUSTOMER : " + class_name.toUpperCase()}
              key="1"
            >
              <Card type="inner">
                <Table
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      history.push(`table/${encodeURIComponent(record.customer_id)}`);
                    },
                  };
                }}
                  columns={columns}
                  dataSource={customers}
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
              <HuongDanCustomer_table />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>
    );
  };
  
  export default Customer_table;
  