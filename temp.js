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
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListusersActions } from "../../actions/usersActions";
import { createSession, getSessions } from "../../api/timeSheet";
import { showError, showSuccess } from "../../utils";
import { HuongDanUsers_timesheets, listselect_working_session } from "./Users_list";

// Hàm chính trong page
const Users_timesheets = () => {
  // Khai báo các kho dữ liệu của andt.desin đầu tiên
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { users_function, users_id, users_name } = useSelector(
    (state) => state.auth
  );
  const { userss } = useSelector((state) => state.users);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  
  
  const [renderlistselect_working_session, setList_working_session] = useState(
    listselect_working_session
  );

  let listselect_employee = [];
  userss.map((user, index) => {
    listselect_employee.push(user.users_name);
  });

  const render_working_session = (values) => {
    if(["Minh Hồng","Nguyễn Hoài"].indexOf(values) == -1){
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
  
 

  const [filterDate, setFilterDate] = useState({
    month: dayjs().format("MM"),
    year: dayjs().format("YYYY"),
  });
  const showModal = () => {
    let values = users_name;
    render_working_session(values)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


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

  const render_listselect_working_session = () => {
    if(["Minh Hồng","Nguyễn Hoài"].indexOf(users_name) == -1){
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

  const onFinish = async (values) => {
    if (values.working_date == null || values.working_employee == "" ||users_name == "" ) {
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
            working_session:  values.working_session,
            working_verify: "unverify",
            working_date: values.working_date,
          });
          if (response.status == 200) {
            showSuccess("Đăng ký thành công");
          }
        } catch (error) {
          showError("Có Lỗi, báo cáo lại");
        }
      } else {
        showError("Bạn không có quyền");
      }
      
    }

    
  };

  const getListSession = async (filterDate) => {
    let response = await getSessions(filterDate);
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
          if (["ms", "mc", "mt"].indexOf(session.working_session) !== -1) {
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

      setData(newData.sort((a, b) => a.index - b.index));
    } else {
      showError("Có lỗi xảy ra");
    }
  };
  const Nexttime = () => {
    let working_date_new = form.getFieldValue("working_date");
    form.setFieldValue("working_date", dayjs(working_date_new.add("1", "day")));
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
      title: "NGÀY TRONG THÁNG" + "-" + filterDate?.month,
      children: handleDateTime(
        dayjs(
          filterDate?.year + "-" + filterDate?.month,
          "YYYY-MM"
        ).daysInMonth(),
        filterDate?.year,
        filterDate?.month
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
                    {renderlistselect_working_session.map((item, index) => {
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
                      {listselect_employee?.map((item) => {
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
                <Tag color="#108ee9" onClick={() => Nexttime()}>
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