//import React from 'react'
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
  import React, { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useHistory, useParams } from "react-router-dom";
  import { getListprojectActions } from "../../actions/projectActions";
  import { HuongDanProject_table } from "./Project_list";
  const Project_table = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const { projects } = useSelector((state) => state.project);
    const class_name = urlParams.get("class");
    const dispatch = useDispatch();
    const history = useHistory();
  
    const columns = [
      {
        title: "STT",
        key: "index",
        render: (text, record, index) => index + 1,
      },
      {
        title: "#",
        dataIndex: "project_id",
        key: "project_id",
        render: (text, record) => (
          <a
            onClick={() =>
              history.push(`table/${encodeURIComponent(record.project_id)}`)
            }
          >
            {text}
          </a>
        ),
        sorter: (a, b) => {
          return a.project_id.localeCompare(b.project_id);
        },
      },
      {
        title: "TÀI KHOẢN",
        dataIndex: "project_user",
        key: "project_user",
        sorter: (a, b) => {
          return a.project_user.localeCompare(b.project_user);
        },
      },
      {
        title: "TIẾN TRÌNH",
        dataIndex: "project_processing",
        key: "project_processing",
        sorter: (a, b) => {
          return a.project_user.localeCompare(b.project_device);
        },
      },
      {
        title: "PHÁT SINH",
        dataIndex: "project_error",
        key: "project_error",
        sorter: (a, b) => {
          return a.project_user.localeCompare(b.project_class);
        },
      },
  
      {
        title: "NHÂN VIÊN",
        dataIndex: "project_employee",
        key: "project_employee",
        sorter: (a, b) => {
          return a.project_user.localeCompare(b.project_employee);
        },
      },
  
      {
        title: "GHI CHÚ",
        dataIndex: "project_note",
        key: "project_note",
        sorter: (a, b) => {
          return a.project_user.localeCompare(b.project_note);
        },
      },
    ];
  
    const handleChangeFilter = (values) => {
      let newValue = values.join(",");
      dispatch(
        getListprojectActions({
          project_employee: newValue,
        })
      );
    };
  
    const getListProject = () => {
      dispatch(
        getListprojectActions({
          project_class: class_name,
        })
      );
    };
  
    useEffect(() => {
      getListProject();
    }, [class_name]);
  
    return (
      <div>
        <Card>
          <Form.Item label="Lọc eBay">
            <TreeSelect
              mode="multiple"
              onChange={handleChangeFilter}
              multiple
              optionlabelprop="label"
              treeData={[
                {
                  title: "Lớp",
                  value: "project_class",
                  children: [
                    { title: "Lớp 1", value: "Lớp 1" },
                    { title: "Lớp 2", value: "Lớp 2" },
                  ],
                },
                {
                  title: "Thiết bị",
                  value: "project_device",
                  children: [
                    { title: "PC06", value: "PC06" },
                    { title: "PC07", value: "PC07" },
                  ],
                },
                {
                  title: "Nhân viên",
                  value: "project_employee",
                  children: [
                    { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                    { title: "Khắc Liêm", value: "Khắc Liêm" },
                  ],
                },
              ]}
            />
          </Form.Item>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              tab={"BẢNG LỚP project : " + class_name.toUpperCase()}
              key="1"
            >
              <Card type="inner">
                <Table
                  columns={columns}
                  dataSource={projects}
                  pagination={{
                    pageSizeOptions: [
                      "10",
                      "20",
                      "30",
                      "50",
                      "100",
                      "200",
                      "300",
                      "500",
                      "1000",
                      "2000",
                    ],
                    position: ["bottomRight", "topRight"],
                    showSizeChanger: true,
                    defaultPageSize: 100,
                  }}
                ></Table>
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="HƯỚNG DẪN" key="2">
              <HuongDanProject_table />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>
    );
  };
  
  export default Project_table;
  