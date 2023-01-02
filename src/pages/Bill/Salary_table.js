//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListusers_timesheetsActions } from "../../actions/usersActions";

const Salary_table = () => {
  const { users_function } = useSelector((state) => state.auth);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const status_name = urlParams.get("timesheets");
  const { userss } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const history = useHistory();

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
      title: "Chức vụ",
      dataIndex: "users_function",
      key: "users_function",
      fixed: "left",
      width: 25,
      sorter: (a, b) => a.age - b.age,
      filters: [
        {
          text: "Nhân viên",
          value: "Nhân viêne",
        },
        {
          text: "Tập sự",
          value: "Tập sự",
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Lương chính",
      dataIndex: "users_salary",
      key: "users_salary",
      fixed: "left",
      width: 25,
      sorter: (a, b) => a.age - b.age,
    },

    {
      title: "Hoa hồng",
      dataIndex: "users_bonus",
      key: "users_bonus",
      fixed: "left",
      width: 25,
      sorter: (a, b) => a.age - b.age,
    },

    {
      title: "Phụ cấp",
      dataIndex: "users_allowance",
      key: "users_allowance",
      fixed: "left",
      width: 25,
      sorter: (a, b) => a.age - b.age,
    },

    {
      title: "Công hiện tại",
      dataIndex: "users_days",
      key: "users_days",
      fixed: "left",
      width: 25,
      sorter: (a, b) => a.age - b.age,
    },

    {
      title: "Lương hiện tại",
      dataIndex: "users_now_salary",
      key: "users_now_salary",
      fixed: "left",
      width: 25,
      sorter: (a, b) => a.age - b.age,
    },

    {
      title: "Đã ứng",
      dataIndex: "users_advance",
      key: "users_advance",
      fixed: "left",
      width: 25,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Thực nhận",
      dataIndex: "users_true_salary",
      key: "users_true_salary",
      fixed: "left",
      width: 25,
      sorter: (a, b) => a.age - b.age,
    },

    {
      title: "Dự kiến công",
      dataIndex: "users_expected_days",
      key: "users_expected_days",
      fixed: "left",
      width: 25,
      sorter: (a, b) => a.age - b.age,
    },

    {
      title: "Dự kiến lương",
      dataIndex: "users_expected_salary",
      key: "users_expected_salary",
      width: 20,
      fixed: "right",
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      users_name: "John Brown",
      users_function:"Giám đốc",
      users_salary:"100.000.000",
      users_bonus:"20.000.000",
      users_allowance:"50.000.000",
      users_days:"60",
      users_now_salary:"80.000.000",
      users_advance:"50.000.000",
      users_true_salary:"10.000.000",
      users_expected_days: "80",
      users_expected_salary:"2.000.000",
     
    });
  }

  const getListusers = () => {
    dispatch(
      getListusers_timesheetsActions({
        users_status: "Active",
      })
    );
  };

  useEffect(() => {
    getListusers();
   
  }, [status_name]);

  return (
    <div>
      {[
        "Trưởng phòng",
        "Phó phòng",
        "Tổ trưởng",
        "Tổ phó",
        "Chuyên viên",
        "Nhân viên",
        "Tập sự",
        "Thử việc",
      ].indexOf(users_function) == -1 ? (
        <Card type="inner">
          <Table
            columns={columns}
            dataSource={data}
            bordered
            size="small"
            pagination={{
              defaultPageSize: 50,
            }}
          />
        </Card>
      ) : null}
    </div>
  );
};

export default Salary_table;
