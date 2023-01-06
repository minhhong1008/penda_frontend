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
  Tag,
  TreeSelect,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListusersActions } from "../../actions/usersActions";
import { createSession, getSessions } from "../../api/timeSheet";
import { showError, showSuccess } from "../../utils";

const Users_timesheets = () => {
  const { users_function, users_id, users_name } = useSelector(
    (state) => state.auth
  );
  const { userss } = useSelector((state) => state.users);
  let listselect_employee = [];
  userss.map((user, index) => {
    listselect_employee.push(user.users_name);
  });
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Option } = Select;

  const [filterDate, setFilterDate] = useState({
    month: dayjs().format("MM"),
    year: dayjs().format("YYYY"),
  });
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "STT",
      key: "index",
      fixed: "left",
      width: 7,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "users_name",
      key: "users_name",
      fixed: "left",
      width: 25,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "NGÀY TRONG THÁNG" + "-" + filterDate?.month,
      children: handleDateTime(
        dayjs(
          filterDate?.year + "-" + filterDate?.month,
          "YYYY-MM"
        ).daysInMonth(),
        filterDate?.year,
        filterDate?.month
      ),
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 20,
      fixed: "right",
    },
  ];

  const onChangeDate = (date, dateString) => {
    setFilterDate({
      year: dateString.split("-")[0],
      month: dateString.split("-")[1],
    });
    getListSession({
      year: dateString.split("-")[0],
      month: dateString.split("-")[1],
    });
  };

  const onFinish = async (values) => {
    values.working_date = dayjs(values.working_date).format("YYYY-MM-DD");

    if (
      ["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(users_function) != -1
    ) {
      let response = await createSession({
        users_function: users_function,
        users_name: values.working_employee,
        working_session: values.working_session,
        working_date: values.working_date,
      });
      if (response.status == "200") {
        let { data } = response;
        showSuccess(
          "Đăng ký ca làm " +
            (data.working_session == "S" ? "sáng " : "chiều ") +
            data.working_date
        );
      } else {
        showError("Đăng ký thất bại");
      }
    }
    let response = await createSession({
      users_function: users_function,
      users_name: users_name,
      working_session: values.working_session,
      working_date: values.working_date,
    });
    if (response.status == "200") {
      let { data } = response;
      showSuccess(
        "Đăng ký ca làm " +
          (data.working_session == "S" ? "sáng " : "chiều ") +
          data.working_date
      );
    } else {
      showError("Đăng ký thất bại");
    }
  };

  const getListSession = async (time) => {
    let response = await getSessions(time);
    if (response.status == 200) {
      let { data } = response;
      let newData = [];
      data.map((user, index) => {
        let item = {};
        item["total"] = user.sessions.length;
        item["users_name"] = userss?.filter(
          (item) => item.users_name == user._id
        )[0]?.users_name;
        item["index"] = parseInt(
          userss?.filter((item) => item.users_name == user._id)[0]?.users_sort
        );
        user.sessions.map((session, index) => {
          if (item[session.day]) {
            item[session.day] =
              item[session.day] + "-" + session.working_session;
          } else {
            item[session.day] = session.working_session;
          }
        });
        newData.push(item);
      });
      setData(newData.sort((a, b) => a.index - b.index));
    } else {
      showError("Có lỗi xảy ra");
    }
  };
  const Nexttime = () => {
    let working_date_new = form.getFieldValue("working_date");
    form.setFieldValue("working_date", dayjs(working_date_new.add("3", "day")));
  };
  useEffect(() => {
    dispatch(
      getListusersActions({
        users_status: "Active",
      })
    );
  }, []);

  useEffect(() => {
    getListSession(filterDate);
  }, [userss]);

  return (
    <div>
      {[
        "Phó phòng",
        "Tổ trưởng",
        "Tổ phó",
        "Chuyên viên",
        "Nhân viên",
        "Tập sự",
        "Thử việc",
      ].indexOf(users_function) == -1 || true ? (
        <>
          <Card
            type="inner"
            title="BẢNG CHẤM CÔNG"
            extra={
              <div style={{ display: "flex", gap: "8px" }}>
                <DatePicker
                  onChange={onChangeDate}
                  defaultValue={dayjs(
                    filterDate?.year + "-" + filterDate?.month,
                    "YYYY-MM"
                  )}
                  format={"YYYY-MM"}
                  picker="month"
                />
                <Button onClick={() => showModal()}>Đăng ký ca</Button>
              </div>
            }
          >
            <Table
              columns={columns}
              dataSource={data}
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
                position: ["bottomRight", "topRight"],
                size: "large",
                showSizeChanger: true,
                defaultPageSize: 100,
              }}
            />
          </Card>
          <Modal
            title="Đăng ký ca làm việc"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
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
                        <Option value="S" label="Ca sáng">
                          <div className="demo-option-label-item">Ca sáng</div>
                        </Option>
                        <Option value="C" label="Ca chiều">
                          <div className="demo-option-label-item">Ca chiều</div>
                        </Option>
                        <Option value="T" label="Ca tối">
                          <div className="demo-option-label-item">Ca tối</div>
                        </Option>
                        <Option value="delete" label="Xóa ngày">
                          <div className="demo-option-label-item">Xóa ngày</div>
                        </Option>
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
                  {[
                    "Phó phòng",
                    "Tổ trưởng",
                    "Tổ phó",
                    "Chuyên viên",
                    "Nhân viên",
                    "Tập sự",
                    "Thử việc",
                  ].indexOf(users_function) == -1 ? (
                    <Col span={16}>
                      <Form.Item label="Nhân viên" name="working_employee">
                        <Select
                          style={{ width: "100%" }}
                          placeholder="select one item"
                          optionlabelprop="label"
                          size="large"
                        >
                          {listselect_employee?.map((item) => {
                            return (
                              <Option value={item} label={item}>
                                <div className="demo-option-label-item">
                                  {item}
                                </div>
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                  ) : null}

                  <Col span={2} style={{ float: "right" }}>
                    <Tag color="#108ee9" onClick={() => Nexttime()}>
                      Next
                    </Tag>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Modal>
        </>
      ) : null}
    </div>
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
          width: 10,
          render: (text) => {
            return (
              <div
                style={{
                  color: dayjs().format("D") == dataIndex ? "blue" : "",
                  fontWeight: dayjs().format("D") == dataIndex ? "bold" : "",
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
