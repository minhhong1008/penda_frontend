//import React from 'react'
import {
  Button,
  Card,
  Table,
  Tabs,
  Form,
  Input,
  Space,
  TreeSelect,
  Checkbox,
  Tag,
  Tooltip,
  Col,
} from "antd";
import Highlighter from "react-highlight-words";
import React, { useEffect, useRef, useState } from "react";
import { copyToClipboard, showError, showSuccess } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
  getListinfoActions,
  GET_LIST_INFO_SUCCESS,
} from "../../actions/infoActions";
import { HuongDanInfo_table } from "./Info_list";
import { searchInfoInfo, updateinfoInfo } from "../../api/info";
// search trên table
import { SearchOutlined } from "@ant-design/icons";

const Info_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { infos } = useSelector((state) => state.info);
  const class_name = urlParams.get("class");
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedNote, setSelectedNote] = useState();
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
          {/* <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button> */}
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
  // nut checked, sửa cả trong file infoReducer
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
      dataIndex: "info_id",
      key: "info_id",
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
        return a.info_id?.localeCompare(b.info_id);
      },
      ...getColumnSearchProps("info_id"),
    },
    {
      title: "TÀI KHOẢN",
      dataIndex: "info_user",
      key: "info_user",
      sorter: (a, b) => {
        return a.info_user?.localeCompare(b.info_user);
      },
      ...getColumnSearchProps("info_user"),
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>LỚP</strong>
        </div>
      ),
      dataIndex: "info_class",
      key: "info_class",
      width: 1,
      sorter: (a, b) => {
        return a.info_class?.localeCompare(b.info_class);
      },
      ...getColumnSearchProps("info_class"),
      responsive: ["md"],
    },
    {
      title: "TIẾN TRÌNH",
      dataIndex: "info_processing",
      key: "info_processing",
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
        return a.info_processing?.localeCompare(b.info_processing);
      },
    },
    {
      title: "PHÁT SINH",
      dataIndex: "info_error",
      key: "info_error",
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
        return a.info_error?.localeCompare(b.info_error);
      },
    },

    {
      title: "NHÂN VIÊN",
      dataIndex: "info_employee",
      key: "info_employee",
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
        return a.info_employee?.localeCompare(b.info_employee);
      },
    },

    {
      title: "GHI CHÚ",
      dataIndex: "info_note",
      key: "info_note",
      render: (text, record, index) => (
        <div>
          {selectedNote == record._id ? (
            <Input
              key={index}
              onPressEnter={(e) => {
                handleChangeNote(record.info_id, e.target.value);
              }}
              onMouseLeave={(e) => {
                handleChangeNote(record.info_id, e.target.value);
                setSelectedNote();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              defaultValue={text}
            ></Input>
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNote(record._id);
              }}
            >
              <Tooltip title={text}>
                <div
                  style={{
                    whiteSpace: "nowrap",
                    width: "50px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {text}
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      ),
      sorter: (a, b) => {
        return a.info_note?.localeCompare(b.info_note);
      },
    },
  ];

  const handleChangeNote = async (id, value) => {
    const response = await updateinfoInfo(
      {
        info_note: value,
      },
      id
    );
    if (response.status == 200) {
      showSuccess("Update thanh cong");
    } else {
      showError("Loi roi");
    }
    setSelectedNote();
  };

  const handleChangeFilter = (values) => {
    let newValue = values.join(",");
    dispatch(
      getListinfoActions({
        info_employee: newValue,
      })
    );
  };

  const getListInfo = () => {
    dispatch(
      getListinfoActions({
        info_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListInfo();
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

  const searchInfo = async (value) => {
    const response = await searchInfoInfo({
      query: value,
    });
    if (response.status == 200) {
      let { data } = response;

      dispatch({
        type: GET_LIST_INFO_SUCCESS,
        payload: data,
      });
    } else {
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
                searchInfo(e.target.value);
              }}
            />
          </Col>
          <Col span={4} name="DKM"></Col>
        </row>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={"BẢNG LỚP INFO : " + class_name.toUpperCase()}
            key="1"
          >
            <Card type="inner">
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      history.push(
                        `table/${encodeURIComponent(record.info_id)}`
                      );
                    },
                  };
                }}
                columns={columns}
                dataSource={infos}
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
          <Tabs.TabPane tab={"HƯỚNG DẪN " + ": " + infos.length} key="2">
            <HuongDanInfo_table />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Info_table;
