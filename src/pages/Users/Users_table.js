//import React from 'react'
import { Avatar, Card, Form, Space, Table, Tag, TreeSelect, Typography } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getListusersActions } from "../../actions/usersActions";
const { Title } = Typography;
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
      responsive: ["md"],
    },

    {
      title: "Tên",
      dataIndex: "users_name",
      key: "users_name",
      render: (text, record, index) => (
        <Avatar.Group
          onClick={(e) => {
            e.stopPropagation();
            window.open(
              `table/${encodeURIComponent(record.users_name)}`,
              "_blank"
            );
          }}
        >
          <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={
                "https://graph.facebook.com/"+record.users_fb?.replace("fb.com/","")+"/picture?height=100&width=100&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662"
              } //100025410873707
            ></Avatar>
          <div className="avatar-info" >
          <Title level={5}>{record.users_name}</Title>
          <p>{record.users_function}</p>
            </div>
        </Avatar.Group>
      ),
      
    },
    {
      title: "Giới tính",
      dataIndex: "users_sex",
      key: "users_sex",
      responsive: ["md"],
    },
    {
      title: "CCCD",
      dataIndex: "users_passport",
      key: "users_passport",
      responsive: ["md"],
    },
    {
      title: "Số Bank",
      dataIndex: "users_banknumber",
      key: "users_banknumber",
      responsive: ["md"],
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
      responsive: ["md"],
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
      responsive: ["md"],
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
      
      {["Giám đốc", "Phó Giám đốc", "Trưởng phòng"].indexOf(users_function) !==
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
              showSizeChanger: true,
              defaultPageSize: 100,
            }}
          ></Table>
        </Card>
      ) : null}
    </div>
  );
};

export default Users_table;
