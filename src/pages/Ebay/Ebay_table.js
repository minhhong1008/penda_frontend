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
  Row,
} from "antd";
import Highlighter from "react-highlight-words";
import React, { useEffect, useRef, useState } from "react";
import { copyToClipboard, showError, showSuccess } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getListebayActions,
  GET_LIST_EBAY_SUCCESS,
} from "../../actions/ebayActions";
import { HuongDanEbay_table } from "./Ebay_list";
import { searchEbayInfo, updateebayInfo } from "../../api/ebay";
// search trên table
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const Ebay_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // Gọi dữ liệu trong state ở reducer ( trong file ebayReducer )
  const { ebays } = useSelector((state) => state.ebay);
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

      render: (text, record, index) => (
        <div
          style={{
            textAlign: "center",
            border: "1px solid white",
            borderRadius: "8px",
            background: "rgb(35, 198, 200)",
            fontWeight: "bold",
            color: "white",
          }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(
              `table/${encodeURIComponent(record.ebay_id)}`,
              "_blank"
            );
          }}
        >
          <div>{index + 1}</div>
        </div>
      ),
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>ID</strong>
        </div>
      ),
      dataIndex: "ebay_id",
      key: "ebay_id",
      fixed: "left",
      width: 1,
      sorter: (a, b) => {
        return a.ebay_id?.localeCompare(b.ebay_id);
      },
      ...getColumnSearchProps("ebay_id"),
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>TÀI KHOẢN</strong>
        </div>
      ),
      dataIndex: "ebay_user",
      key: "ebay_user",
      width: 1,

      sorter: (a, b) => {
        return a.ebay_user?.localeCompare(b.ebay_user);
      },
      ...getColumnSearchProps("ebay_user"),
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>LỚP</strong>
        </div>
      ),
      dataIndex: "ebay_class",
      key: "ebay_class",
      width: 1,

      sorter: (a, b) => {
        return a.ebay_class?.localeCompare(b.ebay_class);
      },
      ...getColumnSearchProps("ebay_class"),
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>Ngày</strong>
        </div>
      ),
      key: "ebaydate_nextclass",
      width: 1,
      render: (record) => {
        let now = dayjs().unix();
        let next_class = record?.ebaydate_nextclass;
        let data = ""
        if(next_class){
           data = Math.floor((now - dayjs(next_class).unix()) / 86400);
        }
        return data
      }
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>
            TIẾN TRÌNH
          </strong>
        </div>
      ),
      dataIndex: "ebay_processing",
      key: "ebay_processing",

      render: (record) => {
        let list = record?.split(",");
        return (
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
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
              } else if (
                item == "Verify Full" ||
                item == "Verify Bank" ||
                item == "Verify phone" ||
                item == "Verify mail" ||
                item == "Verify address"
              ) {
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
        return a.ebay_processing?.localeCompare(b.ebay_processing);
      },
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>PHÁT SINH</strong>
        </div>
      ),
      dataIndex: "ebay_error",
      key: "ebay_error",
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
        return a.ebay_error?.localeCompare(b.ebay_error);
      },
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>NHÂN VIÊN</strong>
        </div>
      ),
      dataIndex: "ebay_employee",
      key: "ebay_employee",

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
        return a.ebay_employee?.localeCompare(b.ebay_employee);
      },
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>GHI CHÚ</strong>
        </div>
      ),
      dataIndex: "ebay_note",
      key: "ebay_note",
      width: 2,

      render: (text, record, index) => (
        <div>
          {selectedNote == record._id ? (
            <Input
              key={index}
              onPressEnter={(e) => {
                handleChangeNote(record.ebay_id, e.target.value);
              }}
              onMouseLeave={(e) => {
                handleChangeNote(record.ebay_id, e.target.value);
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
        return a.ebay_note?.localeCompare(b.ebay_note);
      },
    },
  ];

  const handleChangeNote = async (id, value) => {
    const response = await updateebayInfo(
      {
        ebay_note: value,
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
      getListebayActions({
        ebay_employee: newValue,
      })
    );
  };

  const getListEbay = () => {
    dispatch(
      getListebayActions({
        ebay_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListEbay();
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

  // Hàm search

  const searchEbay = async (value) => {
    const response = await searchEbayInfo({
      query: value,
    });
    if (response.status == 200) {
      let { data } = response;

      dispatch({
        type: GET_LIST_EBAY_SUCCESS,
        payload: data,
      });
    } else {
    }
  };

  return (
    <div>
      <Card>
        <Row gutter={16}>
          <Col span={16}>
            <Input
              placeholder="Search theo điều kiện hoặc"
              onPressEnter={(e) => {
                searchEbay(e.target.value);
              }}
            />
          </Col>
        </Row>

        {/* <Form.Item label="Lọc eBay">
          <TreeSelect
            mode="multiple"
            onChange={handleChangeFilter}
            multiple
            optionlabelprop="label"
            treeData={[
              {
                title: "Lớp",
                value: "ebay_class",
                item: [
                  { title: "Lớp 1", value: "Lớp 1" },
                  { title: "Lớp 2", value: "Lớp 2" },
                ],
              },
              {
                title: "Thiết bị",
                value: "ebay_device",
                item: [
                  { title: "PC06", value: "PC06" },
                  { title: "PC07", value: "PC07" },
                ],
              },
              {
                title: "Nhân viên",
                value: "ebay_employee",
                item: [
                  { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                  { title: "Khắc Liêm", value: "Khắc Liêm" },
                ],
              },
            ]}
          />
        </Form.Item> */}
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={"BẢNG LỚP EBAY : " + class_name.toUpperCase()}
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
                              `table/${encodeURIComponent(record.ebay_id)}`
                            );
                          }, // click row vào ebay_info
                        };
                      }}
                      columns={columns}
                      dataSource={ebays}
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
          <Tabs.TabPane tab={"HƯỚNG DẪN " + ": " + ebays.length} key="2">
            <HuongDanEbay_table />
          </Tabs.TabPane>
        </Tabs>
      </Card>
      
    </div>
  );
};

export default Ebay_table;
