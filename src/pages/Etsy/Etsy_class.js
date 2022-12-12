import { Card, Space, Table, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const Etsy_class = () => {
  const history = useHistory();
  const columns = [
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
      render: (text) => <a onClick={() => history.push(`etsy_class/table?class=${encodeURIComponent(text)}`)}>{text}</a>,
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
      title: "etsy VN",
      dataIndex: "etsy_vn",
      key: "etsy_vn",
    },
    {
      title: "etsy US",
      dataIndex: "etsy_us",
      key: "etsy_us",
    },
  ];
  const data = [
    {
      key: "1",
      class: "Lớp 1",
      content: "Setup máy",
      count_account: "334",
      etsy_vn: "334",
      etsy_us: "0",
    },
    {
        key: "2",
        class: "Lớp 2",
        content: "( phải có chrome và info) change file infoacc.txt",
        count_account: "334",
        etsy_vn: "334",
        etsy_us: "0",
      },
      {
        key: "3",
        class: "Lớp 3",
        content: "Dang nhap Gmail forword, , doc báo dan trí... etsy...",
        count_account: "334",
        etsy_vn: "334",
        etsy_us: "0",
      },
      {
        key: "4",
        class: "Lớp 4",
        content: "Dang nhap Gmail forword, , doc báo dan trí... etsy...",
        count_account: "334",
        etsy_vn: "334",
        etsy_us: "0",
      },
      {
        key: "5",
        class: "Lớp 5",
        content: "Dang nhap Gmail forword, , doc báo dan trí... etsy...",
        count_account: "334",
        etsy_vn: "334",
        etsy_us: "0",
      },
      {
        key: "6",
        class: "Lớp 6",
        content: "Dang nhap Gmail forword, , doc báo dan trí... etsy...",
        count_account: "334",
        etsy_vn: "334",
        etsy_us: "0",
      },
      {
        key: "7",
        class: "Lớp 7",
        content: "Dang nhap Gmail forword, , doc báo dan trí... etsy...",
        count_account: "334",
        etsy_vn: "334",
        etsy_us: "0",
      },
      {
        key: "8",
        class: "Lớp 8",
        content: "Dang nhap Gmail forword, , doc báo dan trí... etsy...",
        count_account: "334",
        etsy_vn: "334",
        etsy_us: "0",
      },
      {
        key: "9",
        class: "Lớp 9 UpSeller",
        content: "Dang nhap Gmail forword, , doc báo dan trí... etsy...",
        count_account: "334",
        etsy_vn: "334",
        etsy_us: "0",
      },
  ];
  return (
    <div>
      <Card title="BẢNG TÀI KHOẢN THEO LỚP ETSY VN">
        <Card type="inner">
          <Table columns={columns} dataSource={data}></Table>
        </Card>
      </Card>
    </div>
  );
};

export default Etsy_class;
