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
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { showError, showSuccess } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getListprojectActions } from "../../actions/projectActions";
import { listselect_project_work_item } from "./Project_list";
import { postprojectInfo } from "../../api/project";
import { randomStr } from "../../utils";
const Project_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { projects } = useSelector((state) => state.project);
  const project_employee = urlParams.get("class");
  const dispatch = useDispatch();
  const history = useHistory();
  const { Option } = Select;


  const month = dayjs().format("MM");
  const year = dayjs().format("YYYY");
  const countDay = dayjs().daysInMonth();
  const [filterDate, setFilterDate] = useState();
  const { RangePicker } = DatePicker;

  const rangePresets = [
    {
      label: "Tháng hiện tại",
      value: [dayjs(year + "-" + month + "-" + "01"), dayjs(year + "-" + month + "-" + countDay)],
    },
    {
      label: "Default",
      value: [dayjs().add(-30, "d"), dayjs().add(30, "d")],
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
      render: (text, record) => (
        <a
          onClick={() =>
            history.push(`table/${encodeURIComponent(record._id)}`)
          }
        >
          {text}
        </a>
      ),
      sorter: (a, b) => {
        return a.project_work_item?.localeCompare(b.project_work_item);
      },
    },
    {
      title: "CÔNG VIỆC",
      dataIndex: "project_work",
      key: "project_work",
      width: 1,
      sorter: (a, b) => {
        return a.project_work?.localeCompare(b.project_work);
      },
    },
    {
      title: "NỘI DUNG",
      dataIndex: "project_content",
      key: "project_content",
      sorter: (a, b) => {
        return a.project_content?.localeCompare(b.project_content);
      },
    },

    {
      title: "TIẾN TRÌNH",
      dataIndex: "project_processing",
      key: "project_processing",
      render: (record) => {
        let list = record?.split(",");
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            {list?.map((item) => {
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
      sorter: (a, b) => {
        return a.project_status?.localeCompare(b.project_status);
      },
    },
  ];

  const getListProject = () => {
    dispatch(
      getListprojectActions({
        project_employee: project_employee,
      })
    );
  };
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
  const handleFilter = async () => {
    /* let { data } = await getLisProject({
      
      ...filterDate,
    }); */
  };

  const create = async () => {
    const response = await postprojectInfo({
      project_id: randomStr(6),
      project_employee: project_employee,
      project_date_start: dayjs()
        .add(1, "d")
        .format("YYYY-MM-DD"),
      project_processing: "Bắt đầu",
      project_date_end: dayjs()
        .add(2, "d")
        .format("YYYY-MM-DD"),
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

  useEffect(() => {
    getListProject();
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
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Hạng mục" name="project_work_item">
                  <Select
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="select one item"
                    optionlabelprop="label"
                  >
                    {listselect_project_work_item.map((item, index) => {
                      return (
                        <Option value={item} label={item} key={index}>
                          <div className="demo-option-label-item">{item}</div>
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <RangePicker
                  size="large"
                  style={{ width: "100%" }}
                  presets={rangePresets}
                  defaultValue={[dayjs().add(-30, "d"), dayjs().add(+30, "d")]}
                  onChange={onRangeChange}
                />
              </Col>
              <Col span={3}>
                <Button
                  style={{
                    background: "#1890FD",
                    color: "white",
                  }}
                  onClick={() => handleFilter()}
                >
                  Kết quả
                </Button>
              </Col>
              <Col span={3}>
                <Button
                  style={{
                    background: "#1890FD",
                    color: "white",
                  }}
                  onClick={() => create()}
                >
                  Tạo mới
                </Button>
              </Col>
            </Row>
          </div>
        }
      >
        <Table
          columns={columns}
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
            rowExpandable: (record) => record.project_id !== "Not Expandable",
          }}
          dataSource={projects}
          size="small"
          bordered
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
            position: ["bottomRight"],
            showSizeChanger: true,
            defaultPageSize: 100,
          }}
        ></Table>
      </Card>
    </div>
  );
};

export default Project_table;
