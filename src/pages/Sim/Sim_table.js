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
import { copyToClipboard, showError } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getListsimActions,
  GET_LIST_SIM_SUCCESS,
} from "../../actions/simActions";
import { HuongDanSim_table } from "./Sim_list";
import { searchSimInfo, updatesimInfo } from "../../api/sim";
// search trên table
import { SearchOutlined } from "@ant-design/icons";


const Sim_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { sims } = useSelector((state) => state.sim);
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
  // nut checked, sửa cả trong file simReducer
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
      dataIndex: "sim_id",
      key: "sim_id",
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
        return a.sim_id?.localeCompare(b.sim_id);
      },
      ...getColumnSearchProps("sim_id"),
    },
    {
      title: "TÀI KHOẢN",
      dataIndex: "sim_user",
      key: "sim_user",
      sorter: (a, b) => {
        return a.sim_user?.localeCompare(b.sim_user);
      },
      ...getColumnSearchProps("sim_user"),
    },
    {
      title: "SỐ TIỀN",
      dataIndex: "sim_limit",
      key: "sim_limit",
      sorter: (a, b) => {
        return a.sim_limit?.localeCompare(b.sim_limit);
      },
      ...getColumnSearchProps("sim_limit"),
    },
    {
      title: "KHÓA 1 CHIỀU",
      dataIndex: "sim_item",
      key: "sim_item",
      sorter: (a, b) => {
        return a.sim_item?.localeCompare(b.sim_item);
      },
      ...getColumnSearchProps("sim_item"),
    },
    {
      title: "KHÓA 2 CHIỀU",
      dataIndex: "sim_sold",
      key: "sim_sold",
      sorter: (a, b) => {
        return a.sim_sold?.localeCompare(b.sim_sold);
      },
      ...getColumnSearchProps("sim_sold"),
    },
    {
      title: "PHÁT SINH",
      dataIndex: "sim_error",
      key: "sim_error",
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
        return a.sim_error?.localeCompare(b.sim_error);
      },
    },

    {
      title: "NHÂN VIÊN",
      dataIndex: "sim_employee",
      key: "sim_employee",
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
        return a.sim_employee?.localeCompare(b.sim_employee);
      },
    },

    {
      title: "GHI CHÚ",
      dataIndex: "sim_note",
      key: "sim_note",
      sorter: (a, b) => {
        return a.sim_note?.localeCompare(b.sim_note);
      },
    },
  ];
  const handleChangeNote = async (id, value) => {
    const response = await updatesimInfo(
      {
        sim_note: value,
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
      getListsimActions({
        sim_employee: newValue,
      })
    );
  };

  const getListSim = () => {
    dispatch(
      getListsimActions({
        sim_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListSim();
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
    const searchSim = async (value) => {
      const response = await searchSimInfo({
        query: value,
      });
      if (response.status == 200) {
        let { data } = response;
  
        dispatch({
          type: GET_LIST_SIM_SUCCESS,
          payload: data,
        });
      } else {
        showError("Có lỗi");
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
                searchSim(e.target.value);
              }}
            />
          </Col>
          <Col span={4}>
           {sims.length}
          </Col>
        </row>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={"BẢNG LỚP SIM : " + class_name.toUpperCase()}
            key="1"
          >
            <Card type="inner">
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      history.push(
                        `table/${encodeURIComponent(record.sim_id)}`
                      );
                    },
                  };
                }}
                columns={columns}
                dataSource={sims}
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
            <HuongDanSim_table />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Sim_table;
