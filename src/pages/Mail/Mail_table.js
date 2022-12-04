//import React from 'react'
import { Card, Space, Table, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const Mail_table = () => {
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
      dataIndex: "mail_vn",
      key: "mail_vn",
    },
    {
      title: "Limit",
      dataIndex: "mail_us",
      key: "mail_us",
    },
  ];
  const data = [
    {
      key: "1",
      class: "E_42496",
      content: "mail_42496",
      count_account: "Lớp 1",
      mail_vn: "0",
      mail_us: "0",
    },
    {
        key: "2",
        class: "Lớp 2",
        content: "( phải có chrome và info) change file infoacc.txt",
        count_account: "334",
        mail_vn: "334",
        mail_us: "0",
      },
      {
        key: "3",
        class: "Lớp 3",
        content: "Dang nhap Gmail forword, , doc báo dan trí... mail...",
        count_account: "334",
        mail_vn: "334",
        mail_us: "0",
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

export default Mail_table
