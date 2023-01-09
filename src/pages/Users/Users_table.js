//import React from 'react'
import { Card, Form, Space, Table, Tag, TreeSelect } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListusersActions } from "../../actions/usersActions";

const Users_table = () => {
  const { users_function } = useSelector((state) => state.auth);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { userss } = useSelector((state) => state.users);
  const status_name = urlParams.get("status");
  const dispatch = useDispatch();
  const history = useHistory();
  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },

    {
      title: "Tên",
      dataIndex: "users_name",
      key: "users_name",
      
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
      title: "Số Bank",
      dataIndex: "users_banknumber",
      key: "users_banknumber",
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
  ];

  const getListusers = () => {
    dispatch(
      getListusersActions({
        users_status: status_name,
      })
    );
  };

  useEffect(() => {
    getListusers();
  }, [status_name]);

  return (
    <div>
      
      {["Giám đốc", "Phó giám đốc", "Trưởng phòng"].indexOf(users_function) !==
      -1 ? (
        <Card type="inner">
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  history.push(`table/${encodeURIComponent(record.users_id)}`);
                },
              };
            }}
            columns={columns}
            dataSource={userss}
          ></Table>
        </Card>
      ) : null}
    </div>
  );
};

export default Users_table;
