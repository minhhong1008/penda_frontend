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
  TreeSelect,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountProject } from "../../api/project/index";
import { getListusersActions } from "../../actions/usersActions";
const Project_class = () => {
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
    },
    {
      title: (
        <div>
          <strong>NHÂN SỰ</strong>
        </div>
      ),
      dataIndex: "users_name",
      key: "users_name",
      render: (text) => (
        <a
          onClick={() =>
            history.push(`project_class/table?class=${encodeURIComponent(text)}`)
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: (
        <div>
          <strong>TỔNG</strong>
        </div>
      ),
      dataIndex: "project_count",
      key: "project_count",
    },
    {
      title: (
        <div>
          <strong>CHỨC NĂNG VÀ NHIỆM VỤ</strong>
        </div>
      ),
      dataIndex: "function_mission",
      key: "function_mission",
    },
    
  ];

  const countProject = async () => {
    let { data } = await getCountProject();
   
    
  };
  const getListusers = () => {
    dispatch(
      getListusersActions({
        users_status: "Active",
      })
    );
  };
  useEffect(() => {
    getListusers();
    countProject();
  }, []);

  return (
    <div>
       <Card type="inner"
            title="BẢNG KẾ HOẠCH"
           >
              <Table
                columns={columns}
                dataSource={userss}
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
