import { Card, Space, Table, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const Payoneer_class = () => {
  const history = useHistory();
  const columns = [
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
      render: (text) => <a onClick={() => history.push("payoneer_class/table")}>{text}</a>,
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
      title: "payoneer VN",
      dataIndex: "payoneer_vn",
      key: "payoneer_vn",
    },
    {
      title: "payoneer US",
      dataIndex: "payoneer_us",
      key: "payoneer_us",
    },
  ];
  const data = [
    {
      key: "1",
      class: "Lớp 1 new",
      content: "Setup máy",
      count_account: "334",
      payoneer_vn: "334",
      payoneer_us: "0",
    },
    {
        key: "2",
        class: "Lớp 2",
        content: "( phải có chrome và info) change file infoacc.txt",
        count_account: "334",
        payoneer_vn: "334",
        payoneer_us: "0",
      },
      {
        key: "3",
        class: "Lớp 3",
        content: "Dang nhap Gmail forword, , doc báo dan trí... payoneer...",
        count_account: "334",
        payoneer_vn: "334",
        payoneer_us: "0",
      },
  ];
  return (
    <div>
      <Card title="BẢNG TÀI KHOẢN THEO LỚP payoneer VN">
        <Card type="inner">
          <Table columns={columns} dataSource={data}></Table>
        </Card>
      </Card>
    </div>
  );
};

export default Payoneer_class;
