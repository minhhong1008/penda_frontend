import { Card, Space, Table, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const Users_class = () => {
  const history = useHistory();
  const columns = [
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>TRẠNG THÁI</strong>
        </div>
      ),
      dataIndex: "class",
      key: "class",
      render: (text) => <a onClick={() => history.push(`users_class/table?status=${encodeURIComponent(text)}`)}>{text}</a>,
    },
    {
      title: (
        <div>
          <strong style={{ width: "100%", color: "#1677ff" }}>NỘI DUNG</strong>
        </div>
      ),
      dataIndex: "content",
      key: "content",
    },
    
  ];
  const data = [
    {
      key: "0",
      class: "New",
      content: "Nhân viên mới",
    },
    {
      key: "1",
      class: "Active",
      content: "Đang hoạt động",
    },
    {
        key: "2",
        class: "Restrict",
        content: "Tạm dừng",
        
      },
      {
        key: "3",
        class: "Suspened",
        content: "Tạm đình chỉ",
        count_account: "334",
        users_vn: "334",
      },
      {
        key: "4",
        class: "Disable",
        content: "Đã nghỉ việc",
       
      },
  ];
  return (
    <div>
      <Card title="BẢNG TÀI KHOẢN THEO  USERS">
        <Card type="inner">
          <Table columns={columns} dataSource={data}></Table>
        </Card>
      </Card>
    </div>
  );
};

export default Users_class;
