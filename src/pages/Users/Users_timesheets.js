//import React from 'react'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  TreeSelect,
} from "antd";
//import từ ant.desgin và React
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import từ api
import { getListusersActions } from "../../actions/usersActions";
import { createSession, get_Timesheets_table } from "../../api/timeSheet";
//import từ file dùng chung
import { showError, showSuccess } from "../../utils";
// import từ listselect
import {
  HuongDanUsers_timesheets,
  listselect_working_session,
} from "./Users_list";

// HÀM CHÍNH TRONG TRANG
const Users_timesheets = () => {
  // Khai báo các kho dữ liệu của andt.desin đầu tiên
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users_function, users_name } = useSelector((state) => state.auth);
  const { userss } = useSelector((state) => state.users);
  const [data_table_timesheets, setData_Timesheets_table] = useState();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [list_working_session, setList_working_session] = useState(
    listselect_working_session
  );

  // Các hàm liên quan đến thao tác với giao diện
  // Các hàm liên quan đến ngày tháng
  const [filter_date_start, setFilter_date_start] = useState({
    month: dayjs().format("MM"),
    year: dayjs().format("YYYY"),
  });

  // Các hàm liên quan đến render

  let list_employee = [];
  userss.map((user, index) => {
    list_employee.push(user.users_name);
  });

  const render_working_session = (values) => {
    if (["Minh Hồng", "Nguyễn Hoài"].indexOf(values) == -1) {
      setList_working_session([
        {
          title: "Ca sáng",
          value: "S",
        },
        {
          title: "Ca chiều",
          value: "C",
        },
        {
          title: "Ca tối",
          value: "T",
        },
      ]);
    }
  };

  // các hàm liên quan đếm sự kiện trên giao diện
  const onClick_showModal = () => {
    let values = users_name;
    render_working_session(values);
    setIsModalOpen(true);
  };
  const onOk_postOk = () => {
    form.submit();
  };
  const onCancel_closeModal = () => {
    setIsModalOpen(false);
  };
  const nextDay = () => {
    let working_date_next = form.getFieldValue("working_date");
    form.setFieldValue(
      "working_date",
      dayjs(working_date_next.add("1", "day"))
    );
  };

  // Các hàm liên quan đến gọi dữ liệu từ giao diện và gửi dữ liệu lên server
  const onFinish = async (values) => {
    if (values.working_date == null || users_name == "undefined") {
      return showError("Có Lỗi, date");
    }
    values.working_date = dayjs(values.working_date).format("YYYY-MM-DD");
    let date_end = dayjs()
      .add("3", "d")
      .format("YYYY-MM-DD");
    // Đăng ký của nhân viên
    if (["Giám đốc", "Trưởng phòng"].indexOf(users_function) !== -1) {
      try {
        let response = await createSession({
          users_function: users_function,
          users_name: values.working_employee,
          working_session: values.working_session,
          working_verify: "unverify",
          working_date: values.working_date,
        });
        if (response.status == 200) {
          showSuccess("Đăng ký thành công");
        }
      } catch (error) {
        showError("Đăng ký rồi");
      }
    } else {
      if (values.working_date >= date_end) {
        try {
          let response = await createSession({
            users_function: users_function,
            users_name: users_name,
            working_session: values.working_session,
            working_verify: "unverify",
            working_date: values.working_date,
          });
          if (response.status == 200) {
            showSuccess("Đăng ký thành công");
          }
        } catch (error) {
          showError("Có Lỗi, Kiểm tra");
        }
      } else {
        showError("Bạn không có quyền");
      }
    }
  };

  // Các hàm liên quan đến xử lý dữ liệu từ database về

  const onChange_Filter_date = (date, dateString) => {
    setFilter_date_start({
      year: dateString.split("-")[0],
      month: dateString.split("-")[1],
    });
    getData_Timesheets_table({
      year: dateString.split("-")[0],
      month: dateString.split("-")[1],
    });
  };

  const getData_Timesheets_table = async (filter_date_start) => {
    let response = await get_Timesheets_table(filter_date_start);
    if (response.status == 200) {
      let { data } = response;
      let newData = [];

      data.map((item, index) => {
        let element_obj = {};

        element_obj["users_name"] = userss?.filter(
          (element_obj) => element_obj.users_name == item._id
        )[0]?.users_name;

        element_obj["index"] = parseInt(
          userss?.filter((element_obj) => element_obj.users_name == item._id)[0]
            ?.users_sort
        );

        let total_m = 0;
        let total_n = 0;
        item.sessions.map((session, index) => {
          if (
            ["ms", "mc", "mt", "vs", "vc", "vt"].indexOf(
              session.working_session
            ) !== -1
          ) {
            total_m++;
          }
          if (["ns", "nc", "nt"].indexOf(session.working_session) !== -1) {
            total_n++;
          }

          if (element_obj[session.day]) {
            element_obj[session.day] =
              element_obj[session.day] + "-" + session.working_session;
          } else {
            element_obj[session.day] = session.working_session;
          }
        });

        element_obj["total"] =
          item.sessions.length - 1.25 * total_m - 3 * total_n;
        newData.push(element_obj);
      });

      setData_Timesheets_table(newData.sort((a, b) => a.index - b.index));
    } else {
      showError("Có lỗi xảy ra");
    }
  };

  // Hiển thị giao diện lần đầu khi vào trang
  useEffect(() => {
    dispatch(
      getListusersActions({
        users_status: "Active",
      })
    );
  }, []);

  useEffect(() => {
    getData_Timesheets_table(filter_date_start);
  }, [userss]);

  // Các hàm xử lý giao diện từ ant.desgin bao gồm columns
  const columns = [
    {
      title: "STT",
      key: "index",
      fixed: "left",
      width: 5,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "users_name",
      key: "users_name",
      fixed: "left",
      width: "100%",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "NGÀY TRONG THÁNG" + "-" + filter_date_start?.month,
      children: handleDateTime(
        dayjs(
          filter_date_start?.year + "-" + filter_date_start?.month,
          "YYYY-MM"
        ).daysInMonth(),
        filter_date_start?.year,
        filter_date_start?.month
      ),
      width: "100%",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: "100%",
      fixed: "right",
    },
  ];
  return (
    <>
      <Card
        type="inner"
        title="BẢNG CHẤM CÔNG"
        width="100%"
        maxTagCount="responsive"
        extra={
          <div style={{ display: "flex", gap: "8px" }}>
            <DatePicker
              onChange={onChange_Filter_date}
              defaultValue={dayjs(
                filter_date_start?.year + "-" + filter_date_start?.month,
                "YYYY-MM"
              )}
              format={"YYYY-MM"}
              picker="month"
            />
            <Button onClick={() => onClick_showModal()}>Đăng ký ca</Button>
          </div>
        }
      >
        <Tabs
          defaultActiveKey="1"
          style={{
            width: "100%",
          }}
          maxTagCount="responsive"
        >
          <Tabs.TabPane
            tab="BẢNG CHẤM CÔNG"
            key="1"
            style={{
              width: "100%",
            }}
            maxTagCount="responsive"
          >
            <Card
              type="inner"
              style={{
                width: "100%",
              }}
              maxTagCount="responsive"
            >
              <Table
                maxTagCount="responsive"
                width="100%"
                columns={columns}
                dataSource={data_table_timesheets}
                bordered
                size="small"
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
                  size: "large",
                  showSizeChanger: true,
                  defaultPageSize: 100,
                }}
              />
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="HƯỚNG DẪN" key="2">
            <HuongDanUsers_timesheets />
          </Tabs.TabPane>
        </Tabs>
      </Card>
      <Modal
        title="Đăng ký ca làm việc"
        open={isModalOpen}
        onOk={onOk_postOk}
        onCancel={onCancel_closeModal}
        extra={<div style={{ display: "flex", gap: "8px" }}></div>}
      >
        <Card>
          <Form
            form={form}
            name="basic"
            autoComplete="off"
            size="large"
            onFinish={onFinish}
            initialValues={{
              working_session: "S",
              working_date: dayjs(),
              working_employee: users_name,
            }}
          >
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  label="Đăng ký"
                  name="working_session"
                  style={{
                    width: "100%",
                  }}
                >
                  <Select optionlabelprop="label">
                    {list_working_session.map((item, index) => {
                      return (
                        <Option
                          value={item.value}
                          label={item.title}
                          key={index}
                        >
                          <div className="demo-option-label-item">
                            {item.title}
                          </div>
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item
                  label="Ngày tháng"
                  name="working_date"
                  style={{
                    width: "100%",
                  }}
                >
                  <DatePicker
                    style={{ float: "right" }}
                    format="YYYY-MM-DD"
                    defaultValue={dayjs()}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              {["Minh Hồng", "Nguyễn Hoài"].indexOf(users_name) !== -1 ? (
                <Col span={16}>
                  <Form.Item label="Nhân viên" name="working_employee">
                    <Select
                      style={{ width: "100%" }}
                      placeholder="select one item"
                      optionlabelprop="label"
                      size="large"
                    >
                      {list_employee?.map((item) => {
                        return (
                          <Option value={item} label={item}>
                            <div className="demo-option-label-item">{item}</div>
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              ) : null}

              <Col span={2} style={{ float: "right" }}>
                <Tag color="#108ee9" onClick={() => nextDay()}>
                  Next
                </Tag>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

const handleDateTime = (countDays, year, month) => {
  let arrDate = [];
  for (var i = 1; i <= countDays; i++) {
    let dataIndex = i;
    arrDate.push({
      title: i,
      children: [
        {
          title: dayjs(
            year + "-" + month + "-" + (i <= 9 ? "0" + i : i),
            "YYYY-MM-DD"
          ).format("dd"),
          dataIndex: i,
          key: i,
          width: "100%",
          render: (text) => {
            return (
              <div
                style={{
                  color: dayjs().format("D") == dataIndex ? "blue" : "",
                  fontWeight: dayjs().format("D") == dataIndex ? "bold" : "",
                  width: "100%",
                }}
              >
                {text}
              </div>
            );
          },
        },
      ],
    });
  }
  return arrDate;
};

export default Users_timesheets;

// Chú thích code về tính năng các kiểu
/* hehe */
