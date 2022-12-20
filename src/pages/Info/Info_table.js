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
import { getListinfoActions } from "../../actions/infoActions";

const Info_table = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { infos } = useSelector((state) => state.info);
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
      dataIndex: "info_id",
      key: "info_id",
      render: (text, record) => (
        <a
          onClick={() =>
            history.push(`table/${encodeURIComponent(record.info_id)}`)
          }
        >
          {text}
        </a>
      ),
      sorter: (a, b) => {
        return a.info_id.localeCompare(b.info_id);
      },
    },
    {
      title: "Tài khoản",
      dataIndex: "info_user",
      key: "info_user",
      sorter: (a, b) => {
        return a.info_user.localeCompare(b.info_user);
      },
    },
    {
      title: "Thiết bị",
      dataIndex: "info_info",
      key: "info_info",
      sorter: (a, b) => {
        return a.info_user.localeCompare(b.info_info);
      },
    },
    {
      title: "Lớp",
      dataIndex: "info_class",
      key: "info_class",
      sorter: (a, b) => {
        return a.info_user.localeCompare(b.info_class);
      },
    },
    {
      title: "Limit",
      dataIndex: "info_limit",
      key: "info_limit",
      sorter: (a, b) => {
        return a.info_user.localeCompare(b.info_limit);
      },
      
    },
    {
      title: "active",
      dataIndex: "info_active",
      key: "info_active",
      sorter: (a, b) => {
        return a.info_user.localeCompare(b.info_active);
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "infodate_sine",
      key: "infodate_sine",
      sorter: (a, b) => {
        return a.info_user.localeCompare(b.infodate_sine);
      },
    },
    {
      title: "Ngày UpSeller",
      dataIndex: "infodate_upseller",
      key: "infodate_upseller",
      sorter: (a, b) => {
        return a.info_user.localeCompare(b.infodate_upseller);
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "info_status",
      key: "info_status",
      sorter: (a, b) => {
        return a.info_user.localeCompare(b.info_status);
      },
    },
    {
      title: "Nhân viên",
      dataIndex: "info_employee",
      key: "info_employee",
      sorter: (a, b) => {
        return a.info_user.localeCompare(b.info_employee);
      },
    },
    {
      title: "Ngày chuyển lớp",
      dataIndex: "infodate_class",
      key: "infodate_class",
      sorter: (a, b) => {
        return a.info_user.localeCompare(b.infodate_class);
      },
    },
    
    {
      title: "Ghi chú",
      dataIndex: "info_note",
      key: "info_note",
      sorter: (a, b) => {
        return a.info_user.localeCompare(b.info_note);
      },
    },
  ];

  const handleChangeFilter = (values) => {
    let newValue = values.join(",");
    dispatch(
      getListinfoActions({
        info_employee: newValue,
      })
    );
  };

  const getListInfo = () => {
    dispatch(
      getListinfoActions({
        info_class: class_name,
      })
    );
  };

  useEffect(() => {
    getListInfo();
  }, [class_name]);

  return (
    <div>
      <Form.Item label="Lọc info">
        <TreeSelect
          mode="multiple"
          onChange={handleChangeFilter}
          multiple
          optionLabelProp="label"
          treeData={[
            {
              title: "Lớp",
              value: "info_class",
              children: [
                { title: "Lớp 1", value: "Lớp 1" },
                { title: "Lớp 2", value: "Lớp 2" },
              ],
            },
            {
              title: "Thiết bị",
              value: "info_info",
              children: [
                { title: "PC06", value: "PC06" },
                { title: "PC07", value: "PC07" },
              ],
            },
            {
              title: "Nhân viên",
              value: "info_employee",
              children: [
                { title: "Nguyễn Hoài", value: "Nguyễn Hoài" },
                { title: "Khắc Liêm", value: "Khắc Liêm" },
              ],
            },
          ]}
        />
      </Form.Item>
      <Card type="inner">
        <Table
          columns={columns}
          dataSource={infos}
          pagination={{
            pageSizeOptions: ["10","20","30","50","100", "200", "300", "500","1000","2000"],
            position: ["bottomRight", "topRight"],
            showSizeChanger: true,
            defaultPageSize: 100,
          }}
        ></Table>
      </Card>
    </div>
  );
};

export default Info_table;
