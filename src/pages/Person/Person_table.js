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
  import { getListpersonActions } from "../../actions/personActions";
  import { HuongDanPerson_table } from "./Person_list";
  const Person_table = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const { persons } = useSelector((state) => state.person);
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
        dataIndex: "person_id",
        key: "person_id",
        render: (text, record) => (
          <a
            onClick={() =>
              history.push(`table/${encodeURIComponent(record.person_id)}`)
            }
          >
            {text}
          </a>
        ),
        sorter: (a, b) => {
          return a.person_id.localeCompare(b.person_id);
        },
      },
      {
        title: "TÀI KHOẢN",
        dataIndex: "person_user",
        key: "person_user",
        sorter: (a, b) => {
          return a.person_user.localeCompare(b.person_user);
        },
      },
      {
        title: "TIẾN TRÌNH",
        dataIndex: "person_processing",
        key: "person_processing",
        sorter: (a, b) => {
          return a.person_user.localeCompare(b.person_device);
        },
      },
      {
        title: "PHÁT SINH",
        dataIndex: "person_error",
        key: "person_error",
        sorter: (a, b) => {
          return a.person_user.localeCompare(b.person_class);
        },
      },
  
      {
        title: "NHÂN VIÊN",
        dataIndex: "person_employee",
        key: "person_employee",
        sorter: (a, b) => {
          return a.person_user.localeCompare(b.person_employee);
        },
      },
  
      {
        title: "GHI CHÚ",
        dataIndex: "person_note",
        key: "person_note",
        sorter: (a, b) => {
          return a.person_user.localeCompare(b.person_note);
        },
      },
    ];
  
    const handleChangeFilter = (values) => {
      let newValue = values.join(",");
      dispatch(
        getListpersonActions({
          person_employee: newValue,
        })
      );
    };
  
    const getListPerson = () => {
      dispatch(
        getListpersonActions({
          person_class: class_name,
        })
      );
    };
  
    useEffect(() => {
      getListPerson();
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
                  value: "person_class",
                  children: [
                    { title: "Lớp 1", value: "Lớp 1" },
                    { title: "Lớp 2", value: "Lớp 2" },
                  ],
                },
                {
                  title: "Thiết bị",
                  value: "person_device",
                  children: [
                    { title: "PC06", value: "PC06" },
                    { title: "PC07", value: "PC07" },
                  ],
                },
                {
                  title: "Nhân viên",
                  value: "person_employee",
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
              tab={"BẢNG LỚP PERSON : " + class_name.toUpperCase()}
              key="1"
            >
              <Card type="inner">
                <Table
                  columns={columns}
                  dataSource={persons}
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
              <HuongDanPerson_table />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>
    );
  };
  
  export default Person_table;
  