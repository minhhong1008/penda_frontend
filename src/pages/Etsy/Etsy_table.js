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
import React, { useEffect, useRef, useState } from "react";
import { copyToClipboard, showError, showSuccess } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getListetsyActions,GET_LIST_ETSY_SUCCESS } from "../../actions/etsyActions";
import { HuongDanEtsy_table } from "./Etsy_list";
import { searchEtsyInfo } from "../../api/etsy";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import dayjs from "dayjs";


const Etsy_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { etsys } = useSelector((state) => state.etsy);
  const class_name = urlParams.get("class");
  const dispatch = useDispatch();
  const history = useHistory();

    // Các hàm nut search trên table của ant.desgn
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? "#1890ff" : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: "#ffc069",
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    });
    //-------------------------------
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
        return a.etsy_id?.localeCompare(b.etsy_id);
      },
      ...getColumnSearchProps("etsy_id"),
    },
    {
      title: "TÀI KHOẢN",
      dataIndex: "etsy_user",
      key: "etsy_user",
      sorter: (a, b) => {
        return a.etsy_user?.localeCompare(b.etsy_user);
      },
      ...getColumnSearchProps("etsy_user"),
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>LỚP</strong>
        </div>
      ),
      dataIndex: "etsy_class",
      key: "etsy_class",
      width: 1,
      sorter: (a, b) => {
        return a.etsy_class?.localeCompare(b.etsy_class);
      },
      ...getColumnSearchProps("etsy_class"),
      
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>NGÀY</strong>
        </div>
      ),
      key: "etsydate_nextclass",
      width: 1,
      render: (record) => {
        let now = dayjs().unix();
        let next_class = record?.etsydate_nextclass;
        let data = ""
        if(next_class){
           data = Math.floor((now - dayjs(next_class).unix()) / 86400);
        }
        return data
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
        return a.etsy_processing?.localeCompare(b.etsy_processing);
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
        return a.etsy_error?.localeCompare(b.etsy_error);
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
        return a.etsy_employee?.localeCompare(b.etsy_employee);
      },
    },

    {
      title: "GHI CHÚ",
      dataIndex: "etsy_note",
      key: "etsy_note",
      sorter: (a, b) => {
        return a.etsy_note?.localeCompare(b.etsy_note);
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
// Hàm search

const searchEtsy = async (value) => {
  const response = await searchEtsyInfo({
    query: value,
  });
  if (response.status == 200) {
    let { data } = response;

    dispatch({
      type: GET_LIST_ETSY_SUCCESS,
      payload: data,
    });
  } else {
    showError("Có lỗi Search")
  }
};
//--------
  return (
    <div>
      <Card>
      <row gutter={16}>
          <Col span={18}>
            <Input
              placeholder="Search"
              onPressEnter={(e) => {
                searchEtsy(e.target.value);
              }}
            />
          </Col>
          <Col span={4}>
           {etsys.length}
          </Col>
        </row>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={"BẢNG LỚP ETSY : " + class_name.toUpperCase()}
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
                        history.push(`table/${encodeURIComponent(record.etsy_id)}`);
                      },
                    };
                  }}
                    columns={columns}
                    dataSource={etsys}
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
            <HuongDanEtsy_table />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Etsy_table;
