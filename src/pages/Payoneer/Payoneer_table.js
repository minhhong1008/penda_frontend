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
  Popover,
  Space,
  TreeSelect,
  Checkbox,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { copyToClipboard } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getListpayoneerActions,GET_LIST_PAYONEER_SUCCESS } from "../../actions/payoneerActions";
import { HuongDanPayoneer_table } from "./Payoneer_list";
import { searchPayoneerInfo } from "../../api/payoneer";
import dayjs from "dayjs";
const Payoneer_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { payoneers } = useSelector((state) => state.payoneer);
  const class_name = urlParams.get("class");
  const dispatch = useDispatch();
  const history = useHistory();
  // nut checked, sửa cả trong file ebayReducer
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const copyId = () => {
    copyToClipboard(selectedRowKeys.join("\n"));
  };
  const columns = [
    {
      title: (
        <Tag color="#2db7f5" onClick={copyId}>
          Copy
        </Tag>
      ),
      key: "index",
      
      width: 1,
      render: (text, record, index) => index + 1,
    },
    {
      title: "#",
      dataIndex: "payoneer_id",
      key: "payoneer_id",
      fixed: "left",
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
        return a.payoneer_id?.localeCompare(b.payoneer_id);
      },
    },
    {
      title: "TÀI KHOẢN",
      dataIndex: "payoneer_user",
      key: "payoneer_user",
      sorter: (a, b) => {
        return a.payoneer_user?.localeCompare(b.payoneer_user);
      },
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>NGÀY</strong>
        </div>
      ),
      key: "payoneerdate_nextclass",
      width: 1,
      render: (record) => {
        let now = dayjs().unix();
        let next_class = record?.payoneerdate_nextclass;
        let data = ""
        if(next_class){
           data = Math.floor((now - dayjs(next_class).unix()) / 86400);
        }
        return data
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
              } else if (item == "Verify Full" || item == "Verify Bank") {
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
        return a.payoneer_processing?.localeCompare(b.payoneer_processing);
      },
    },
    {
      title: "PHÁT SINH",
      dataIndex: "payoneer_error",
      key: "payoneer_error",
      render: (record) => {
        if (!record) {
          return;
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
        return a.payoneer_error?.localeCompare(b.payoneer_error);
      },
    },

    {
      title: "NHÂN VIÊN",
      dataIndex: "payoneer_employee",
      key: "payoneer_employee",
      render: (record) => {
        if (!record) {
          return;
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
        return a.payoneer_employee?.localeCompare(b.payoneer_employee);
      },
    },

    {
      title: "GHI CHÚ",
      dataIndex: "payoneer_note",
      key: "payoneer_note",
      sorter: (a, b) => {
        return a.payoneer_note?.localeCompare(b.payoneer_note);
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
  // nut checked copy cái này trong ant.design
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // Hàm search

  const searchPayoneer = async (value) => {
    const response = await searchPayoneerInfo({
      query: value,
    });
    if (response.status == 200) {
      let { data } = response;

      dispatch({
        type: GET_LIST_PAYONEER_SUCCESS,
        payload: data,
      });
    } else {
    }
  };
  //--------
  return (
    <div>
      <Card>
      <Row gutter={16}>
          <Col span={16}>
            <Input
              placeholder="Search theo điều kiện hoặc"
              onPressEnter={(e) => {
                searchPayoneer(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={"BẢNG LỚP PAYONEER : " + class_name.toUpperCase()}
            key="1"
          >
            <Card type="inner">
              <Row gutter={[24, 0]}>
                <Col xs={24} xl={24} className="mb-24">
                  <div className="table-responsive">
                    <Table
                      width="100%"
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: (event) => {
                            history.push(
                              `table/${encodeURIComponent(record.payoneer_id)}`
                            );
                          },
                        };
                      }}
                      columns={columns}
                      dataSource={payoneers}
                      rowSelection={rowSelection}
                      bordered
                      size="small"
                      pagination={{
                        pageSizeOptions: [
                          "100",
                          "200",
                          "300",
                          "500",
                          "1000",
                          "2000",
                        ],
                        position: ["bottomRight"],
                        size: "small",
                        showSizeChanger: true,
                        defaultPageSize: 100,
                      }}
                      className="ant-border-space"
                    />
                  </div>
                </Col>
              </Row>

              
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
