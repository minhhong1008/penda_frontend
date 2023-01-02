//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListusers_timesheetsActions } from "../../actions/usersActions";

const Users_timesheets = () => {
  const { users_function } = useSelector((state) => state.auth);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const status_name = urlParams.get("timesheets");
  const { userss } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const history = useHistory();
  /* const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    
    {
      title: "Tên",
      dataIndex: "users_name",
      key: "users_name",
      render: (text, record) => (
        <a
          onClick={() =>
            history.push(`users_class/table/${encodeURIComponent(record.users_id)}`)
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "users_sex",
      key: "users_sex",
    },
    {
      title: "CCCD",
      dataIndex: "users_passport",
      key: "users_passport",
    },
    {
      title: "Ngày sinh",
      dataIndex: "usersdate_birthday",
      key: "usersdate_birthday",
    },
    {
      title: "Ngày vào làm",
      dataIndex: "usersdate_begin",
      key: "usersdate_begin",
    },
    {
      title: "Điện thoại",
      dataIndex: "users_phone",
      key: "users_phone",
    },
    {
      title: "Trình độ ",
      dataIndex: "users_level",
      key: "users_level",
    },
    {
      title: "Chức vụ",
      dataIndex: "users_function",
      key: "users_function",
    },
    
  ]; */

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
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "John",
          value: "John",
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Ngày trong tháng",
      children: [
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
        {
          title: "1",
          children: [
            {
              title: "T2",
              dataIndex: "signup",
              key: "signup",
              width: 10,
            },
          ],
        },
      ],
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 20,
      fixed: "right",
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: "John Brown",
      signup: "S",
      total: "56",
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

export default Users_timesheets;
