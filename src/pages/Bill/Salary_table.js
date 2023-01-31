//import React from 'react'
import {
  Card,
  Col,
  DatePicker,
  Form,
  Row,
  Space,
  Table,
  Tag,
  TreeSelect,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListusers_timesheetsActions } from "../../actions/usersActions";
import { getSalary } from "../../api/salary";
import { get_Timesheets_table } from "../../api/timeSheet";

const Salary_table = () => {
  const { users_function } = useSelector((state) => state.auth);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const status_name = urlParams.get("timesheets");
  const [data, setData] = useState();
  const { userss } = useSelector((state) => state.users);
  const [filter_date_start, setFilter_date_start] = useState({
    month: dayjs().format("MM"),
    year: dayjs().format("YYYY"),
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 7,
      render: (text, record, index) => index + 1,
      responsive: ["md"],
    },
    {
      title: "Họ tên",
      dataIndex: "users_name",
      key: "users_name",
      fixed: "left",
      width: 25,
      sorter: (a, b) => a.users_name - b.users_name,
    },
    {
      title: "Chức vụ",
      dataIndex: "users_function",
      key: "users_function",
      width: 25,
      sorter: (a, b) => a.users_function - b.users_function,
      responsive: ["md"],
    },
    {
      title: "Lương chính",
      dataIndex: "users_salary",
      key: "users_salary",
      width: 25,
      sorter: (a, b) => a.users_salary - b.users_salary,
      render: (text) => text?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },

    {
      title: "Hoa hồng",
      dataIndex: "users_bonus",
      key: "users_bonus",
      width: 25,
      sorter: (a, b) => a.users_bonus - b.users_bonus,
      render: (text) => text?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },

    {
      title: "Phụ cấp",
      dataIndex: "users_allowance",
      key: "users_allowance",
      width: 25,
      sorter: (a, b) => a.users_allowance - b.users_allowance,
      render: (text) => text?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },

    {
      title: "Công hiện tại",
      dataIndex: "users_days",
      key: "users_days",
      width: 25,
      sorter: (a, b) => a.users_days - b.users_days,
    },

    {
      title: "Lương hiện tại",
      dataIndex: "users_now_salary",
      key: "users_now_salary",
      width: 25,
      sorter: (a, b) => a.users_now_salary - b.users_now_salary,
      render: (text) => text?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },

    {
      title: "Đã ứng",
      dataIndex: "users_advance",
      key: "users_advance",
      width: 25,
      responsive: ["md"],
      render: (text) => text?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      sorter: (a, b) => a.users_advance - b.users_advance,
    },
    {
      title: "Thực nhận",
      dataIndex: "users_true_salary",
      key: "users_true_salary",
      width: 25,
      sorter: (a, b) => a.users_true_salary - b.users_true_salary,
      render: (text) => text?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },

    {
      title: "Dự kiến công",
      dataIndex: "users_expected_days",
      key: "users_expected_days",
      width: 25,
      sorter: (a, b) => a.users_expected_days - b.users_expected_days,
    },

    {
      title: "Dự kiến lương",
      dataIndex: "users_expected_salary",
      key: "users_expected_salary",
      width: 20,

      render: (text) => text?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      fixed: "right",
    },
  ];

  const renderData = (timeSheet) => {
    let newData = [];
    let data_index = 0;
    timeSheet.forEach((user_time, index) => {
      if (index % 2 == 0) {
        newData.push({
          user_index: user_time?.index,
          users_name: user_time?.users_name,
          users_expected_days: user_time?.total,
        });
      } else {
        newData[data_index] = {
          ...newData[data_index],
          users_days: user_time?.total,
        };
        data_index = data_index + 1;
      }
    });
    const final_data = [];
    userss.forEach((user, index) => {
      newData.forEach((data) => {
        if (user.users_name == data.users_name) {
          let users_now_salary = Math.round(
            Math.round(parseInt(user?.users_salary) / 60) *
              parseFloat(data.users_days) +
              parseInt(user?.users_comission) +
              parseInt(user?.users_subsidize)
          );
          let users_expected_salary = Math.round(
            Math.round(parseInt(user?.users_salary) / 60) *
              parseFloat(data.users_expected_days)
          );
          let users_true_salary = Math.round(
            users_now_salary - parseInt(user?.users_salary_advance)
          );
          final_data.push({
            ...data,
            users_function: user?.users_function,
            users_salary: user?.users_salary,
            users_bonus: user?.users_comission,
            users_allowance: user?.users_subsidize,
            users_now_salary: users_now_salary,
            users_expected_salary: users_expected_salary,
            users_advance: user?.users_salary_advance,
            users_true_salary: users_true_salary,
          });
        }
      });
    });
    setData(final_data);
  };

  const getListusers = () => {
    dispatch(
      getListusers_timesheetsActions({
        users_status: "Active",
      })
    );
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

      renderData(newData);
    } else {
      showError("Có lỗi xảy ra");
    }
  };

  const onChange_Filter_date = async (date, dateString) => {
    setFilter_date_start({
      year: dateString.split("-")[0],
      month: dateString.split("-")[1],
    });
    const response = await getSalary({
      year: dateString.split("-")[0],
      month: dateString.split("-")[1],
    });
    const { data } = response;
    if (data.length > 0) {
      console.log(JSON.parse(data[0].value));
      setData(JSON.parse(data[0].value));
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    getListusers();
  }, [status_name]);

  useEffect(() => {
    getData_Timesheets_table(filter_date_start);
  }, [userss]);

  return (
    <div>
      {["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(users_function) !==
      -1 ? (
        <Card
          type="inner"
          extra={
            <DatePicker
              onChange={onChange_Filter_date}
              defaultValue={dayjs(
                filter_date_start?.year + "-" + filter_date_start?.month,
                "YYYY-MM"
              )}
              format={"YYYY-MM"}
              picker="month"
            />
          }
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} xl={24} className="mb-24">
              <div className="table-responsive">
                <Table
                  width="100%"
                  columns={columns}
                  dataSource={data}
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
      ) : null}
    </div>
  );
};

export default Salary_table;
