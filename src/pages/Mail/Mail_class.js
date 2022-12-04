import { Card, Space, Table, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const Mail_class = () => {
  const history = useHistory();
  const columns = [
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
      render: (text) => <a onClick={() => history.push("mail_class/table")}>{text}</a>,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Tổng tài khoản",
      dataIndex: "count_account",
      key: "count_account",
    },
    {
      title: "mail VN",
      dataIndex: "mail_vn",
      key: "mail_vn",
    },
    {
      title: "mail US",
      dataIndex: "mail_us",
      key: "mail_us",
    },
  ];
  const data = [
    {
      key: "1",
      class: "Lớp 1 new",
      content: "Setup máy",
      count_account: "334",
      mail_vn: "334",
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
      <Card title="BẢNG TÀI KHOẢN THEO LỚP mail VN">
        <Card type="inner">
          <Table columns={columns} dataSource={data}></Table>
        </Card>
      </Card>
    </div>
  );
};

export default Mail_class;
