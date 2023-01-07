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
import { getListtiktokActions } from "../../actions/tiktokActions";
import { HuongDanTiktok_table } from "./Tiktok_list";
const Tiktok_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { tiktoks } = useSelector((state) => state.tiktok);
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
      fixed: "left",
      width: 1,
      render: (text, record, index) => index + 1,
    },
    {
      title: "#",
      dataIndex: "tiktok_id",
      key: "tiktok_id",
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
        return a.tiktok_id?.localeCompare(b.tiktok_id);
      },
    },
    {
      title: "TÀI KHOẢN",
      dataIndex: "tiktok_user",
      key: "tiktok_user",
      sorter: (a, b) => {
        return a.tiktok_user?.localeCompare(b.tiktok_user);
      },
    },
    {
      title: "TIẾN TRÌNH",
      dataIndex: "tiktok_processing",
      key: "tiktok_processing",
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
        return a.tiktok_processing?.localeCompare(b.tiktok_processing);
      },
    },
    {
      title: "PHÁT SINH",
      dataIndex: "tiktok_error",
      key: "tiktok_error",
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
        return a.tiktok_error?.localeCompare(b.tiktok_error);
      },
    },

    {
      title: "NHÂN VIÊN",
      dataIndex: "tiktok_employee",
      key: "tiktok_employee",
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
        return a.tiktok_employee?.localeCompare(b.tiktok_employee);
      },
    },

    {
      title: "GHI CHÚ",
      dataIndex: "tiktok_note",
      key: "tiktok_note",
      sorter: (a, b) => {
        return a.tiktok_note?.localeCompare(b.tiktok_note);
      },
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(",");
    dispatch(
      getListtiktokActions({
        tiktok_employee: newValue,
      })
    );
  };

  const getListTiktok = () => {
    dispatch(
      getListtiktokActions({
        tiktok_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListTiktok();
  }, [class_name]);
// nut checked copy cái này trong ant.design
const onSelectChange = (newSelectedRowKeys) => {
  setSelectedRowKeys(newSelectedRowKeys);
};
const rowSelection = {
  selectedRowKeys,
  onChange: onSelectChange,
};
//--------
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
                value: "tiktok_class",
                children: [
                  { title: "Lớp 1", value: "Lớp 1" },
                  { title: "Lớp 2", value: "Lớp 2" },
                ],
              },
              {
                title: "Thiết bị",
                value: "tiktok_device",
                children: [
                  { title: "PC06", value: "PC06" },
                  { title: "PC07", value: "PC07" },
                ],
              },
              {
                title: "Nhân viên",
                value: "tiktok_employee",
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
            tab={"BẢNG LỚP TIKTOK : " + class_name.toUpperCase()}
            key="1"
          >
            <Card type="inner">
              <Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    history.push(`table/${encodeURIComponent(record.tiktok_id)}`);
                  },
                };
              }}
                columns={columns}
                dataSource={tiktoks}
                rowSelection={rowSelection}
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
            <HuongDanTiktok_table />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Tiktok_table;
