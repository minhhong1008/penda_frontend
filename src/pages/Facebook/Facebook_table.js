//import React from 'react'
import { Card, Space, Table, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const Facebook_table = () => {
  const history = useHistory();
  const columns = [
    {
      title: "STT",
      dataIndex: "class",
      key: "class",
      render: (text) => <a onClick={() => history.push("table/E_42496")}>{text}</a>,
    },
    {
      title: "#",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Tài khoản",
      dataIndex: "count_account",
      key: "count_account",
    },
    {
      title: "Lớp",
      dataIndex: "facebook_vn",
      key: "facebook_vn",
    },
    {
      title: "Limit",
      dataIndex: "facebook_us",
      key: "facebook_us",
    },
  ];
  const data = [
    {
      key: "1",
      class: "E_42496",
      content: "facebook_42496",
      count_account: "Lớp 1",
      facebook_vn: "0",
      facebook_us: "0",
    },
    {
        key: "2",
        class: "Lớp 2",
        content: "( phải có chrome và info) change file infoacc.txt",
        count_account: "334",
        facebook_vn: "334",
        facebook_us: "0",
      },
      {
        key: "3",
        class: "Lớp 3",
        content: "Dang nhap Gmail forword, , doc báo dan trí... facebook...",
        count_account: "334",
        facebook_vn: "334",
        facebook_us: "0",
      },
  ];
  return (
    <div>
      <Card title="BẢNG TÀI KHOẢN">
        <Card type="inner">
          <Table columns={columns} dataSource={data}></Table>
        </Card>
      </Card>
    </div>
  );
};

export default Facebook_table