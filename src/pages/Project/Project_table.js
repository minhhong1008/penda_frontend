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

import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { showError, showSuccess } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  listselect_project_status,
  listselect_project_work_item,
} from "./Project_list";
import { postprojectInfo, getListproject } from "../../api/project";
import { randomStr } from "../../utils";
// search trên table
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const Project_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { users_function, users_name } = useSelector((state) => state.auth);
  let { status } = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const project_employee = urlParams.get("class");
  const dispatch = useDispatch();
  const history = useHistory();
  const { Option } = Select;
  const month = dayjs().format("MM");
  const year = dayjs().format("YYYY");
  const countDay = dayjs().daysInMonth();
  const [filterDate, setFilterDate] = useState();
  const { RangePicker } = DatePicker;
  const countDay_next = dayjs(
    year + "-" + (parseInt(month) + 1) + "-" + "01"
  ).daysInMonth();
  const rangePresets = [
    {
      label: "Mặc định",
      value: [dayjs().add(-15, "d"), dayjs().add(15, "d")],
    },
    {
      label: "Tháng này",
      value: [
        dayjs(year + "-" + month + "-" + "01"),
        dayjs(year + "-" + month + "-" + countDay),
      ],
    },
    {
      label: "Tháng sau",
      value: [
        dayjs(year + "-" + (parseInt(month) + 1) + "-" + "01"),
        dayjs(year + "-" + (parseInt(month) + 1) + "-" + countDay_next),
      ],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];
  // Các hàm nut search trên table
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
            Search
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
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 1,
      render: (text, record, index) => index + 1,
     
    },
    {
      title: "HẠNG MỤC",
      dataIndex: "project_work_item",
      key: "project_work_item",
      width: 1,
     
      render: (text) => {
        if (text == "Kế hoạch") {
          return (
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                style={{
                  textAlign: "center",
                  borderRadius: "6px",
                  padding: "2px 2px",
                  background: "Magenta",
                  color: "white",
                }}
              >
                {text}
              </div>
            </div>
          );
        } else {
          return <> {text}</>;
        }
      },
      sorter: (a, b) => {
        return a.project_work_item?.localeCompare(b.project_work_item);
      },
    },
    {
      title: "CÔNG VIỆC",
      dataIndex: "project_work",
      key: "project_work",
      fixed: "left",
      width: 1,
      sorter: (a, b) => {
        return a.project_work?.localeCompare(b.project_work);
      },
      ...getColumnSearchProps("project_work"),
     
    },

    {
      title: "NỘI DUNG",
      dataIndex: "project_content",
      key: "project_content",
      width: 3,

      sorter: (a, b) => {
        return a.project_content?.localeCompare(b.project_content);
      },
    },
    {
      title: "SỐ LƯỢNG",
      dataIndex: "project_number",
      key: "project_number",
      width: 1,
      sorter: (a, b) => {
        return a.project_number?.localeCompare(b.project_number);
      },
     
    },
    {
      title: "PHÂN LOẠI",
      dataIndex: "project_type",
      key: "project_type",
      width: 1,
      render: (record, text, index) => {
        let list = record?.split(",");
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            {list?.map((item) => {
              if (item == "QT - CB") {
                return (
                  <div
                    style={{
                      borderRadius: "6px",
                      padding: "2px 2px",
                      background: "Magenta",
                      color: "white",
                    }}
                  >
                    {item}
                  </div>
                );
              } else if (item == "Giao việc") {
                return (
                  <div
                    style={{
                      textAlign: "center",
                      borderRadius: "6px",
                      padding: "2px 2px",
                      background: "Yellow",
                      color: "red",
                    }}
                  >
                    {text.project_employee_request}
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
        return a.project_type?.localeCompare(b.project_type);
      },
     
    },
    {
      title: "TIẾN TRÌNH",
      dataIndex: "project_processing",
      key: "project_processing",
      width: 3,
      render: (record) => {
        let list = record?.split(",");
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            {list?.map((item) => {
              if (item == "Hoàn thành") {
                return (
                  <div
                    style={{
                      borderRadius: "6px",
                      padding: "2px 2px",
                      background: "Magenta",
                      color: "white",
                    }}
                  >
                    {item}
                  </div>
                );
              } else if (item == "Vướng mắc") {
                return (
                  <div
                    style={{
                      textAlign: "center",
                      borderRadius: "6px",
                      padding: "2px 2px",
                      background: "Yellow",
                      color: "red",
                    }}
                  >
                    {item}
                  </div>
                );
              } else if (item == "Quá hạn") {
                return (
                  <div
                    style={{
                      textAlign: "center",
                      borderRadius: "6px",
                      padding: "2px 2px",
                      background: "red",
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
        return a.project_processing?.localeCompare(b.project_processing);
      },
     
    },

    {
      title: "BẮT ĐẦU",
      dataIndex: "project_date_start",
      key: "project_date_start",
      width: 1,
      sorter: (a, b) => {
        return a.project_date_start?.localeCompare(b.project_date_start);
      },
    },

    {
      title: "KẾT THÚC",
      dataIndex: "project_date_end",
      key: "project_date_end",
      //fixed: "right",
      width: 1,
      sorter: (a, b) => {
        return a.project_date_end?.localeCompare(b.project_date_end);
      },
     
    },

    {
      title: "KẾT QUẢ",
      dataIndex: "project_status",
      key: "project_status",
      width: 1,
      render: (text) => {
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                textAlign: "center",
                borderRadius: "6px",
                padding: "2px 2px",
                background: "gold",
                color: "red",
              }}
            >
              {text}
            </div>
          </div>
        );
      },
      sorter: (a, b) => {
        return a.project_status?.localeCompare(b.project_status);
      },
     
    },
  ];

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setFilterDate({
        from: dateStrings[0],
        to: dateStrings[1],
      });
    } else {
      console.log("Clear");
    }
  };

  const create = async () => {
    const response = await postprojectInfo({
      project_id: randomStr(6),
      project_employee_request: users_name,
      project_employee: project_employee,
      project_date_start: dayjs()
        .add(1, "d")
        .format("YYYY-MM-DD"),
      project_date_end: dayjs()
        .add(2, "d")
        .format("YYYY-MM-DD"),
      project_processing: "Bắt đầu",
      project_owner: "Phòng sản xuất",
      project_work_item: "Sản xuất",
      project_work: "Hoạt động",
      project_status: "Bắt đầu",
    });

    if (response.status == 200) {
      showSuccess("Thêm bill thành công");
      window.location.reload();
    } else {
      showError("Thêm bill thất bại");
    }
  };

  // Hàm gọi dữ liệu về từ database
  const getListProject_Table = async () => {
    let filter = [
      dayjs()
        .add(-15, "d")
        .format("YYYY-MM-DD"),
      dayjs()
        .add(15, "d")
        .format("YYYY-MM-DD"),
    ];
    setFilterDate({
      from: filter[0],
      to: filter[1],
    });

    let { data } = await getListproject({
      project_employee: project_employee,
      from: filter[0],
      to: filter[1],
    });

    // Hiện lên bôi đỏ những cái quá hạn mà chưa hoàn thành, báo việc QT-0-CB thành QT - CB
    data.forEach((item) => {
      if (
        dayjs(item.project_date_end).format("YYYY-MM-DD") <
        dayjs().format("YYYY-MM-DD")
      ) {
        if (!item.project_processing.includes("Hoàn thành")) {
          item.project_processing = item.project_processing + "," + "Quá hạn";
        }
        // Chỉ hiển thị ra 3 cái cuối cùng cột processing
        let array = item.project_processing?.split(",");
        if (array?.length > 3) {
          for (let index = 0; index < array.length + 1; index++) {
            array.shift();
          }
          item.project_processing = array?.join(",");
        }
      } else {
        // Chỉ hiển thị ra 3 cái cuối cùng cột processing
        let array = item.project_processing?.split(",");
        if (array?.length > 3) {
          for (let index = 0; index < array.length + 1; index++) {
            array?.shift();
          }
          item.project_processing = array?.join(",");
        }
        // Nếu thời hạn còn 2 ngày thì chuyển từ QT-0-CB thành QT-CB
        if (
          dayjs(item.project_date_end).format("YYYY-MM-DD") <
          dayjs()
            .add(2, "d")
            .format("YYYY-MM-DD")
        ) {
          if (!item.project_type?.includes("QT - CB")) {
            item.project_type = item.project_type + "," + "QT - CB";
          }
        }
      }
    });
    setData(data);
  };

  const handleFilter = async () => {
    let project_status = form.getFieldValue("project_status_search");
    const { data } = await getListproject({
      project_employee: project_employee,
      project_status: project_status,
      ...filterDate,
    });
    setData(data);
  };

  useEffect(() => {
    getListProject_Table();
  }, [project_employee]);

  return (
    <div>
      <Card
        title={
          <strong
            style={{
              color: "#1890FD",
            }}
          >
            BẢNG KẾ HOẠCH
          </strong>
        }
        extra={
          <div>
            <Form
              autoComplete="off"
              form={form}
              initialValues={{ project_status_search: "Bắt đầu" }}
              responsive={["md"]}
            >
              <Space wrap>
                <Row gutter={[24, 0]}>
                  <Col xs={6} xl={4} className="mb-24">
                    <Button type="primary" onClick={() => create()}>
                      Tạo mới
                    </Button>
                  </Col>
                  <Col xs={6} xl={4} className="mb-24">
                    <Button
                      icon={<SearchOutlined />}
                      onClick={() => handleFilter()}
                    >
                      Search
                    </Button>
                  </Col>
                  <Col xs={12} xl={10} className="mb-24">
                    <RangePicker
                      size="large"
                      style={{ width: "100%" }}
                      presets={rangePresets}
                      defaultValue={[
                        dayjs().add(-30, "d"),
                        dayjs().add(30, "d"),
                      ]}
                      onChange={onRangeChange}
                    />
                  </Col>
                  <Col xs={0} xl={6} className="mb-24">
                    <Form.Item label="Trạng thái" name="project_status_search">
                      <Select
                        size="large"
                        style={{ width: "100%" }}
                        placeholder="select one item"
                        optionlabelprop="label"
                      >
                        {listselect_project_status.map((item, index) => {
                          return (
                            <Option value={item} label={item} key={index}>
                              <div className="demo-option-label-item">
                                {item}
                              </div>
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Space>
            </Form>
          </div>
        }
      >
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24} className="mb-24">
            <div className="table-responsive">
              <Table
                width="100%"
                // Hiện thêm 1 dòng note khi click vào đấu + của từng dòng
                expandable={{
                  expandedRowRender: (record) => (
                    <p
                      style={{
                        margin: 0,
                      }}
                    >
                      {record.project_note}
                    </p>
                  ),
                  rowExpandable: (record) =>
                    record.project_id !== "Not Expandable",
                }}
                // click row sẽ chuyển đến ebay_info
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      history.push(`table/${encodeURIComponent(record._id)}`);
                    },
                  };
                }}
                columns={columns}
                dataSource={data}
                bordered
                size="small"
                pagination={{
                  pageSizeOptions: ["100", "200", "300", "500", "1000", "2000"],
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
    </div>
  );
};

export default Project_table;
