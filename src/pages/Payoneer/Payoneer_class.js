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
      render: (text) => <a onClick={() => history.push(`payoneer_class/table?class=${encodeURIComponent(text)}`)}>{text}</a>,
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
      title: "Payoneer VN",
      dataIndex: "payoneer_vn",
      key: "payoneer_vn",
    },
    {
      title: "Payoneer US",
      dataIndex: "payoneer_us",
      key: "payoneer_us",
    },
  ];
  const data = [
    {
      key: "1",
      class: "Lớp 1",
      content: "Kiểm tra thiết bị, info, tài nguyên",
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
      {
        key: "4",
        class: "Lớp 4",
        content: "Dang nhap Gmail forword, , doc báo dan trí... payoneer...",
        count_account: "334",
        payoneer_vn: "334",
        payoneer_us: "0",
      },
      {
        key: "5",
        class: "Lớp 5",
        content: "Dang nhap Gmail forword, , doc báo dan trí... payoneer...",
        count_account: "334",
        payoneer_vn: "334",
        payoneer_us: "0",
      },
      {
        key: "6",
        class: "Lớp 6",
        content: "Dang nhap Gmail forword, , doc báo dan trí... payoneer...",
        count_account: "334",
        payoneer_vn: "334",
        payoneer_us: "0",
      },
      {
        key: "7",
        class: "Lớp 7",
        content: "Dang nhap Gmail forword, , doc báo dan trí... payoneer...",
        count_account: "334",
        payoneer_vn: "334",
        payoneer_us: "0",
      },
      {
        key: "8",
        class: "Lớp 8 UpSeller",
        content: "Tạo seller payoneer và etsy",
        count_account: "334",
        payoneer_vn: "334",
        payoneer_us: "0",
      },
      {
        key: "9",
        class: "Lớp 9",
        content: "Dang nhap Gmail forword, , doc báo dan trí... payoneer...",
        count_account: "334",
        payoneer_vn: "334",
        payoneer_us: "0",
      },
      {
        key: "10",
        class: "Lớp 10",
        content: "Dang nhap Gmail forword, , doc báo dan trí... payoneer...",
        count_account: "334",
        payoneer_vn: "334",
        payoneer_us: "0",
      },
      {
        key: "11",
        class: "Lớp 11",
        content: "Dang nhap Gmail forword, , doc báo dan trí... payoneer...",
        count_account: "334",
        payoneer_vn: "334",
        payoneer_us: "0",
      },
      {
        key: "12",
        class: "Lớp 12 Chuyển",
        content: "Dang nhap Gmail forword, , doc báo dan trí... payoneer...",
        count_account: "334",
        payoneer_vn: "334",
        payoneer_us: "0",
      },
  ];
  return (
    <div>
      <Card title="BẢNG TÀI KHOẢN THEO LỚP PAYONEER VN">
        <Card type="inner">
          <Table columns={columns} dataSource={data}></Table>
        </Card>
      </Card>
    </div>
  );
};

export default Payoneer_class;
