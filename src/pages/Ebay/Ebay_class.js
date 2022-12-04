import { Card, Space, Table, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const Ebay_class = () => {
  const history = useHistory();
  const columns = [
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
      render: (text) => <a onClick={() => history.push(`ebay_class/table?class=${encodeURIComponent(text)}`)}>{text}</a>,
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
      title: "Ebay VN",
      dataIndex: "ebay_vn",
      key: "ebay_vn",
    },
    {
      title: "Ebay US",
      dataIndex: "ebay_us",
      key: "ebay_us",
    },
  ];
  const data = [
    {
      key: "1",
      class: "Lớp 1",
      content: "Setup máy",
      count_account: "334",
      ebay_vn: "334",
      ebay_us: "0",
    },
    {
        key: "2",
        class: "Lớp 2",
        content: "( phải có chrome và info) change file infoacc.txt",
        count_account: "334",
        ebay_vn: "334",
        ebay_us: "0",
      },
      {
        key: "3",
        class: "Lớp 3",
        content: "Dang nhap Gmail forword, , doc báo dan trí... ebay...",
        count_account: "334",
        ebay_vn: "334",
        ebay_us: "0",
      },
      {
        key: "4",
        class: "Lớp 4",
        content: "Dang nhap Gmail forword, , doc báo dan trí... ebay...",
        count_account: "334",
        ebay_vn: "334",
        ebay_us: "0",
      },
      {
        key: "5",
        class: "Lớp 5",
        content: "Dang nhap Gmail forword, , doc báo dan trí... ebay...",
        count_account: "334",
        ebay_vn: "334",
        ebay_us: "0",
      },
      {
        key: "6",
        class: "Lớp 6",
        content: "Dang nhap Gmail forword, , doc báo dan trí... ebay...",
        count_account: "334",
        ebay_vn: "334",
        ebay_us: "0",
      },
      {
        key: "7",
        class: "Lớp 7",
        content: "Dang nhap Gmail forword, , doc báo dan trí... ebay...",
        count_account: "334",
        ebay_vn: "334",
        ebay_us: "0",
      },
      {
        key: "8",
        class: "Lớp 8",
        content: "Dang nhap Gmail forword, , doc báo dan trí... ebay...",
        count_account: "334",
        ebay_vn: "334",
        ebay_us: "0",
      },
      {
        key: "9",
        class: "Lớp 9 UpSeller",
        content: "Dang nhap Gmail forword, , doc báo dan trí... ebay...",
        count_account: "334",
        ebay_vn: "334",
        ebay_us: "0",
      },
  ];
  return (
    <div>
      <Card title="BẢNG TÀI KHOẢN THEO LỚP EBAY VN">
        <Card type="inner">
          <Table columns={columns} dataSource={data}></Table>
        </Card>
      </Card>
    </div>
  );
};

export default Ebay_class;
