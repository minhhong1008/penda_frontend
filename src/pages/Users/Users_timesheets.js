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
    if (
      values.working_date == null ||
      users_name == "undefined" ||
      users_name == ""
    ) {
      return showError("Kiểm tra nhập liệu");
    }
    values.working_date = dayjs(values.working_date).format("YYYY-MM-DD");
    let date_end = dayjs()
      .add("3", "d")
      .format("YYYY-MM-DD");
    // Đăng ký của nhân viên
    if (values.working_date >= date_end) {
      if (values.working_edit == "Tạo ca" || values.working_edit == "Xóa ca") {
        try {
          let working_employee = "";
          if (["Giám đốc", "Trưởng phòng"].indexOf(users_function) !== -1) {
            working_employee = values.working_employee;
          } else {
            working_employee = users_name;
          }
          let response = await createSession({
            users_function: users_function,
            users_name: working_employee,
            working_session: values.working_session,
            working_date: values.working_date,
            working_edit: values.working_edit,
          });
          if (response.status == 200) {
            showSuccess(values.working_edit + ": Thành công");
          }
        } catch (error) {
          showError("Kiểm tra bạn đã đăng ký chưa");
        }
      } else {
        showError("Chưa làm");
      }
    } else {
      if (values.working_edit == "Xin nghỉ") {
        if (values.working_date > dayjs().format("YYYY-MM-DD")) {
          let working_employee = "";
          if (["Giám đốc", "Trưởng phòng"].indexOf(users_function) !== -1) {
            working_employee = values.working_employee;
          } else {
            working_employee = users_name;
          }

          try {
            let response = await createSession({
              users_function: users_function,
              users_name: working_employee,
              working_session: values.working_session,
              working_date: values.working_date,
              working_edit: values.working_edit,
            });
            if (response.status == 200) {
              showSuccess("Đăng ký thành công");
            }
          } catch (error) {
            showError("Có Lỗi, Kiểm tra");
          }
        } else {
          showError("Vô lý quá");
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
        let session_obj = {};
        let verify_obj = {};
        let total_check = 0;
        let total_verrify = 0;
        let total_n = 0;
        session_obj["index"] = parseInt(
          userss?.filter(
            (session_obj) => session_obj?.users_name == item._id
          )[0]?.users_sort
        );

        session_obj["users_name"] = userss?.filter(
          (session_obj) => session_obj.users_name == item._id
        )[0]?.users_name;
           
        verify_obj["users_name"] = "Chấm công";
        item?.sessions.map((session, index) => {
          if (session_obj[session?.day]) {
            session_obj[session?.day] =
              session_obj[session?.day] + "-" + session?.working_session;
          } else {
            session_obj[session?.day] = session?.working_session;
          }

          if (verify_obj[session?.day]) {
            verify_obj[session?.day] =
              verify_obj[session?.day] +
              "-" +
              (session?.working_verify ? session?.working_verify : "") +
              (session?.working_check_late ? session?.working_check_late : "") +
              (session?.working_check_soon ? session?.working_check_soon : "");
          } else {
            verify_obj[session?.day] =
              (session?.working_verify ? session?.working_verify : "") +
              (session?.working_check_late ? session?.working_check_late : "") +
              (session?.working_check_soon ? session?.working_check_soon : "");
          }

          if (
            session?.working_check_late == "m" ||
            session?.working_verify == "Bs" ||
            session?.working_verify == "Bc" ||
            session?.working_verify == "Bt" ||
            session?.working_verify == "ps" ||
            session?.working_verify == "pc" ||
            session?.working_verify == "pt"
          ) {
            total_check++;
          }

          if (
            session?.working_verify == "Bs" ||
            session?.working_verify == "Bc" ||
            session?.working_verify == "Bt" ||
            session?.working_verify == "S" ||
            session?.working_verify == "C" ||
            session?.working_verify == "T"
          ) {
            total_verrify++;
          }
          // Tính ngày nghỉ không xin phép
          if (
            dayjs(session?.working_date).format("YYYY-MM-DD") <
              dayjs().format("YYYY-MM-DD") &&
            session?.working_session != "" &&
            session?.working_verify == ""
          ) {
            total_n++;
          }
        });

        session_obj["total"] = item.sessions?.length;
        verify_obj["total"] = total_verrify - 0.25 * total_check - 2 * total_n;

        newData.push(session_obj);
        newData.push(verify_obj);
      });
      
      setData_Timesheets_table(newData);
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

      render: (text, record, index) => {
        if (index % 2 == 0) {
          return index / 2 + 1;
        }
      },
    },
    {
      title: "Họ tên",
      dataIndex: "users_name",
      key: "users_name",
      fixed: "left",
      width: "100%",
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
        //maxTagCount="responsive"
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

          //maxTagCount="responsive"
        >
          <Tabs.TabPane
            tab="BẢNG CHẤM CÔNG"
            key="1"
            style={{
              width: "100%",
            }}
            // maxTagCount="responsive"
          >
            <Card
              type="inner"
              style={{
                width: "100%",
              }}

              //
            >
              <Row gutter={[24, 0]}>
                <Col xs={24} xl={24} className="mb-24">
                  <div className="table-responsive">
                    <Table
                      width="100%"
                      columns={columns}
                      dataSource={data_table_timesheets}
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
              working_edit: "Tạo ca",
              working_employee: users_name,
            }}
          >
            <Row gutter={16}>
              <Col span={24}>
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
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Sửa đăng ký"
                  name="working_edit"
                  style={{
                    width: "100%",
                  }}
                >
                  <Select
                    //mode="multiple"
                    style={{ width: "100%" }}
                    optionlabelprop="label"
                  >
                    <Option value="Tạo ca" label="Tạo ca">
                      <div className="demo-option-label-item">Tạo ca</div>
                    </Option>
                    <Option value="Xóa ca" label="Xóa ca">
                      <div className="demo-option-label-item">Xóa ca</div>
                    </Option>
                    <Option value="Xin nghỉ" label="Xin nghỉ">
                      <div className="demo-option-label-item">Xin nghỉ</div>
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
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
