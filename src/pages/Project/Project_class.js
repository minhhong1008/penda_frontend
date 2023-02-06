import {
  Button,
  Card,
  Table,
  Tabs,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Collapse,
  Space,
  Spin,
  TreeSelect,
  Avatar,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountProject } from "../../api/project/index";
import { getListusersActions } from "../../actions/usersActions";
const { Title } = Typography;
const Project_class = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { userss } = useSelector((state) => state.users);
  const status_name = urlParams.get("status");
  const [newdata, setData] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const columns = [
    {
      title: "STT",
      key: "index",
      width: 1,
      render: (text, record, index) => index + 1,
    },
    {
      title: (
        <div>
          <strong>NHÂN SỰ</strong>
        </div>
      ),
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
              "https://graph.facebook.com/" +
              record.users_fb?.replace("fb.com/", "") +
              "/picture?height=100&width=100&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662"
            } //100025410873707
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>{record.users_name}</Title>
            <p>{record.users_function}</p>
          </div>
        </Avatar.Group>
      ),
    },
    {
      title: (
        <div>
          <strong>TỔNG</strong>
        </div>
      ),
      dataIndex: "count",
      key: "count",
      width: 1,
    },
    
    {
      title: (
        <div>
          <strong>CHỨC NĂNG VÀ NHIỆM VỤ</strong>
        </div>
      ),
      dataIndex: "function_mission",
      key: "function_mission",
      responsive: ["md"],
    },
  ];

  const countProject = async () => {
    let { data } = await getCountProject();
    console.log(data)
    let newdata = data.data;
    newdata.forEach((item,index) => {
      newdata[index].users_name = item._id.users_name;
      newdata[index].users_fb = item._id.users_fb;
      console.log(newdata[index])
    });
    console.log(newdata)
    setData(newdata);
  };

  useEffect(() => {
    //getListusers();
    countProject();
  }, []);

  return (
    <div>
      <Card type="inner" title="BẢNG KẾ HOẠCH">
        <Table
          onRow={(text, rowIndex) => {
            return {
              onClick: (event) => {
                history.push(
                  `project_class/table?class=${encodeURIComponent(text.users_name)}`
                );
              },
            };
          }}
          columns={columns}
          dataSource={newdata}
          pagination={{
            pageSizeOptions: [
              "10",
              "20",
              "30",
              "50",
              "100",
              "0",
              "300",
              "500",
              "1000",
              "00",
            ],
            position: ["bottomRight"],
            showSizeChanger: true,
            defaultPageSize: 19,
          }}
        ></Table>
      </Card>
    </div>
  );
};

export default Project_class;
