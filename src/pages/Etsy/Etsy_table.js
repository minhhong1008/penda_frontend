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
import React, { useEffect, useState } from "react";
import { copyToClipboard } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getListetsyActions } from "../../actions/etsyActions";
import { HuongDanEtsy_table } from "./Etsy_list";
const Etsy_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { etsys } = useSelector((state) => state.etsy);
  const class_name = urlParams.get("class");
  const dispatch = useDispatch();
  const history = useHistory();
  // nut checked
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const copy_Id = () => {
    copyToClipboard(selectedRowKeys.join("\n"));
  };

  const columns = [
    {
      title:<Tag color="#2db7f5" onClick={copy_Id}>Copy</Tag>,
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "#",
      dataIndex: "etsy_id",
      key: "etsy_id",
      render: (text, record) => (
        <a
          style={{
            borderRadius: "6px",
            padding: "8px 8px",
            background: "#1c84c6",
            color: "white",
          }}
          onClick={() =>
            history.push(`table/${encodeURIComponent(record.etsy_id)}`)
          }
        >
          {text}
        </a>
      ),
      sorter: (a, b) => {
        return a.etsy_id.localeCompare(b.etsy_id);
      },
    },
    {
      title: "TÀI KHOẢN",
      dataIndex: "etsy_user",
      key: "etsy_user",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsy_user);
      },
    },
    {
      title: "TIẾN TRÌNH",
      dataIndex: "etsy_processing",
      key: "etsy_processing",
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
        return a.etsy_user.localeCompare(b.etsy_device);
      },
    },
    {
      title: "PHÁT SINH",
      dataIndex: "etsy_error",
      key: "etsy_error",
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
        return a.etsy_user.localeCompare(b.etsy_class);
      },
    },

    {
      title: "NHÂN VIÊN",
      dataIndex: "etsy_employee",
      key: "etsy_employee",
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
        return a.etsy_user.localeCompare(b.etsy_employee);
      },
    },

    {
      title: "GHI CHÚ",
      dataIndex: "etsy_note",
      key: "etsy_note",
      sorter: (a, b) => {
        return a.etsy_user.localeCompare(b.etsy_note);
      },
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(",");
    dispatch(
      getListetsyActions({
        etsy_employee: newValue,
      })
    );
  };

  const getListEtsy = () => {
    dispatch(
      getListetsyActions({
        etsy_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListEtsy();
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
                value: "etsy_class",
                children: [
                  { title: "Lớp 1", value: "Lớp 1" },
                  { title: "Lớp 2", value: "Lớp 2" },
                ],
              },
              {
                title: "Thiết bị",
                value: "etsy_device",
                children: [
                  { title: "PC06", value: "PC06" },
                  { title: "PC07", value: "PC07" },
                ],
              },
              {
                title: "Nhân viên",
                value: "etsy_employee",
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
            tab={"BẢNG LỚP ETSY : " + class_name.toUpperCase()}
            key="1"
          >
            <Card type="inner">
              <Table
                columns={columns}
                dataSource={etsys}
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
            <HuongDanEtsy_table />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Etsy_table;
